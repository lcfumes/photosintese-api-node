'use strict';

let user = {};
let token = "";

module.exports.setUser = (user) => {
	this.user = {
    "_id": user.id,
    "user": user.user,
    "created_at": user.created_at,
    "updated_at": user.updated_at,
  }
}

module.exports.setToken = (token) => {
  this.token = token;
}

module.exports.getUser = () => {
  return {
    "_id": this.user._id,
    "user": this.user.user,
    "created_at": this.user.created_at,
    "updated_at": this.user.updated_at,
    "token": this.token
  }
}