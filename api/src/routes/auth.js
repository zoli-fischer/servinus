const express = require('express');
const config = require('../config');
const response = require('../response');
const cookies = require('../cookies');
const users = require('../classes/users');
const router = express.Router();

/* Create user authToken from email and password */
router.post('/', (req, res, next) => {
    users.getByAuthCredential(req.body.email, req.body.password)
    .then(user => {
        // create authToken
        const authToken = user.createAuthToken();

        if (req.body.keep === 1) {
            cookies.authToken(res, authToken, new Date(Date.now() + config.authToken.cookieExpires));
        }
        req.session[config.authToken.cookieName] = authToken;

        response.success(res, {
            userId: user.data.id,
            authToken: authToken,
        });
    })
    .catch(error => {
        response.error(res, 500, error);
    });
});

/* Invalidate user authToken */
router.delete('/', (req, res, next) => {
    cookies.clearAuthToken(res);
    req.session[config.authToken.cookieName] = null;
    response.success(res);
});

module.exports = router;
