const express = require('express');
const database = require('./database');

const server = express();
server.use(express.json())
const port = 8000

server.get('/', (req, res) => {
    res.json({message: "Welcome to the API"})
})

server.listen(port, () => {
    console.log(`server is listening on http://localhost${port}`)
})