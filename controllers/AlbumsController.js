'use strict';

const Joi = require('joi');
const albumsModel = require('../models/AlbumsModel');
const AlbumsEntity = require('../entities/AlbumsEntity');

module.exports.createAlbum = (request, reply) => {
  request.server.auth.test('token', request, (err, credentials) => {
    if (err) {
      return reply().code(500);
    }
    albumsModel.createAlbum(credentials.id, request.payload, (err, result, created) => {
      if(!err) {
        if (!created) {
          return reply({
            succes: false,
            message: 'Already exists an album with the same names.'
          }).code(409);
        }
        AlbumsEntity.setAlbums(result);
        reply(AlbumsEntity.getAlbum()).code(201);
      }
    })
  });
}

module.exports.listAlbums = (request, reply) => {
  request.server.auth.test('token', request, (err, credentials) => {
    if (err) {
      return reply().code(500);
    }
    albumsModel.listAlbums(credentials.id, (err, result) => {
      if(err) {
        return reply().code(500);
      }
      AlbumsEntity.setAlbums(result);
      reply(AlbumsEntity.getAlbum()).code(200);
    })
  });
}

module.exports.listAlbum = (request, reply) => {
  request.server.auth.test('token', request, (err, credentials) => {
    if (err) {
      return reply().code(500);
    }
    albumsModel.listAlbum(credentials.id, request.params.id, (err, result) => {
      AlbumsEntity.setAlbums(result);
      reply(AlbumsEntity.getAlbum()).code(200);
    })
  });
}

/**
 * configs
 */
module.exports.configCreateAlbum = {
  auth: 'token',
	handler: this.createAlbum,
	validate: {
    payload: {
      name: Joi.string().required(),
      description: Joi.string().required()
    },
		headers: Joi.object().keys({
			'content-type': Joi.string().required().valid(['application/json']).default('application/json'),
			'x-access-token': Joi.string().required()
		}).unknown()
	}
}

module.exports.configListAlbums = {
  auth: 'token',
  handler: this.listAlbums,
  validate: {
    headers: Joi.object().keys({
      'content-type': Joi.string().required().valid(['application/json']).default('application/json'),
      'x-access-token': Joi.string().required()
    }).unknown()
  }
}

module.exports.configListAlbum = {
  auth: 'token',
  handler: this.listAlbum,
  validate: {
    params: {
      id: Joi.string().required()
    },
    headers: Joi.object().keys({
      'content-type': Joi.string().required().valid(['application/json']).default('application/json'),
      'x-access-token': Joi.string().required()
    }).unknown()
  }
}