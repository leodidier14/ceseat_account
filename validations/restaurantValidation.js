//Validation
const Joi = require('@hapi/joi')

//Create restaurant
const createRestaurantValidation = (data) => {
    const schema = Joi.object({ 
        siret: Joi.string()  .min(1) .required(),
        email: Joi.string() .min(3) .required() .email(),
        name: Joi.string()  .min(1) .required(),
        phone: Joi.string()  .min(4) .required(),  
        description: Joi.string()  .min(1) .required(),
        website: Joi.string()  .min(1), 
        openingtime: Joi.string()  .min(1) .required(),
        closingtime : Joi.string()  .min(1) .required(),
        picturelink: Joi.string()  .min(1) .required(),
        type: Joi.string()  .min(1) .required(),
        address: Joi.string()  .min(1) .required(),
        country: Joi.string()  .min(1) .required(),
        city: Joi.string()  .min(1) .required(),
        postcode: Joi.string()  .min(1) .required()
    });       
    return schema.validate(data)
}

//Update restaurant
const updateRestaurantValidation = (data) => {
    const schema = Joi.object({ 
        siret: Joi.string()  .min(1) .required(),
        email: Joi.string() .min(3) .required() .email(),
        name: Joi.string()  .min(1) .required(),
        phone: Joi.string()  .min(4) .required(),  
        description: Joi.string()  .min(1),
        website: Joi.string()  .min(1), 
        openingtime: Joi.string()  .min(1),
        closingtime: Joi.string()  .min(1),
        picturelink: Joi.string()  .min(1),
        type: Joi.string()  .min(1),
        address: Joi.string()  .min(1),
        country: Joi.string()  .min(1),
        city: Joi.string()  .min(1),
        postcode: Joi.string()  .min(1)
    });       
    return schema.validate(data)
}

module.exports.createRestaurantValidation = createRestaurantValidation;
module.exports.updateRestaurantValidation = updateRestaurantValidation;