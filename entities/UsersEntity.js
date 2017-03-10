'use strict';

let total = 0;
let users = {};
let token = "";

module.exports.setUsers = (users) => {
  this.token = "";
  this.users = {
    "total": 0,
    "_embedded": {}
  }

  if (users === undefined) {
    return this.users;
  }

  users = Array.isArray(users) ? users : [ users ]
  this.total = users.length;

  this.users = {
    "total": this.total,
    "_embedded:": users
  };
}

module.exports.setToken = (token) => {
  this.token = token;
}

module.exports.getUsers = () => {
  let users = this.users;
  if (this.token !== "") 
    users['token'] = this.token;

  return users;
}