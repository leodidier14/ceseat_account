//Validation
const Joi = require('@hapi/joi')

//Create restaurant
const createDeliverymanValidation = (data) => {
    const schema = Joi.object({
        siret: Joi.string().min(1).required(),
        sponsorshipLink: Joi.string().allow(null).allow('').optional()
    });
    return schema.validate(data)
}

//Update restaurant
const updateDeliverymanValidation = (data) => {
    const schema = Joi.object({
        siret: Joi.string().min(1).required(),
        sponsorshipLink: Joi.string().allow(null).allow('').optional(),
        wallet: Joi.number().allow(null).allow('').optional()
    });
    return schema.validate(data)
}

module.exports.createDeliverymanValidation = createDeliverymanValidation;
module.exports.updateDeliverymanValidation = updateDeliverymanValidation;