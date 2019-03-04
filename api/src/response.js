module.exports.error = (res, status, error, data = null) => {
    return res.send(JSON.stringify({ status, error, data }));
};

module.exports.success = (res, data = null) => {
    return res.send(JSON.stringify({ status: 200, data }));
};
