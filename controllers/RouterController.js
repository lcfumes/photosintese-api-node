'use strict';

const Joi = require('joi');

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