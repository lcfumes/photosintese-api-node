'use strict';

const {users} = require("../config/databaseScheme.js");

let model = database.model('Users', users, 'users');

module.exports.totalDocs = callback => {
	model.count({deleted_date: null}, (err, count) => {
    callback(err, count)
	})
}

module.exports.findUser = (userData, callback) => {
  userData.deleted_date = null;
  model.findOne(userData, (err, user) => {
    callback(err, user);
  })
}

module.exports.createUser = (userData, callback) => {
  userData.deleted_date = null;
  model.findOne({email: userData.email}, (err, user) => {
    if (err) {
      return callback(err);
    }
    if (user !== null) {
      return callback(err, {}, false);
    }

    let create = new model({
      name: userData.name,
      last_name: userData.last_name,
      email: userData.email,
      password: userData.password,
      created_at: new Date().getTime(),
      updated_at: new Date().getTime()
    });

    create.save((err, data) => {
      if (!err) {
        return callback(err, data, true)
      }
    });
  })
}