//Load table models
const User = require('../models/user')
const Deliveryman = require('../models/deliveryman')

//Load validation models
const {createDeliverymanValidation, updateDeliverymanValidation} = require('../validations/deliverymanValidation')

//Load token controller
const {verifTokenController} = require('../controllers/tokenController')

//Create deliveryman
const createDeliverymanController = async (req, res) =>{

    //Check if data format is OK
    const { error } = createDeliverymanValidation(req.body);
    if (error) return res.status(200).send(error.details[0].message)

    //Check who is the user
    const accesstoken = req.headers['authorization'];
    const userid = await verifTokenController(accesstoken)
    if(userid == null) return res.status(200).send("Vous n'avez pas la permission d'effectuer ceci !");

    const dbuser = await User.findOne({ where: {id: userid} });

    if(dbuser.usertype == "restaurateur") return res.status(200).send("Vous êtes déjà restaurateur !");
    if(dbuser.usertype == "dev") return res.status(200).send("Vous êtes déjà développeur !");

    //Create a new restaurant
    var dbdeliveryman = await Deliveryman.findOne({ where: {userid: userid}});
    if(dbdeliveryman != null) return res.status(200).send("L'utilisateur est déjà livreur");

    // var sponsorshipLink = null
    // if(req.param("sponsorshipLink")){sponsorshipLink = req.param("sponsorshipLink")}

    if(dbdeliveryman == null){
        const deliveryman = Deliveryman.build({
            userid: userid,
            siret: req.body.siret,
            wallet: 0,
            sponsorshipLink: req.body.sponsorshipLink
        })
        await deliveryman.save();
    }
    
    await User.update({usertype: "deliveryman"},{where: {id: userid}});

    //Send response 
    res.status(200).send(`Vous êtes maintenant livreur`)
};

//Modify deliveryman
const updateDeliverymanController = async (req, res) =>{
        //Check if data format is OK
        const { error } = updateDeliverymanValidation(req.body);
        if (error) return res.status(200).send(error.details[0].message)
        
        //Check who is the user
        const accesstoken = req.headers['authorization'];
        const userid = await verifTokenController(accesstoken)
        if(userid == null) return res.status(200).send("Vous n'avez pas la permission d'effectuer ceci !");
        
        // const dbuser = await User.findOne({ where: {id: userid} });
        var dbdeliveryman = await Deliveryman.findOne({ where: {userid: userid}});
    
        //Change siret number
        if (req.body.siret){await Deliveryman.update({siret: req.body.siret},{where: {id: dbdeliveryman.id}})}
    
        //return response
        res.status(200).send(`Votre compte à été mis à jour`)
};

//Delete deliveryman
const deleteDeliverymanController = async (req, res) =>{

        const accesstoken = req.headers['authorization'];
        const userid = await verifTokenController(accesstoken)
    
        //Checking if the restaurant is already in the database
        const dbdeliveryman = await Deliveryman.findOne({ where: {userid: userid} });
        if (dbdeliveryman == null) return res.status(200).send("Vous n'êtes pas livreur");
    
        await Deliveryman.destroy({where: {userid: userid}});
        await User.update({usertype: "customer"},{where: {id: userid}});
        
        //Send response 
        res.status(200).send(`Vous n'êtes plus livreur :(`)
};

//Info deliveryman
const infoDeliverymanController = async (req, res) =>{

    const accesstoken = req.headers['authorization'];
    const userid = await verifTokenController(accesstoken)
    //Get user info
    const dbdeliveryman = await Deliveryman.findOne({ where: {userid: userid} });
    if (!dbdeliveryman) return res.status(200).send("Aucune informations sur l'utilisateur"); 

    //Create res message with user private infos
    var resMessage =
        `
        {
            "siret": "${dbdeliveryman.dataValues.siret}",
            "wallet": "${dbdeliveryman.dataValues.wallet}",
            "sponsorshipLink": "${dbdeliveryman.dataValues.sponsorshipLink}"
        }
        `
    
    res.status(200).send(resMessage)
};

module.exports.createDeliverymanController = createDeliverymanController;
module.exports.updateDeliverymanController = updateDeliverymanController;
module.exports.deleteDeliverymanController = deleteDeliverymanController;
module.exports.infoDeliverymanController = infoDeliverymanController;