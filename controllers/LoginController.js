'use strict';

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/UsersModel');
const UsersEntity = require('../entities/UsersEntity');
const crypto = require('crypto');

/**
 * handlers
 */
module.exports.authenticate = (request, reply) => {
  let userData = {
    email: request.payload.email,
    password: crypto.createHash('md5').update(request.payload.password).digest("hex")
  };

  usersModel.findUser(userData, (err, user) => {
    if (err) {
      return reply().code(500);
    }
    if (!user) {
      return reply().code(401);
    }
    let token = jwt.sign({
       exp: Math.floor(Date.now() / 1000) + (60 * 60),
       id: user.id,
       name: user.name,
       last_name: user.last_name,
       email: user.email
     }, 
     Config.authentication.secret
    );
    UsersEntity.setUsers(user);
    UsersEntity.setToken(token);
    reply(UsersEntity.getUsers()).code(200);     
  })
}

module.exports.createUser = (request, reply) => {
  let userData = {
    name: request.payload.name,
    last_name: request.payload.last_name,
    email: request.payload.email,
    password: crypto.createHash('md5').update(request.payload.password).digest("hex")
  }
  usersModel.createUser(userData, (err, result, created) => {
    if(err) {
      return reply().code(500);
    }
    if (!created) {
      return reply({
        succes: false,
        message: 'Email address already exists.'
      }).code(409);
    }
    UsersEntity.setUsers(result);
    reply(UsersEntity.getUsers()).code(201);
  })
}

module.exports.updateUser = (request, reply) => {

}

/**
 * configs
 */

module.exports.configAuthenticate = {
	handler: this.authenticate,
  description: 'Authenticate User',
  notes: 'Authenticate a user and return one token if found',
  tags: ['api', 'users', 'authenticate'],
	validate: {
		payload: {
			email: Joi.string().required().description('User Email'),
      password: Joi.string().required().description('User Password')
		},
		headers: Joi.object().keys({
      'content-type': Joi.string().required().valid(['application/json']).default('application/json')          
    }).unknown()
	}
}

module.exports.configCreateUser = {
  handler: this.createUser,
  description: 'Create a new user',
  notes: 'Create a new user and returns all the information',
  tags: ['api', 'users', 'create'],
  validate: {
    headers: Joi.object().keys({
      'content-type': Joi.string().required().valid(['application/json']).default('application/json')          
    }).unknown(),
    payload: {
      name: Joi.string().min(1).required().description('User Name'),
      last_name: Joi.string().min(1).required().description('User Last Name'),
      email: Joi.string().min(1).required().description('User Email'),
      password: Joi.string().min(1).required().description('User Password')
    }
  }
}

module.exports.configDeleteUser = {
  handler: this.updateUser,
  description: 'Delete an user',
  notes: 'Delete an user @TODO',
  tags: ['api', 'users', 'update'],
  validate: {
    headers: Joi.object().keys({
      'content-type': Joi.string().required().valid(['application/json']).default('application/json'),
      'x-access-token': Joi.string().required().description("Auth Token")
    }).unknown()
  }
}

module.exports.configUpdateUser = {
  handler: this.updateUser,
  description: 'Update an user',
  notes: 'Update an user and returns all the information @TODO',
  tags: ['api', 'users', 'update'],
  validate: {
    headers: Joi.object().keys({
      'content-type': Joi.string().required().valid(['application/json']).default('application/json'),
      'x-access-token': Joi.string().required().description("Auth Token")
    }).unknown(),
    payload: {
      name: Joi.string().min(1).required().description('User Name'),
      last_name: Joi.string().min(1).required().description('User Last Name'),
      email: Joi.string().min(1).required().description('User Email'),
      password: Joi.string().min(1).required().description('User Password')
    }
  }
}