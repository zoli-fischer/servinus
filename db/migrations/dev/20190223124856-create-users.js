'use strict';

var bcrypt = require('bcrypt');

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.runSql('INSERT INTO users (email, password) VALUES (?, ?)', ['dev@servinus.com', bcrypt.hashSync('password', 10)], callback);
};

exports.down = function(db, callback) {
  db.runSql('DELETE FROM users WHERE email = ?', ['dev@servinus.com'], callback);
};

exports._meta = {
  "version": 1
};
