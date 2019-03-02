const express = require('express');
const isAuthorized = require('../auth');
const response = require('../response');
const users = require('../classes/users');
const router = express.Router();

/* GET users listing */
router.get('/', isAuthorized, (req, res, next) => {
    users.getAll()
    .then((results) => {
        response.success(res, results);
    })
    .catch((error) => {
        response.error(res, 500, error);
    });
});

module.exports = router;
