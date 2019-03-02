const mysql = require("mysql");
const databaseJSON = require('../../db/database.json'); // eslint-disable-line node/no-unpublished-require
const config = databaseJSON[process.env.NODE_ENV];

let connection = null;

module.exports = () => {
    if (!connection) {
        connection = mysql.createConnection({
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
            database: config.database,
        });
        connection.connect();
    }
    return connection;
}
