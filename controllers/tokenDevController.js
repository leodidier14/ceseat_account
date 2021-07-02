//Load required elements
const jwt = require('jsonwebtoken');

//Load table models
const Dev = require('../models/dev')

const verifTokenDevController = async (accesstoken) =>{
    try {
        const verifytoken = await jwt.verify(accesstoken, 'spvDLMU678yZu635T32TKfc8pQj4jJ4f')
        try {
            const finduser = await Dev.findOne({ where: {id: verifytoken.userId}})
            if(finduser.refreshtoken){return verifytoken.userId}
            else{return null}
        } catch (error) {
            return null
        }
    } catch (error) {
        return null 
     }
}

module.exports.verifTokenDevController = verifTokenDevController;