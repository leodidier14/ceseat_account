//Validation
const Joi = require('@hapi/joi')

//Create restaurant
const createDeliverymanValidation = (data) => {
    const schema = Joi.object({ 
        accesstoken: Joi.string()  .min(1) .required(),
        siret: Joi.string()  .min(1) .required()      
    });       
    return schema.validate(data)
}

//Update restaurant
const updateDeliverymanValidation = (data) => {
    const schema = Joi.object({ 
        accesstoken: Joi.string()  .min(1) .required()
    });       
    return schema.validate(data)
}

const deleteDeliverymanValidation = (data) => {
    const schema = Joi.object({ 
        accesstoken: Joi.string()  .min(1) .required()
    });       
    return schema.validate(data)
}

const infoDeliverymanValidation = (data) => {
    const schema = Joi.object({ 
        accesstoken: Joi.string()  .min(1) .required()
    });       
    return schema.validate(data)
}

module.exports.createDeliverymanValidation = createDeliverymanValidation;
module.exports.updateDeliverymanValidation = updateDeliverymanValidation;
module.exports.deleteDeliverymanValidation = deleteDeliverymanValidation;
module.exports.infoDeliverymanValidation = infoDeliverymanValidation;