'use strict';

const Joi = require('joi');
// const albumsModel = require('../models/AlbumsModel');
// const AlbumsEntity = require('../entities/AlbumsEntity');

module.exports.createPicture = (request, reply) => {
  // request.server.auth.test('token', request, (err, credentials) => {
  //   if (err) {
  //     return reply().code(500);
  //   }
  //   albumsModel.createAlbum(credentials.id, request.payload, (err, result, created) => {
  //     if(!err) {
  //       if (!created) {
  //         return reply({
  //           succes: false,
  //           message: 'Already exists an album with the same names.'
  //         }).code(409);
  //       }
  //       AlbumsEntity.setAlbums(result);
  //       reply(AlbumsEntity.getAlbum()).code(201);
  //     }
  //   })
  // });
}

module.exports.listPictures = (request, reply) => {
  // request.server.auth.test('token', request, (err, credentials) => {
  //   if (err) {
  //     return reply().code(500);
  //   }
  //   albumsModel.listAlbums(credentials.id, (err, result) => {
  //     if(err) {
  //       return reply().code(500);
  //     }
  //     AlbumsEntity.setAlbums(result);
  //     reply(AlbumsEntity.getAlbum()).code(200);
  //   })
  // });
}

module.exports.listPicture = (request, reply) => {
  // request.server.auth.test('token', request, (err, credentials) => {
  //   if (err) {
  //     return reply().code(500);
  //   }
  //   albumsModel.listAlbum(credentials.id, request.params.id, (err, result) => {
  //     AlbumsEntity.setAlbums(result);
  //     reply(AlbumsEntity.getAlbum()).code(200);
  //   })
  // });
}

/**
 * configs
 */
module.exports.configCreatePicture = {
  auth: 'token',
	handler: this.createPicture,
  description: 'Create a new picture to a user',
  notes: [
    'Create a new picture to user and returns all the information.',
    'This method doesn\'t do upload of the image'
  ],
  tags: ['api', 'albums', 'create'],
	validate: {
    params: {
      albumId: Joi.string().required().description('Album ID')
    },
    payload: {
      description: Joi.string().optional().description('Image Description')
    },
		headers: Joi.object().keys({
			'content-type': Joi.string().required().valid(['application/json']).default('application/json'),
			'x-access-token': Joi.string().required()
		}).unknown()
	}
}

module.exports.configListPictures = {
  // auth: 'token',
  // handler: this.listAlbums,
  // validate: {
  //   headers: Joi.object().keys({
  //     'content-type': Joi.string().required().valid(['application/json']).default('application/json'),
  //     'x-access-token': Joi.string().required()
  //   }).unknown()
  // }
}

module.exports.configListPicture = {
  // auth: 'token',
  // handler: this.listAlbum,
  // validate: {
  //   params: {
  //     id: Joi.string().required()
  //   },
  //   headers: Joi.object().keys({
  //     'content-type': Joi.string().required().valid(['application/json']).default('application/json'),
  //     'x-access-token': Joi.string().required()
  //   }).unknown()
  // }
}

module.exports.configUploadPicture = {
  // Joi.object({
  //   filename: Joi.string().required(),
  //   path: Joi.string().required(),
  //   headers: Joi.object({
  //     'content-disposition' : Joi.string().required(),
  //     'content-type' : Joi.string().valid(['image/jpeg']).required(),
  //   }).required(),
  //   bytes: Joi.number().required()
  // });
}