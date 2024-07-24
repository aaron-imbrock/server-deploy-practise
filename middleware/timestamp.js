'use strict';

function timeStamp(req, res, next) {
    req.timestamp = new Date();
    next();
}

module.exports = timeStamp;