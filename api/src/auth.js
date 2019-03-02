const jwt = require('jsonwebtoken');
const response = require('./response');
const config = require('./config');
const cookies = require('./cookies');
const users = require('./classes/users');

module.exports = (req, res, next) => {
    const isCookie = !!req.cookies[config.authToken.cookieName];
    const authToken = isCookie ? req.cookies[config.authToken.cookieName] : req.session[config.authToken.cookieName];
    if ( req.headers.authorization === "Bearer " + authToken ) {
        jwt.verify(authToken, config.secret, (err, decoded) => {
            if (err) {
                response.error(res, 500, "Failed to authenticate token.");
            } else {
                users.getById(decoded.id)
                .then(user => {
                    if (decoded.password === user.data.password) {
                        // renew authToken cookie
                        if (isCookie) {
                            cookies.authToken(res, authToken, new Date(Date.now() + config.authToken.cookieExpires));
                        }
                        next();
                    } else {
                        response.error(res, 500, "Failed to authenticate token.");
                    }
                })
                .catch(error => {
                    response.error(res, 500, error);
                });
            }
        });
    } else {
        response.error(res, 401, "Unauthorized");
    }
};
