module.exports.error = (res, status, error, response = null) => {
    return res.send(JSON.stringify({ status, error, response }));
};

module.exports.success = (res, response = null) => {
    return res.send(JSON.stringify({ status: 200, response }));
};
