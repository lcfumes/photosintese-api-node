'use strict';

const {albums} = require("../config/databaseScheme.js");

let model = database.model('Albums', albums, 'albums');

module.exports.findAlbum = (album, callback) => {
  model.findOne({id_user: album.id_user, name: album.name})
}

module.exports.createAlbum = (userId, albumData, callback) => {
  model.findOne({id_user: userId, name: albumData.name}, (err, album) => {
    if (err) {
      callback(err)
    } else {
      if (album !== null) {
        callback(err, {}, false)
      } else {
        let album = new model({
          id_user: userId,
          name: albumData.name,
          description: albumData.description,
          created_at: new Date().getTime(),
          updated_at: new Date().getTime()
        });

        album.save((err, data) => {
          if (!err) {
            callback(err, data, true);
          }
        });
      }
    }
  })
}