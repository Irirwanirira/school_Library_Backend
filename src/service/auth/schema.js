import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().min(6).max(30).required()
      .messages({
        "string.base": "Name should be a string",
        "string.empty": "Name cannot be empty",
        "string.min": "Name should have a minimum length of {#limit}",
        "string.max": "Name should have a maximum length of {#limit}",
        "any.required": "Name is a required field"
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .required()
      .messages({
        "string.base": "Email should be a string",
        "string.empty": "Email cannot be empty",
        "string.email": "Email should be a valid email",
        "any.required": "Email is a required field"
      }),
    password: Joi.string()
    //   .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
      .required()
      .messages({
        "string.base": "Password should be a string",
        "string.empty": "Password cannot be empty",
        "string.pattern.base":
          "Password should have at least one uppercase, one lowercase, one number and one special character",
        "any.required": "Password is a required field"
      }),
    });

    export const validateIdOnly = Joi.object({
        id: Joi.number().integer().positive().required()
         .messages({
        "number.base": "Id should be a number",
        "number.empty": "Id cannot be empty",
        "number.integer": "Id should be an integer",
        "number.positive": "Id should be a positive number",
        "any.required": "Id is a required field"
    })
});