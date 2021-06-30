//Validation
const Joi = require('@hapi/joi')

//Register validation
const registerUserValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required(),
        phoneNumber: Joi.string().min(4).required(),
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(6).required(),
        confirmedPassword: Joi.string().min(6).required(),
        sponsorshipLink: Joi.string().min(6)
    });
    return schema.validate(data)
}

//Update validation
const updateUserValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(1),
        lastName: Joi.string().min(1),
        phoneNumber: Joi.string().min(4),
        email: Joi.string().min(3).email(),
        newPassword: Joi.string().min(1),
        confirmedPassword: Joi.string().min(1),
        city: Joi.string().allow('', null),
        country: Joi.string().allow('', null),
        zipCode: Joi.string().allow('', null),
        address: Joi.string().allow('', null),
        id: Joi.number().min(1),
        sponsorshipLink: Joi.string()
    });
    return schema.validate(data)
}

module.exports.registerUserValidation = registerUserValidation;
module.exports.updateUserValidation = updateUserValidation;
