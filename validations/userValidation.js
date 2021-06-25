//Validation
const Joi = require('@hapi/joi')

//Register validation
const registerUserValidation = (data) => {
    const schema = Joi.object({ 
        firstname: Joi.string()  .min(1) .required(),
        lastname: Joi.string()  .min(1) .required(),
        phone: Joi.string()  .min(4) .required(),
        email: Joi.string() .min(3) .required() .email(),
        password: Joi.string()  .min(6) .required(),
        checkpassword: Joi.string()  .min(6) .required()
    });       
    return schema.validate(data)
}

//Update validation
const updateUserValidation = (data) => {
    const schema = Joi.object({ 
        accesstoken: Joi.string()  .min(1) .required(),
        //email: Joi.string() .min(3) .email(),
        // password: Joi.string()  .min(6) .required(),
        firstname: Joi.string()  .min(1),
        lastname: Joi.string()  .min(1),
        phone: Joi.string()  .min(4),
        email: Joi.string() .min(3) .email(),
        newpassword: Joi.string()  .min(6),
        checkpassword: Joi.string()  .min(6),
        city: Joi.string()  .min(1),
        country: Joi.string()  .min(1),
        postcode: Joi.string()  .min(1),
        address: Joi.string()  .min(1),
        usertype: Joi.string()  .min(1)
    });       
    return schema.validate(data)
}

//Delete validation
const deleteUserValidation = (data) => {
    const schema = Joi.object({ 
        accesstoken: Joi.string()  .min(1) .required()
    });       
    return schema.validate(data)
}

//Info validation
const infoUserValidation = (data) => {
    const schema = Joi.object({ 
        accesstoken: Joi.string()  .min(1) .required()
    });       
    return schema.validate(data)
}

module.exports.registerUserValidation = registerUserValidation;
module.exports.updateUserValidation = updateUserValidation;
module.exports.deleteUserValidation = deleteUserValidation;
module.exports.infoUserValidation = infoUserValidation;
