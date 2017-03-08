'use strict';

const Joi = require('joi');
var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'sample', 
  api_key: '874837483274837', 
  api_secret: 'a676b67565c6767a6767d6767f676fe1' 
});

//http://cloudinary.com/documentation/node_integration#getting_started_guide


module.exports.getAllDocuments = (request, reply) => {
    reply({"ENV": process.env.NODE_ENV}).code(200);
}

module.exports.getAll = {
  handler: this.getAllDocuments, 
  validate: {
    headers: Joi.object().keys({
      'content-type': Joi.string().required().valid(['application/json']).default('application/json')          
    }).unknown()
  }
};