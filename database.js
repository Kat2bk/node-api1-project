const {v4: uuidv4} = require('uuid');

let users = [
    {
        id: uuidv4(),
        name: "Aragorn",
        bio: "the king of Gondor",
        quote: "I will not let the white city fall"
    },
    {
        id: uuidv4(),
        name: "Legolas",
        bio: "son of Thranduil",
        quote: "they're taking the hobbits to isengard"
    }
]

function getUsers() {
    return users
}

function getUserById(id) {
    users.find(user => {
        return user.id === id
    })
}

function createUser(data) {
    const payload = {
        id: uuidv4(),
        ...data,
    }

    users.push(payload)
    return payload
}

function updateUser(id, data) {
    const index = users.findIndex(user => {
        return user.id === id
    })

    users[index] = {
        ...users[index],
        ...data,
    }

    return users[index]
}

function deleteUser(id) {
    users = users.filter(user => {
        return user.id !== id
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}