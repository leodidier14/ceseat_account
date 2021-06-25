//Load table models
const User = require('../models/user')
const Address = require('../models/address')
const Restaurant = require('../models/restaurant')

//Load validation models
const {createRestaurantValidation, updateRestaurantValidation, deleteRestaurantValidation, infoRestaurantValidation} = require('../validations/restaurantValidation')

//Load token controller
const {verifTokenController} = require('../controllers/tokenController')

//Register restaurant OK
const createRestaurantController = async (req, res) =>{
    
    //Check if data format is OK
    const { error } = createRestaurantValidation(req.body);
    if (error) return res.status(200).send(error.details[0].message)

    //Checking if the restaurant is already in the database
    const reponse = await Restaurant.findOne({ where: {email: req.body.email} });
    if (reponse != null) return res.status(200).send('Le restaurant existe déjà !');

    //Check who is the user
    const userid = await verifTokenController(req.body.accesstoken)
    if(userid == null) return res.status(200).send("Vous n'avez pas la permission d'effectuer ceci !");

    const dbusertype = await User.findOne({ where: {id: userid} });
    if(dbusertype.usertype == "deliveryman") return res.status(200).send("Vous êtes déjà livreur !");   
    if(dbusertype.usertype == "dev") return res.status(200).send("Vous êtes déjà développeur !");
    
    //Create a new restaurant
    var dbrestaurant = await Restaurant.findOne({ where: {userid: userid}});

    if(dbrestaurant != null) return res.status(200).send("Vous avez déjà un restaurant");

    var sponsorship = null
    if(req.param("sponsorship")){sponsorship = req.param("sponsorship")}
    
    if(dbrestaurant == null){
        const restaurant = Restaurant.build({
            userid: userid,
            siret: req.body.siret,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            sponsorship: sponsorship
        })
        await restaurant.save();
    }
    
    dbrestaurant = await Restaurant.findOne({ where: {userid: userid}});
    try {
        await User.update({idrestaurant: dbrestaurant.id},{where: {id: userid}})
    } catch (error) {
        res.status(200).send(`Un problème est apparu lors de la creation de votre restaurant`)
    }
    
    if (req.body.description){await Restaurant.update({description: req.body.description},{where: {id: dbrestaurant.id}});}
    if (req.body.website){await Restaurant.update({website: req.body.website},{where: {id: dbrestaurant.id}});}
    if (req.body.openingtime){await Restaurant.update({openingtime: req.body.openingtime},{where: {id: dbrestaurant.id}});}
    if (req.body.closingtime){await Restaurant.update({closingtime: req.body.closingtime},{where: {id: dbrestaurant.id}});}
    if (req.body.picturelink){await Restaurant.update({picturelink: req.body.picturelink},{where: {id: dbrestaurant.id}});}
    if (req.body.type){await Restaurant.update({type: req.body.type},{where: {id: dbrestaurant.id}});}

    if (req.body.sponsorship){await Restaurant.update({sponsorship: req.body.sponsorship},{where: {id: dbrestaurant.id}});}

        adAddress = ""
        try {
            adAddress = req.body.address
        } catch (error) {
            adAddress = null
        }

        adCity = ""
        try {
            adCity = req.body.city
        } catch (error) {
            adCity = null
        }

        adCountry = ""
        try {
            adCountry = req.body.country
        } catch (error) {
            adCountry = null
        }

        adPostcode = ""
        try {
            adPostcode = req.body.postcode
        } catch (error) {
            adPostcode = null
        }

        const address = Address.build({ 
            country: adCountry,
            city: adCity,
            address: adAddress,
            postcode: adPostcode,
        })

        await address.save();
    
    
    dbaddress = await Address.findOne({where: {country: req.body.country, city: req.body.city, address: req.body.address, postcode: req.body.postcode}})
    
    dbrestaurant = await Restaurant.findOne({ where: {userid: userid}});

    try {
         await Restaurant.update({addressid: dbaddress.id},{where: {userid: userid}});
    } catch (error) {
    }

    dbrestaurant = await Restaurant.findOne({ where: {userid: userid}});

    dbaddress = await Address.findOne({ where: {id: dbrestaurant.addressid}});
   
    await User.update({usertype: "restaurateur"},{where: {id: userid}});
    res.status(200).send(`Restaurant créé`)
};

