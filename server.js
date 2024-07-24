'use strict';

const express = require('express');
const cors = require('cors');
const os = require('os');
// Dependencies
const handleNotFound = require('./handlers/404.js');
const handleServerError = require('./handlers/500.js');
const timestamp = require('./middleware/timestamp.js');
const proof = require('./middleware/proof.js');
// Helper
const getSystemIPs = require('./helper/list-ips.js');
const SYSTEM_IPs = getSystemIPs();
// Express
const app = express();
app.use(cors());

// Routes
app.get('/', handleGetHome);
app.get('/data', timestamp, proof, handleGetData);
app.get('/broken', handleBroken); // TODO: Middleware to come
app.get("*", handleNotFound);
app.use(handleServerError);

// Route Handler Functions
function handleGetData(req, res) {
    // req.query is created by express()
    // req.proofOfAaron is user created and
    // req.proofOfAaron is middleware ...
    console.log(req.query);
    let name = req.query.name;
    let age = req.query.age;
    let output = {
        name: name,
        age: age,
        timestamp: req.timestamp,
        proof: req.proofOfAaron,
    }
    res.status(200).json(output);
};

function handleGetHome(req, res) {
    console.log(req.headers);
    res.status(200).send('Hello World');
};

function handleBroken(req, res, next) {
    // throw new Error("Something went wrong");
    next("We broke it on purpose!");
};

function start(port) {
    console.log(`System IP addresses: ${JSON.stringify(SYSTEM_IPs, null, 2)}`);
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
}

module.exports = {app, start};