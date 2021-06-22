//Validation
const Joi = require('@hapi/joi')

//Register validation
const registerValidation = (data) => {
    const schema = Joi.object({ 
        firstname: Joi.string()  .min(1) .required(),
        lastname: Joi.string()  .min(1) .required(),
        phone: Joi.string()  .min(4) .required(),
        email: Joi.string() .min(3) .required() .email(),
        password: Joi.string()  .min(6) .required(),
        checkpassword: Joi.string()  .min(6) .required(), 
        usertype: Joi.string()  .min(1) .required()
    });       
    return schema.validate(data)
}

//Update validation
const updateValidation = (data) => {
    const schema = Joi.object({ 
        email: Joi.string() .min(3) .required() .email(),
        password: Joi.string()  .min(6) .required(),
        newfirstname: Joi.string()  .min(1),
        newlastname: Joi.string()  .min(1),
        newphone: Joi.string()  .min(4),
        newemail: Joi.string() .min(3) .email(),
        newpassword: Joi.string()  .min(6),
        newcheckpassword: Joi.string()  .min(6),
        newcity: Joi.string()  .min(1),
        newcountry: Joi.string()  .min(1),
        newpostcode: Joi.string()  .min(1),
        newaddress: Joi.string()  .min(1),
        newusertype: Joi.string()  .min(1)
    });       
    return schema.validate(data)
}

//Delete validation
const deleteValidation = (data) => {
    const schema = Joi.object({ 
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string()  .min(6) .required() 
    });       
    return schema.validate(data)
}

//Infos validation
const infoValidation = (data) => {
    const schema = Joi.object({ 
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string()  .min(6) .required() 
    });       
    return schema.validate(data)
}

//Create restaurant
const createrestaurantValidation = (data) => {
    const schema = Joi.object({ 
        accesstoken: Joi.string()  .min(1) .required(),
        siret: Joi.string()  .min(1) .required(),
        email: Joi.string() .min(3) .required() .email(),
        name: Joi.string()  .min(1) .required(),
        phone: Joi.string()  .min(4) .required(),  
        description: Joi.string()  .min(1),
        website: Joi.string()  .min(1), 
        openingtime: Joi.string()  .min(1),
        picturelink: Joi.string()  .min(1),
        type: Joi.string()  .min(1),
        address: Joi.string()  .min(1),
        country: Joi.string()  .min(1),
        city: Joi.string()  .min(1),
        postcode: Joi.string()  .min(1)
    });       
    return schema.validate(data)
}

const updaterestaurantValidation = (data) => {
    const schema = Joi.object({ 
        accesstoken: Joi.string()  .min(1) .required(),
        restaurantid: Joi.string()  .min(1) .required(),
        email: Joi.string() .min(3) .required() .email(),
        name: Joi.string()  .min(1) .required(),
        phone: Joi.string()  .min(4) .required(),  
        description: Joi.string()  .min(1),
        website: Joi.string()  .min(1), 
        openingtime: Joi.string()  .min(1),
        picturelink: Joi.string()  .min(1),
        type: Joi.string()  .min(1),
        address: Joi.string()  .min(1),
        country: Joi.string()  .min(1),
        city: Joi.string()  .min(1),
        postcode: Joi.string()  .min(1)
    });       
    return schema.validate(data)
}

const deleterestaurantValidation = (data) => {
    const schema = Joi.object({ 
        accesstoken: Joi.string()  .min(1) .required(),
        restaurantid: Joi.string()  .min(1) .required(),
    });       
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.updateValidation = updateValidation;
module.exports.deleteValidation = deleteValidation;
module.exports.infoValidation = infoValidation;
module.exports.createrestaurantValidation = createrestaurantValidation;
module.exports.updaterestaurantValidation = updaterestaurantValidation;
module.exports.deleterestaurantValidation = deleterestaurantValidation;