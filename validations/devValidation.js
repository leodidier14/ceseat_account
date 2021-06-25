//Validation
const Joi = require('@hapi/joi')

//Create restaurant
const createDevValidation = (data) => {
    const schema = Joi.object({ 
        accesstoken: Joi.string()  .min(1) .required(),
        siret: Joi.string()  .min(1) .required()      
    });       
    return schema.validate(data)
}

//Update restaurant
const updateDevValidation = (data) => {
    const schema = Joi.object({ 
        accesstoken: Joi.string()  .min(1) .required(),
        siret: Joi.string()  .min(1) .required()
    });       
    return schema.validate(data)
}

const deleteDevValidation = (data) => {
    const schema = Joi.object({ 
        accesstoken: Joi.string()  .min(1) .required()
    });       
    return schema.validate(data)
}

const infoDevValidation = (data) => {
    const schema = Joi.object({ 
        accesstoken: Joi.string()  .min(1) .required()
    });       
    return schema.validate(data)
}

module.exports.createDevValidation = createDevValidation;
module.exports.updateDevValidation = updateDevValidation;
module.exports.deleteDevValidation = deleteDevValidation;
module.exports.infoDevValidation = infoDevValidation;