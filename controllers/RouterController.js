'use strict';

const Joi = require('joi');
const jwt = require('jsonwebtoken');
// var cloudinary = require('cloudinary');

// cloudinary.config({ 
//   cloud_name: 'sample', 
//   api_key: '874837483274837', 
//   api_secret: 'a676b67565c6767a6767d6767f676fe1' 
// });

//http://cloudinary.com/documentation/node_integration#getting_started_guide

const verifyAuthentication = (request, next) => {
	let token = request.headers['x-access-token'];

	if (token) {
		jwt.verify(token, Config.authentication.secret, (err, decoded) => {
			request.error = true;
			request.decoded = "";
			if (!err) {
				if (decoded.user == request.headers['user']) {
					request.error = false;
					request.decoded = decoded;
				}
			}
			next();
		})
	} else {
		reply({
			'success': false,
			'message': 'No token provided'
		}).code(403);
	}
}

/**
 * handlers
 */
module.exports.getAllDocuments = (request, reply) => {
    reply({"ENV": process.env.NODE_ENV}).code(200);
}

module.exports.authenticate = (request, reply) => {
	let token = jwt.sign({
			exp: Math.floor(Date.now() / 1000) + (60 * 60),
			user: request.payload.user
		}, 
		Config.authentication.secret
	);
	reply({
		'success': true,
		'message': 'Enjoy your token',
		'token': token
	}).code(200);
}

module.exports.getAuthenticate = (request, reply) => {
	reply({
		success: !request.error,
		userInfo: request.decoded
	})
	//reply(request.decoded);
}

/**
 * configs
 */
module.exports.getAll = {
  handler: this.getAllDocuments, 
  validate: {
    headers: Joi.object().keys({
      'content-type': Joi.string().required().valid(['application/json']).default('application/json')          
    }).unknown()
  }
};

module.exports.configAuthenticate = {
	handler: this.authenticate,
	validate: {
		payload: {
			user: Joi.string().min(1).required()
		},
		headers: Joi.object().keys({
      'content-type': Joi.string().required().valid(['application/json']).default('application/json')          
    }).unknown()
	}
}

module.exports.configGetAuthenticate = {
	pre: [
		[
			{
				method: verifyAuthentication
			}
		]
	],
	handler: this.getAuthenticate,
	validate: {
		headers: Joi.object().keys({
			'content-type': Joi.string().required().valid(['application/json']).default('application/json'),
			'x-access-token': Joi.string().required(),
			'user': Joi.string().required()
		}).unknown()
	}
}