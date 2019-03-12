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

exports.up = function(db, _callback) {
  function callback(error) {
    if (error) {
      console.log(error.sql);
      console.log(error.sqlMessage);
    }
    _callback(error);
  };

  db.runSql('INSERT INTO users (email, password) VALUES (?, ?)',
    ['dev@servinus.com', bcrypt.hashSync('password', 10)],
    callback);
  [
    [1, 'upload'],
    [1, 'users'],
    [1, 'adult']
  ].forEach(row => {
    db.runSql('INSERT INTO users_access (user_id, group_id) VALUES (?, ?)', row, callback);
  });
};

exports.down = function(db, callback) {
  db.runSql('DELETE FROM users WHERE email = ?', ['dev@servinus.com'], callback);
};

exports._meta = {
  "version": 1
};
