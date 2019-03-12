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


  // access group
  db.runSql(`
CREATE TABLE \`users_access_group\` (
  \`id\` varchar(32) NOT NULL,
  \`description\` varchar(255) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`, null, callback);
  db.runSql(`
INSERT INTO \`users_access_group\` (\`id\`, \`description\`) VALUES
  ('adult', 'Allow user to access adult content'),
  ('upload', 'Allow user to upload and edit media'),
  ('users', 'Allow user to create and edit users');`, null, callback);
  db.runSql(`
ALTER TABLE \`users_access_group\`
  ADD PRIMARY KEY (\`id\`);`, null, callback);

  // access
  db.runSql(`
CREATE TABLE \`users_access\` (
  \`id\` int(10) UNSIGNED NOT NULL,
  \`user_id\` int(10) UNSIGNED DEFAULT NULL,
  \`group_id\` varchar(32) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`, null, callback);
  db.runSql(`
ALTER TABLE \`users_access\`
  ADD PRIMARY KEY (\`id\`),
  ADD KEY \`access_user_id\` (\`user_id\`),
  ADD KEY \`access_group_user_id\` (\`group_id\`);`, null, callback);
  db.runSql(`
ALTER TABLE \`users_access\`
  MODIFY \`id\` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;`, null, callback);
  db.runSql(`
ALTER TABLE \`users_access\`
  ADD CONSTRAINT \`access_group_user_id\` FOREIGN KEY (\`group_id\`) REFERENCES \`users_access_group\` (\`id\`),
  ADD CONSTRAINT \`access_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON UPDATE CASCADE;`, null, callback);
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
  db.dropTable('users_access', callback);
  db.dropTable('users_access_group', callback);
};

exports._meta = {
  "version": 1
};
