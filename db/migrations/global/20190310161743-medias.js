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
  db.createTable('medias', {
    id: {
      type: 'int',
      length: 10,
      unsigned: true,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: 'string',
      length: 255
    },
    subtitle: {
      type: 'string',
      length: 255
    },
    season: {
      type: 'int',
      length: 4,
      unsigned: true,
    },
    episod: {
      type: 'int',
      length: 4,
      unsigned: true,
    },
    year: {
      type: 'int',
      length: 4,
      unsigned: true,
    },
    imdb: {
      type: 'string',
      length: 255
    },
    status: {
      type: 'int',
      length: 1,
      unsigned: true,
    },
    progress: {
      type: 'int',
      length: 3,
      unsigned: true,
    },
    deleted: {
      type: 'int',
      length: 1,
      unsigned: true,
    },
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('medias', callback);
};

exports._meta = {
  "version": 1
};
