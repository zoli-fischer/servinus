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

exports.up = function(db, callback) {
  db.runSql(`
CREATE TABLE \`users\` (
  \`id\` int(10) UNSIGNED NOT NULL,
  \`email\` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  \`password\` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  \`fname\` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  \`lname\` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`, null, callback);
  db.runSql(`
ALTER TABLE \`users\`
  ADD PRIMARY KEY (\`id\`);`, null, callback);
  db.runSql(`
ALTER TABLE \`users\`
  MODIFY \`id\` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;`, null, callback);
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
};

exports._meta = {
  "version": 1
};
