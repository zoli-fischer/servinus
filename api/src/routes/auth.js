const express = require('express');
const config = require('../config');
const isAuthorized = require('../auth');
const response = require('../response');
const cookies = require('../cookies');
const users = require('../classes/users');
const router = express.Router();

/* Create user authToken from email and password */
router.post('/', (req, res, next) => {
    users.getByAuthCredential(req.body.email, req.body.password)
    .then(user => {
        user.getAccessGroups()
        .then(accessGroups => {
            // create authToken
            const authToken = user.createAuthToken();

            if (req.body.keep === 1) {
                cookies.authToken(res, authToken, new Date(Date.now() + config.authToken.cookieExpires));
            }
            req.session[config.authToken.cookieName] = authToken;

            response.success(res, {
                userId: user.data.id,
                fname: user.data.fname,
                authToken: authToken,
                accessGroups: accessGroups,
            });
        })
        .catch(error => {
            response.error(res, 500, error);
        });
    })
    .catch(error => {
        response.error(res, 500, error);
    });
});

/* Validate session user by token */
router.post('/validate', isAuthorized, (req, res, next) => {
    const user = req.authUser;
    const authToken = req.authToken;
    user.getAccessGroups()
        .then(accessGroups => {
            response.success(res, {
                userId: user.data.id,
                fname: user.data.fname,
                authToken: authToken,
                accessGroups: accessGroups,
            });
        })
        .catch(error => {
            response.error(res, 500, error);
        });
    /*
    users.getByAuthCredential(req.body.email, req.body.password)
    .then(user => {
        user.getAccessGroups()
        .then(accessGroups => {
            // create authToken
            const authToken = user.createAuthToken();

            if (req.body.keep === 1) {
                cookies.authToken(res, authToken, new Date(Date.now() + config.authToken.cookieExpires));
            }
            req.session[config.authToken.cookieName] = authToken;

            response.success(res, {
                userId: user.data.id,
                fname: user.data.fname,
                authToken: authToken,
                accessGroups: accessGroups,
            });
        })
        .catch(error => {
            response.error(res, 500, error);
        });
    })
    .catch(error => {
        response.error(res, 500, error);
    });
    */
});

/* Invalidate user authToken */
router.delete('/', (req, res, next) => {
    cookies.clearAuthToken(res);
    req.session[config.authToken.cookieName] = null;
    response.success(res);
});

module.exports = router;
