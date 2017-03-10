'use strict';

let albums = {};
let total = 0;

module.exports.setAlbums = (albums) => {
  if (albums === undefined) {
    return this.albums = {
      "total": 0,
      "_embedded:": {}
    };
  }
	let total = albums.length;
  if (total != undefined) {
    this.total = total;
  }
  if (total == undefined) {
    this.total = (Object.keys(albums).length > 0) ? 1 : 0;
  }
  this.albums = {
    "total": this.total,
    "_embedded:": albums
  };
}

module.exports.getAlbum = () => {
  return this.albums;
};