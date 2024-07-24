'use strict';

function handleNotFound(req, res) {
    res.status(404).json({
        error: 404,
        route: req.path,
        message: "The requested route does not exist"
    });
}

module.exports = handleNotFound;