//Validation
const Joi = require('@hapi/joi')

//Create restaurant
const createRestaurantValidation = (data) => {
    const schema = Joi.object({ 
        siret: Joi.string()  .min(1) .required(),
        email: Joi.string() .min(3) .required() .email(),
        name: Joi.string()  .min(1) .required(),
        phoneNumber: Joi.string()  .min(4) .required(),  
        description: Joi.string()  .min(1) .required(),
        website: Joi.string()  .min(1), 
        openingTime: Joi.string()  .min(1) .required(),
        closingTime : Joi.string()  .min(1) .required(),
        pictureLink: Joi.string()  .min(1) .required(),
        type: Joi.string()  .min(1) .required(),
        address: Joi.string()  .min(1) .required(),
        country: Joi.string()  .min(1) .required(),
        city: Joi.string()  .min(1) .required(),
        zipCode: Joi.string()  .min(1) .required(),
        sponsorshipLink : Joi.string()  .min(1)
    });       
    return schema.validate(data)
}

//Update restaurant
const updateRestaurantValidation = (data) => {
    const schema = Joi.object({ 
        siret: Joi.string()  .min(1) .required(),
        email: Joi.string() .min(3) .required() .email(),
        name: Joi.string()  .min(1) .required(),
        phoneNumber: Joi.string()  .min(4) .required(),  
        description: Joi.string()  .min(1) .required(),
        website: Joi.string()  .min(1), 
        openingTime: Joi.string()  .min(1) .required(),
        closingTime : Joi.string()  .min(1) .required(),
        pictureLink: Joi.string()  .min(1) .required(),
        type: Joi.string()  .min(1) .required(),
        address: Joi.string()  .min(1) .required(),
        country: Joi.string()  .min(1) .required(),
        city: Joi.string()  .min(1) .required(),
        zipCode: Joi.string()  .min(1) .required(),
    });       
    return schema.validate(data)
}

module.exports.createRestaurantValidation = createRestaurantValidation;
module.exports.updateRestaurantValidation = updateRestaurantValidation;