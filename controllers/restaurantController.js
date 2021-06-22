//Load required elements
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const path = require('path')
const express = require('express')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const jwt = require('jsonwebtoken');

//Load table models
const User = require('../models/user')
const Address = require('../models/address')
const Deliveryman = require('../models/deliveryman')
const Restaurant = require('../models/restaurant')

//Load validation models
const {createRestaurantValidation, updateRestaurantValidation, deleteRestaurantValidation, infoRestaurantValidation} = require('../validations/restaurantValidation')

//Load token controller
const {verifTokenController} = require('../controllers/tokenController')

//Register restaurant
const createRestaurantController = async (req, res) =>{
    
    //Check if data format is OK
    const { error } = createRestaurantValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    //Checking if the restaurant is already in the database
    const reponse = await Restaurant.findOne({ where: {email: req.body.email} });
    if (reponse != null) return res.status(400).send('Le restaurant existe déjà !');

    //Check who is the user
    const userid = await verifTokenController(req.body.accesstoken)
    if(userid == null) return res.status(400).send("Le propriétaire n'a pas pu être identifié");
    // console.log(userid)
    const dbusertype = await User.findOne({ where: {id: userid} });
    if(dbusertype.usertype == "deliveryman") return res.status(400).send("Vous êtes déjà livreur !");
    
    // console.log('user = ' + userid)
    //Create a new restaurant
    var dbrestaurant = await Restaurant.findOne({ where: {userid: userid}});
    if(dbrestaurant != null) return res.status(400).send("L'utilisateur a déjà un restaurant");
    if(dbrestaurant == null){
        const restaurant = Restaurant.build({
            userid: userid,
            siret: req.body.siret,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        })
        await restaurant.save();
    }
    
    dbrestaurant = await Restaurant.findOne({ where: {userid: userid}});
    console.log(dbrestaurant.id)
    if (req.body.description){await Restaurant.update({description: req.body.description},{where: {email: req.body.email}});}
    if (req.body.website){await Restaurant.update({website: req.body.website},{where: {email: req.body.email}});}
    if (req.body.openingtime){await Restaurant.update({openingtime: req.body.openingtime},{where: {email: req.body.email}});}
    if (req.body.picturelink){await Restaurant.update({picturelink: req.body.picturelink},{where: {email: req.body.email}});}
    if (req.body.type){await Restaurant.update({type: req.body.type},{where: {email: req.body.email}});}

    if (req.body.address || req.body.city || req.body.country || req.body.postcode ){
        const address = Address.build({ 
            restaurantid: dbrestaurant.id,
            country: null,
            city: null,
            address: null,
            postcode: null,
        })
        await address.save();
    }

    if (req.body.city){await Address.update({city: req.body.city},{where: {restaurantid: dbrestaurant.id}});}
    if (req.body.country){await Address.update({country: req.body.country},{where: {restaurantid: dbrestaurant.id}});}
    if (req.body.postcode){await Address.update({postcode: req.body.postcode},{where: {restaurantid: dbrestaurant.id}});}
    if (req.body.address){await Address.update({address: req.body.address},{where: {restaurantid: dbrestaurant.id}});}

    var dbaddress = await Address.findOne({ where: {restaurantid: dbrestaurant.id}});
    await Restaurant.update({addressid: dbaddress.id},{where: {id: dbrestaurant.id}});


    await User.update({usertype: "restaurateur"},{where: {id: userid}});
    //Send response 
    res.status(200).send(`Restaurant créé`)
};

//Modify restaurant
const updateRestaurantController = async (req, res) =>{

        //Check if data format is OK
        const { error } = updateRestaurantValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)
    
        //Check who is the user
        const userid = await verifTokenController(req.body.accesstoken)
        if(userid == null) return res.status(400).send("Le propriétaire n'a pas pu être identifié");

        //Checking if the restaurant is already in the database
        const dbrestaurant = await Restaurant.findOne({ where: {userid: userid} });
        if (dbrestaurant == null) return res.status(400).send("Le restaurant n'existe pas");

        console.log(dbrestaurant)

        if (req.body.phone){await Restaurant.update({phone: req.body.phone},{where: {id: dbrestaurant.id}})}
        if (req.body.email){await Restaurant.update({email: req.body.email},{where: {id: dbrestaurant.id}})}
        if (req.body.name){await Restaurant.update({name: req.body.name},{where: {id: dbrestaurant.id}});}
        if (req.body.description){await Restaurant.update({description: req.body.description},{where: {id: dbrestaurant.id}});}
        if (req.body.website){await Restaurant.update({website: req.body.website},{where: {id: dbrestaurant.id}});}
        if (req.body.openingtime){await Restaurant.update({openingtime: req.body.openingtime},{where: {id: dbrestaurant.id}});}
        if (req.body.picturelink){await Restaurant.update({picturelink: req.body.picturelink},{where: {id: dbrestaurant.id}});}
        if (req.body.type){await Restaurant.update({type: req.body.type},{where: {id: dbrestaurant.id}});}

        if (req.body.city){await Address.update({city: req.body.city},{where: {restaurantid: dbrestaurant.id}});}
        if (req.body.country){await Address.update({country: req.body.country},{where: {restaurantid: dbrestaurant.id}});}
        if (req.body.postcode){await Address.update({postcode: req.body.postcode},{where: {restaurantid: dbrestaurant.id}});}
        if (req.body.address){await Address.update({address: req.body.address},{where: {restaurantid: dbrestaurant.id}});}
            
        //Send response 
        res.status(200).send(`Restaurant modifié`)

};

//Delete restaurant
const deleteRestaurantController = async (req, res) =>{

        //Check if data format is OK
        const { error } = deleteRestaurantValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        //Check who is the user
        const userid = await verifTokenController(req.body.accesstoken)
        if(userid == null) return res.status(400).send("Le propriétaire n'a pas pu être identifié");
    
        //Checking if the restaurant is already in the database
        const dbrestaurant = await Restaurant.findOne({ where: {userid: userid} });
        if (dbrestaurant == null) return res.status(400).send("Le restaurant n'existe pas");
    
        await Restaurant.destroy({where: {id: dbrestaurant.id}});
        await Address.destroy({where: {restaurantid: dbrestaurant.id}});

        //Send response 
        res.status(200).send(`Restaurant supprimé`)

};

//Info restaurant
const infoRestaurantController = async (req, res) =>{
    
    //Check if data format is OK
    const { error } = infoRestaurantValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    
    //Check who is the user
    const userid = await verifTokenController(req.body.accesstoken)
    if(userid == null) return res.status(400).send("Le propriétaire n'a pas pu être identifié");

    //Get user info
    const dbrestaurant = await Restaurant.findOne({ where: {userid: userid} });
    if (!dbrestaurant) return res.status(400).send("Aucune informations sur l'utilisateur"); 

    //Checking if the email exists 
    const dbaddress = await Address.findOne({ where: {userid: userid} });

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