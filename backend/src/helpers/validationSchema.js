const Joi = require("joi");

module.exports.registerSchema = Joi.object({
  username: Joi.string().min(8).alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/[!@#$%&*_!]/)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .required(),
  repassword: Joi.ref("password"),
});

module.exports.loginSchema = Joi.object({
  username: Joi.string().min(8),
  email: Joi.string().email(),
  password: Joi.string()
    .min(8)
    .pattern(/[!@#$%&*_!]/)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .required(),
});
