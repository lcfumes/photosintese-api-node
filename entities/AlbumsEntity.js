'use strict';

let albums = {};
let total = 0;

module.exports.setAlbums = (albums) => {
  this.albums = {
    "total": 0,
    "_embedded:": {}
  };
  
  if (albums === undefined) {
    return this.albums;
  }

  albums = Array.isArray(albums) ? albums : [ albums ]
  this.total = albums.length;

  this.albums = {
    "total": this.total,
    "_embedded:": albums
  };
}

module.exports.getAlbum = () => {
  return this.albums;
};