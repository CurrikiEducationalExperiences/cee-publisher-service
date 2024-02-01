const Joi = require('joi');

module.exports.create = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(1000),
  about: Joi.string().min(3).max(1000)
});

module.exports.get = Joi.object({
  id: Joi.string().min(1).max(1000).required(),
});

module.exports.update = Joi.object({
  id: Joi.string().min(1).max(1000).required(),
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(1000),
  about: Joi.string().min(3).max(1000)
});

module.exports.delete = Joi.object({
  id: Joi.string().min(1).max(1000).required(),
});
