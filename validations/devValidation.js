//Validation
const Joi = require('@hapi/joi')

const registerDevValidation = (data) => {
    const schema = Joi.object({
        companyName: Joi.string().min(3).required(),
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(3).required(),
        confirmedPassword: Joi.string().min(3).required()
    });
    return schema.validate(data)
}

//Update validation
const updateDevValidation = (data) => {
    const schema = Joi.object({
        companyName: Joi.string().min(3).required(),
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(3),
        confirmedPassword: Joi.string().min(3),
    });
    return schema.validate(data)
}

module.exports.registerDevValidation = registerDevValidation;
module.exports.updateDevValidation = updateDevValidation;