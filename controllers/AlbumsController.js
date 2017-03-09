'use strict';

const Joi = require('joi');
const albumsModel = require('../models/AlbumsModel');
const AlbumEntity = require('../entities/AlbumEntity');

module.exports.createAlbum = (request, reply) => {
  request.server.auth.test('token', request, (err, credentials) => {
    if (err) {
      return reply().code(500);
    } else {
      albumsModel.createAlbum(credentials.id, request.payload, (err, result, created) => {
        if(!err) {
          if (!created) {
            return reply({
              succes: false,
              message: 'Already exists an album with the same names.'
            }).code(409);
          }
          AlbumEntity.setAlbum(result);
          reply(AlbumEntity.getAlbum()).code(201);
        }
      })
    }
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