const config = require('./config');

function clear(res, name) {
    res.cookie(name, '', {
        expires: new Date(Date.now() - 1),
    });
}

module.exports.authToken = (res, value, expire) => {
    res.cookie(config.authToken.cookieName, value, { 
        expires: expire,
        httpOnly: true,
        signed: true,
        secure: false,
    });
};

module.exports.clearAuthToken = (res) => {
    clear(res, config.authToken.cookieName);
};

