'use strict';

const {users} = require("../config/databaseScheme.js");

let model = database.model('Users', users, 'users');

module.exports.totalDocs = callback => {
	model.count({}, (err, count) => {
    callback(err, count)
	})
}

module.exports.findByHash = (hash, callback) => {
  model.findOne({'hash': hash}, (err, doc) => {
    callback(err, doc);
  });
}

module.exports.findUser = (userData, callback) => {
  model.findOne({
    user: userData.user,
    password: userData.password
  }, (err, user) => {
    callback(err, user);
  })
}

module.exports.createUser = (userData, callback) => {
  let user = {
    user: userData.user,
    password: userData.password
  };

  this.findUser(user, (err, user) => {
    if (err) {
      callback(err)
    } else {
      if (user !== null) {
        callback(err, user, false)
      } else {
        let user = new model({
          user: userData.user,
          password: userData.password,
          created_at: new Date().getTime(),
          updated_at: new Date().getTime()
        });

        user.save(err => {
          if (!err) {
            this.findUser(user, (err, user) => {
              callback(err, user, true)
            })
          }
        });
      }
    }
  })
}