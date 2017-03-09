'use strict';

let user = {};
let token = "";

module.exports.setUser = (user) => {
	this.user = {
    "id": user.id,
    "name": user.name,
    "last_name": user.last_name,
    "email": user.email,
    "created_at": user.created_at,
    "updated_at": user.updated_at,
  }
  this.token = "";
}

module.exports.setToken = (token) => {
  this.token = token;
}

module.exports.getUser = () => {
  let user = this.user;
  if (this.token !== "") 
    user['token'] = this.token;

  return user;
}