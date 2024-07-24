'use strict';

function proof(req, res, next) {
    req.proofOfAaron = 'Aaron is Real';
    next();
}

module.exports = proof;