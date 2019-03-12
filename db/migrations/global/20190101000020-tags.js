'use strict';

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

  db.runSql(`
CREATE TABLE \`tags\` (
  \`id\` int(10) UNSIGNED NOT NULL,
  \`name\` varchar(32) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`, null, callback);
  db.runSql(`
ALTER TABLE \`tags\`
  ADD PRIMARY KEY (\`id\`),
  ADD UNIQUE KEY \`name\` (\`name\`) USING BTREE;`, null, callback);
  db.runSql(`
ALTER TABLE \`tags\`
  MODIFY \`id\` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;`, null, callback);
};

exports.down = function(db, callback) {
  db.dropTable('tags', callback);
};

exports._meta = {
  "version": 1
};
