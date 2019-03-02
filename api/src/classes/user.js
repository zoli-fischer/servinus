const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const database = require('../database');

class user {
    constructor (data) {
        this.userData = data;
    }

    get data() {
        return this.userData;
    }

    createAuthToken() {
        return jwt.sign(
            { 
                id: this.data.id,
                password: this.data.password,
            },
            config.secret,
            { expiresIn: config.authToken.expires }
        );
    }

    update(data) {
        return new Promise((resolve, reject) => {
            const fields = [];
            const values = [];
            Object.keys(data).forEach(key => {
                fields.push('`' + key + '` = ?');
                if (key === 'password') {
                    values.push(bcrypt.hashSync(data[key], 10));
                } else {
                    values.push(data[key]);
                }
            });
            values.push(this.data.id);
            database().query("UPDATE users SET " + fields.join(",") + " WHERE id = ?", values, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            database().query("DELETE FROM users WHERE id = ?", [this.data.id], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = user;
