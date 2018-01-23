const express = require('express');
const bodyParser = require('body-parser');

const knex = require('./database/db.js')
const server = express();

server.use(bodyParser.json());

// endpoints here
server.get('/', function(req, res) {
    res.status(200).json({ success: true });
});

server.post('/api/zoos', function(req, res) {
    const zoo = req.body;

    knex
        .insert(zoo)
        .into('zoos')
        .then(function(ids) {
            res.status(201).json({ ids });
        })
        .catch(function() {
            res.status(500).json({ errorMessage: 'Could not inser the Zoo' });
        });
});

const port = 3000;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});
