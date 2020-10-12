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
    const newUser = database.createUser({
        name: req.body.name,
        bio: req.body.bio,
        quote: req.body.quote
    })

    res.status(201).json(newUser)
})


server.listen(port, () => {
    console.log(`server is listening on http://localhost${port}`)
})