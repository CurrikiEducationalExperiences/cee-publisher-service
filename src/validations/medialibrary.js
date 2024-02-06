const Joi = require('joi');

module.exports.create = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  mediaOwnerId: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(100),
  type: Joi.string().min(3).max(100).required(),
  resource: Joi.string().min(3).max(100).required(),
  parentId: Joi.string().min(3).max(100),
  identifierType: Joi.string().min(3).max(100),
  identifier: Joi.string().min(3).max(100),
  thumbnail: Joi.string().min(3).max(100),
  collection: Joi.string().min(3).max(100),
});

module.exports.get = Joi.object({
  id: Joi.string().min(1).max(1000).required(),
});

module.exports.update = Joi.object({
  id: Joi.string().min(1).max(1000).required(),
  mediaOwnerId: Joi.string().min(3).max(100),
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(100),
  type: Joi.string().min(3).max(100).required(),
  resource: Joi.string().min(3).max(100).required(),
  parentId: Joi.string().min(3).max(100),
  identifierType: Joi.string().min(3).max(100),
  identifier: Joi.string().min(3).max(100),
  thumbnail: Joi.string().min(3).max(100),
  collection: Joi.string().min(3).max(100)
});

module.exports.delete = Joi.object({
  id: Joi.string().min(1).max(1000).required(),
});
