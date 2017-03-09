'use strict';

let album = {};

module.exports.setAlbum = (album) => {
	this.album = {
    "id": album._id,
    "id_user": album.id_user,
    "name": album.name,
    "description": album.description,
    "last_name": album.last_name,
    "created_at": album.created_at,
    "updated_at": album.updated_at,
  }
}

module.exports.getAlbum = () => {
  return this.album;
}