const express = require('express');
const database = require('./database');

const server = express();
server.use(express.json())
const port = 8000

server.get('/', (req, res) => {
    res.json({message: "Welcome to the API"})
})

server.get('/users', (req, res) => {
    const users = database.getUsers()
    if (users) {
    res.json(users)
    } else {
        res.status(500).json({
            error: "Unable to get users"
        })
    }
})

server.get("/users/:id", (req, res) => {
	const id = req.params.id
	const user = database.getUserById(id)

	if (user) {
		res.json(user)
	} else if (!database) {
		res.status(500).json({
            error: "unable to get that user"
        })
	} else {
        res.status(404).json({
            message: "user not found"
        })
    }
})

server.post("/users", (req, res) => {
    if (!req.body.name || !req.body.bio || !req.body.quote) {
        res.status(400).json({
            message: "please fill out all required fields"
        })
    } else if (req.body.name && req.body.bio && req.body.quote) {
        const newUser = database.createUser({
            name: req.body.name,
            bio: req.body.bio,
            quote: req.body.quote
        })
        res.status(201).json(newUser)
    }
})

server.put("/users/:id", async (req, res) => {
    const {id} = req.params;
    const {name, bio, quote} = req.body;

    if (!id) {
        return res.status(404).json({
            message: "this user does not exist"
        })
    } else if (!name || !bio || !quote) {
        return res.status(400).json({
            message: "please provide all info for user"
        })
    }

    try {
        if (id) {
            await database.updateUser(id, {name, bio, quote})
            const updatedUser = await database.getUserById(id);
            return res.status(200).json(updatedUser)
        }
    } catch (error) {
        res.status(500).json({
            error: "this user's info could not be updated"
        })
    }
})

server.delete("/users/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).json({
            message: "this user does not exist"
        })
    }

    try {
        await database.deleteUser(id);
        res.status(200).json({
            message: "user was deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: "user could not be deleted"
        })
    }
})

server.listen(port, () => {
    console.log(`server is listening on http://localhost${port}`)
})