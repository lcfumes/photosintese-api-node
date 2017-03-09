'use strict';

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/UsersModel');
const UserEntity = require('../entities/UserEntity');
const crypto = require('crypto');

/**
 * pre
 */
module.exports.verifyAuthentication = (request, next) => {
	let token = request.headers['x-access-token'];

	jwt.verify(token, Config.authentication.secret, (err, decoded) => {
		request.error = true;
		request.decoded = "";
		if (!err) {
			request.error = false;
			request.decoded = decoded;
		}
		next();
	})
}

/**
 * handlers
 */
module.exports.authenticate = (request, reply) => {
  let userData = {
    email: request.payload.email,
    password: crypto.createHash('md5').update(request.payload.password).digest("hex")
  };

  usersModel.findUser(userData, (err, user) => {
    if (!err) {
      if (!user) {
        reply().code(401);
      } else {
        let token = jwt.sign({
           exp: Math.floor(Date.now() / 1000) + (60 * 60),
           user: request.payload.user
         }, 
         Config.authentication.secret
        );
        UserEntity.setUser(user);
        UserEntity.setToken(token);
        reply(UserEntity.getUser()).code(200);
      }      
    }
  })
}

module.exports.getAuthenticate = (request, reply) => {
	let code = 200;
  if (!request.error) {
    code = 405;
  }
  reply({
		success: !request.error,
		userInfo: request.decoded
	}).code(code);
}

module.exports.createUser = (request, reply) => {
  let userData = {
    name: request.payload.name,
    last_name: request.payload.last_name,
    email: request.payload.email,
    password: crypto.createHash('md5').update(request.payload.password).digest("hex")
  }
  usersModel.createUser(userData, (err, result, created) => {
    if(!err) {
      if (!created) {
        reply({
          succes: false,
          message: 'Email address already exists.'
        }).code(409);
      } else {
        UserEntity.setUser(result);
        reply(UserEntity.getUser()).code(201);
      }
    }
  })
}

/**
 * configs
 */
module.exports.configGetAuthenticate = {
	pre: [
		[{
			method: this.verifyAuthentication
		}]
	],
	handler: this.getAuthenticate,
	validate: {
		headers: Joi.object().keys({
			'content-type': Joi.string().required().valid(['application/json']).default('application/json'),
			'x-access-token': Joi.string().required()
		}).unknown()
	}
}

module.exports.configAuthenticate = {
	handler: this.authenticate,
	validate: {
		payload: {
			email: Joi.string().required(),
      password: Joi.string().required()
		},
		headers: Joi.object().keys({
      'content-type': Joi.string().required().valid(['application/json']).default('application/json')          
    }).unknown()
	}
}

module.exports.configCreateUser = {
  handler: this.createUser,
  validate: {
    headers: Joi.object().keys({
      'content-type': Joi.string().required().valid(['application/json']).default('application/json')          
    }).unknown(),
    payload: {
      name: Joi.string().min(1).required(),
      last_name: Joi.string().min(1).required(),
      email: Joi.string().min(1).required(),
      password: Joi.string().min(1).required()      
    }
  }
}