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
CREATE TABLE \`medias\` (
  \`id\` int(10) UNSIGNED NOT NULL,
  \`title\` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  \`subtitle\` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  \`season\` int(10) UNSIGNED DEFAULT NULL,
  \`episod\` int(10) UNSIGNED DEFAULT NULL,
  \`year\` int(4) UNSIGNED DEFAULT NULL,
  \`imdb\` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  \`created\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`created_by\` int(10) UNSIGNED DEFAULT NULL,
  \`deleted\` timestamp NULL DEFAULT NULL,
  \`deleted_by\` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`, null, callback);
  db.runSql(`
ALTER TABLE \`medias\`
  ADD PRIMARY KEY (\`id\`),
  ADD KEY \`created\` (\`created\`),
  ADD KEY \`deleted\` (\`deleted\`),
  ADD KEY \`year\` (\`year\`),
  ADD KEY \`season\` (\`season\`),
  ADD KEY \`episod\` (\`episod\`);
`, null, callback);
  db.runSql(`ALTER TABLE \`medias\`
MODIFY \`id\` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
`, null, callback);
  db.runSql(`ALTER TABLE \`medias\`
ADD CONSTRAINT \`media_creator_id\` FOREIGN KEY (\`created_by\`) REFERENCES \`users\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD CONSTRAINT \`media_remover_id\` FOREIGN KEY (\`deleted_by\`) REFERENCES \`users\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE;
`, null, callback);

  // videos
  db.runSql(`CREATE TABLE \`medias_video\` (
  \`id\` int(10) UNSIGNED NOT NULL,
  \`media_id\` int(10) UNSIGNED DEFAULT NULL,
  \`size\` int(10) UNSIGNED DEFAULT NULL COMMENT 'byte',
  \`width\` int(10) UNSIGNED DEFAULT NULL COMMENT 'px',
  \`height\` int(10) UNSIGNED DEFAULT NULL COMMENT 'px',
  \`length\` int(10) UNSIGNED DEFAULT NULL COMMENT 'seconds',
  \`deleted\` timestamp NULL DEFAULT NULL,
  \`deleted_by\` int(10) UNSIGNED DEFAULT NULL,
  \`created\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`created_by\` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`, null, callback);
  db.runSql(`ALTER TABLE \`medias_video\`
ADD PRIMARY KEY (\`id\`),
ADD KEY \`video_creator_id\` (\`created_by\`),
ADD KEY \`video_media_id\` (\`media_id\`),
ADD KEY \`video_remover_id\` (\`deleted_by\`);`, null, callback);
  db.runSql(`ALTER TABLE \`medias_video\`
MODIFY \`id\` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;`, null, callback);
  db.runSql(`ALTER TABLE \`medias_video\`
ADD CONSTRAINT \`video_creator_id\` FOREIGN KEY (\`created_by\`) REFERENCES \`users\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD CONSTRAINT \`video_media_id\` FOREIGN KEY (\`media_id\`) REFERENCES \`medias\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD CONSTRAINT \`video_remover_id\` FOREIGN KEY (\`deleted_by\`) REFERENCES \`users\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE;
`, null, callback);

  //work
  db.runSql(`CREATE TABLE \`medias_work\` (
  \`id\` int(10) UNSIGNED NOT NULL,
  \`media_video_id\` int(10) UNSIGNED NOT NULL,
  \`status\` enum('wait','progress','error','done') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'wait',
  \`percent\` int(10) UNSIGNED NOT NULL DEFAULT '0',
  \`message\` longtext COLLATE utf8mb4_general_ci NOT NULL,
  \`options\` longtext COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`, null, callback);
  db.runSql(`ALTER TABLE \`medias_work\`
ADD PRIMARY KEY (\`id\`),
ADD KEY \`status\` (\`status\`),
ADD KEY \`work_video_id\` (\`media_video_id\`);`, null, callback);
  db.runSql(`ALTER TABLE \`medias_work\`
MODIFY \`id\` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;`, null, callback);
  db.runSql(`ALTER TABLE \`medias_work\`
ADD CONSTRAINT \`work_video_id\` FOREIGN KEY (\`media_video_id\`) REFERENCES \`medias_video\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE;
`, null, callback);

  //tags
  db.runSql(`CREATE TABLE \`medias_tag\` (
  \`media_id\` int(10) UNSIGNED DEFAULT NULL,
  \`tag_id\` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`, null, callback);
  db.runSql(`ALTER TABLE \`medias_tag\`
ADD KEY \`media_tag_id\` (\`tag_id\`),
ADD KEY \`media_tag_media_id\` (\`media_id\`);`, null, callback);
  db.runSql(`ALTER TABLE \`medias_tag\`
ADD CONSTRAINT \`media_tag_id\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tags\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD CONSTRAINT \`media_tag_media_id\` FOREIGN KEY (\`media_id\`) REFERENCES \`medias\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE;`, null, callback);
};

exports.down = function(db, callback) {
  db.dropTable('medias', callback);
  db.dropTable('medias_video', callback);
  db.dropTable('medias_work', callback);
  db.dropTable('medias_tag', callback);
};

exports._meta = {
  "version": 1
};
