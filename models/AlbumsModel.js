'use strict';

const {albums} = require("../config/databaseScheme.js");

let model = database.model('Albums', albums, 'albums');

module.exports.findAlbum = (album, callback) => {
  model.findOne({id_user: album.id_user, name: album.name})
}

module.exports.listAlbums = (userId, callback) => {
  model.find({"id_user": userId}, (err, albums) => {
    callback(err, albums);
  });
}

module.exports.listAlbum = (userId, id, callback) => {
  model.findOne({"id_user": userId, "_id": id}, (err, album) => {
    callback(err, album);
  });
}

module.exports.createAlbum = (userId, albumData, callback) => {
  model.findOne({id_user: userId, name: albumData.name}, (err, album) => {
    if (err) {
      return callback(err)
    }
    if (album !== null) {
      return callback(err, {}, false)
    }

    let create = new model({
      id_user: userId,
      name: albumData.name,
      description: albumData.description,
      created_at: new Date().getTime(),
      updated_at: new Date().getTime()
    });

    create.save((err, data) => {
      if (err) {
        return callback(err);
      }
      return callback(err, data, true);
    });
  })
}