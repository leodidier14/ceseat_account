//Load table models
const User = require('../models/user')
const Dev = require('../models/dev')

//Load validation models
const {createDevValidation, updateDevValidation, deleteDevValidation, infoDevValidation} = require('../validations/devValidation')

//Load token controller
const {verifTokenController} = require('../controllers/tokenController')

//Create dev
const createDevController = async (req, res) =>{

    //Check if data format is OK
    const { error } = createDevValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    //Check who is the user
    const userid = await verifTokenController(req.body.accesstoken)
    if(userid == null) return res.status(400).send("Vous n'avez pas la permission d'effectuer ceci !");

    const dbuser = await User.findOne({ where: {id: userid} });

    if(dbuser.usertype == "restaurateur") return res.status(400).send("Vous êtes déjà restaurateur !");
    if(dbuser.usertype == "deliveryman") return res.status(400).send("Vous êtes déjà livreur !");

    //Create a new restaurant
    var dbdev = await Dev.findOne({ where: {userid: userid}});
    if(dbdev != null) return res.status(400).send("Vous êtes déjà développeur !");

    if(dbdev == null){
        const dev = Dev.build({
            userid: userid,
            siret: req.body.siret
        })
        await dev.save();
    }
    
    await User.update({usertype: "dev"},{where: {id: userid}});

    //Send response 
    res.status(200).send(`Vous êtes maintenant développeur`)
};

//Modify dev
const updateDevController = async (req, res) =>{
    //Check if data format is OK
    const { error } = updateDevValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    
    //Check who is the user
    const userid = await verifTokenController(req.body.accesstoken)
    if(userid == null) return res.status(400).send("Vous n'avez pas la permission d'effectuer ceci !");
    
    // const dbuser = await User.findOne({ where: {id: userid} });
    var dbdev = await Dev.findOne({ where: {userid: userid}});

    //Change siret number
    if (req.body.siret){await Dev.update({siret: req.body.siret},{where: {id: dbdev.id}})}

    //return response
    res.status(200).send(`Votre compte à été mis à jour`)
};

//Delete dev
const deleteDevController = async (req, res) =>{
    
        //Check if data format is OK
        const { error } = deleteDevValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        //Check who is the user
        const userid = await verifTokenController(req.body.accesstoken)
        if(userid == null) return res.status(400).send("Vous n'avez pas la permission d'effectuer ceci !");
    
        //Checking if the restaurant is already in the database
        const dbdev = await Dev.findOne({ where: {userid: userid} });
        if (dbdev == null) return res.status(400).send("Vous n'êtes pas développeur !");
    
        //Delete user ligne on dev table
        await Dev.destroy({where: {userid: userid}});

        //Change user role to customer
        await User.update({usertype: "customer"},{where: {id: userid}});

        //Send response 
        res.status(200).send(`Vous n'êtes plus développeur :(`)
};

//Info dev
const infoDevController = async (req, res) =>{
    
    //Check if data format is OK
    const { error } = infoDevValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    
    //Check who is the user
    const userid = await verifTokenController(req.body.accesstoken)
    if(userid == null) return res.status(400).send("Vous n'avez pas la permission d'effectuer ceci !");

    //Get user info
    const dbdev = await Dev.findOne({ where: {userid: userid} });
    if (!dbdev) return res.status(400).send("Aucune informations disponible sur votre compte développeur"); 

    //Create res message with user private infos
    var resMessage =
        `
        {
            "siret": "${dbdev.dataValues.siret}"
        }
        `
    
    res.status(200).send(resMessage)
};

module.exports.createDevController = createDevController;
module.exports.updateDevController = updateDevController;
module.exports.deleteDevController = deleteDevController;
module.exports.infoDevController = infoDevController;