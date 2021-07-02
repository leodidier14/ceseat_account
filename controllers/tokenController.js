//Load required elements
const jwt = require('jsonwebtoken');

//Load table models
const User = require('../models/user')

const verifTokenController = async (accesstoken) =>{
    try {
        const verifytoken = await jwt.verify(accesstoken, 'spvDLMU678yZu635T32TKfc8pQj4jJ4f')
        try {
            const finduser = await User.findOne({ where: {id: verifytoken.userId}}) 
            if(finduser.refreshtoken){return verifytoken.userId}
            else{return null}
        } catch (error) {
            return null
        }
    } catch (error) {
        return null 
     }
}

module.exports.verifTokenController = verifTokenController;