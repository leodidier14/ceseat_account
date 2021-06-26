//Validation
const Joi = require('@hapi/joi')

//Create restaurant
const createDevValidation = (data) => {
    const schema = Joi.object({ 
        siret: Joi.string()  .min(1) .required()      
    });       
    return schema.validate(data)
}

//Update restaurant
const updateDevValidation = (data) => {
    const schema = Joi.object({ 
        siret: Joi.string()  .min(1) .required()
    });       
    return schema.validate(data)
}

module.exports.createDevValidation = createDevValidation;
module.exports.updateDevValidation = updateDevValidation;