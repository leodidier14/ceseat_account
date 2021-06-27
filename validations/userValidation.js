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
        password: Joi.string().min(6),
        confirmedPassword: Joi.string().min(6),
        city: Joi.string().min(1),
        country: Joi.string().min(1),
        zipCode: Joi.string().min(1),
        address: Joi.string().min(1),
        id: Joi.number().min(1),
        sponsorshipLink: Joi.string()
    });
    return schema.validate(data)
}

module.exports.registerUserValidation = registerUserValidation;
module.exports.updateUserValidation = updateUserValidation;