//Modify restaurant
const updateRestaurantController = async (req, res) =>{

        //Check if data format is OK
        const { error } = updateRestaurantValidation(req.body);
        if (error) return res.status(200).send(error.details[0].message)
    
        //Check who is the user
        const userid = await verifTokenController(req.body.accesstoken)
        if(userid == null) return res.status(200).send("Vous n'avez pas la permission d'effectuer ceci !");

        //Checking if the restaurant is already in the database
        const dbrestaurant = await Restaurant.findOne({ where: {userid: userid} });
        if (dbrestaurant == null) return res.status(200).send("Le restaurant n'existe pas");

        if (req.body.phone){await Restaurant.update({phone: req.body.phone},{where: {id: dbrestaurant.id}})}
        if (req.body.email){await Restaurant.update({email: req.body.email},{where: {id: dbrestaurant.id}})}
        if (req.body.name){await Restaurant.update({name: req.body.name},{where: {id: dbrestaurant.id}});}
        if (req.body.description){await Restaurant.update({description: req.body.description},{where: {id: dbrestaurant.id}});}
        if (req.body.website){await Restaurant.update({website: req.body.website},{where: {id: dbrestaurant.id}});}
        if (req.body.openingtime){await Restaurant.update({openingtime: req.body.openingtime},{where: {id: dbrestaurant.id}});}
        if (req.body.closingtime){await Restaurant.update({closingtime: req.body.closingtime},{where: {id: dbrestaurant.id}});}
        if (req.body.picturelink){await Restaurant.update({picturelink: req.body.picturelink},{where: {id: dbrestaurant.id}});}
        if (req.body.type){await Restaurant.update({type: req.body.type},{where: {id: dbrestaurant.id}});}
        if (req.body.siret){await Restaurant.update({siret: req.body.siret},{where: {id: dbrestaurant.id}})}

        if (req.body.city){await Address.update({city: req.body.city},{where: {id: dbrestaurant.addressid}});}
        if (req.body.country){await Address.update({country: req.body.country},{where: {id: dbrestaurant.addressid}});}
        if (req.body.postcode){await Address.update({postcode: req.body.postcode},{where: {id: dbrestaurant.addressid}});}
        if (req.body.address){await Address.update({address: req.body.address},{where: {id: dbrestaurant.addressid}});}
            
        //Send response 
        res.status(200).send(`Restaurant modifié`)
};

//Delete restaurant OK
const deleteRestaurantController = async (req, res) =>{

        const userid = req.params.id
    
        //Checking if the restaurant is already in the database
        const dbrestaurant = await Restaurant.findOne({ where: {userid: userid} });
        if (dbrestaurant == null) return res.status(200).send("Le restaurant n'existe pas");
    
        try {await Restaurant.destroy({where: {id: dbrestaurant.id}});} catch (error) {}
        
        try {await Address.destroy({where: {id: dbrestaurant.addressid}});} catch (error) {}
        
        await User.update({usertype: "customer"},{where: {id: userid}});

        //Send response 
        res.status(200).send(`Restaurant supprimé`)

};

//Info restaurant OK
const infoRestaurantController = async (req, res) =>{
    
    const userid = req.params.id

    //Get user info
    const dbrestaurant = await Restaurant.findOne({ where: {userid: userid} });
    if (!dbrestaurant) return res.status(200).send("Aucune informations sur l'utilisateur"); 

    //Checking if the email exists 
    const dbaddress = await Address.findOne({ where: {id: dbrestaurant.addressid} });

    var resMessage = ""

    if (!dbaddress) {
        //Create res message with user private infos
        resMessage =  
        `
        {
            "name": "${dbrestaurant.dataValues.name}",
            "siret": "${dbrestaurant.dataValues.siret}",
            "email": "${dbrestaurant.dataValues.email}",
            "phone": "${dbrestaurant.dataValues.phone}",
            "description": "${dbrestaurant.dataValues.description}",
            "website": "${dbrestaurant.dataValues.website}",
            "openingtime": "${dbrestaurant.dataValues.openingtime}",
            "picturelink": "${dbrestaurant.dataValues.picturelink}",
            "type": "${dbrestaurant.dataValues.type}"
        }
        `
    }
    else {
        //Create res message with user private infos
        resMessage =  
        `
        {
            "name": "${dbrestaurant.dataValues.name}",
            "siret": "${dbrestaurant.dataValues.siret}",
            "email": "${dbrestaurant.dataValues.email}",
            "phone": "${dbrestaurant.dataValues.phone}",
            "description": "${dbrestaurant.dataValues.description}",
            "website": "${dbrestaurant.dataValues.website}",
            "openingtime": "${dbrestaurant.dataValues.openingtime}",
            "picturelink": "${dbrestaurant.dataValues.picturelink}",
            "type": "${dbrestaurant.dataValues.type}",

            "address": "${dbaddress.dataValues.address}",
            "postalcode": "${dbaddress.dataValues.postcode}",
            "city": "${dbaddress.dataValues.city}",
            "country": "${dbaddress.dataValues.country}"
        }
        `
    }
    

    res.status(200).send(resMessage)
};


module.exports.createRestaurantController = createRestaurantController;
module.exports.updateRestaurantController = updateRestaurantController;
module.exports.deleteRestaurantController = deleteRestaurantController;
module.exports.infoRestaurantController = infoRestaurantController;