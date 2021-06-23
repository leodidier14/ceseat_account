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
const {createDeliverymanValidation, updateDeliverymanValidation, deleteDeliverymanValidation, infoDeliverymanValidation} = require('../validations/deliverymanValidation')

//Load token controller
const {verifTokenController} = require('../controllers/tokenController')

//Create deliveryman
const createDeliverymanController = async (req, res) =>{

    //Check if data format is OK
    const { error } = createDeliverymanValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    //Check who is the user
    const userid = await verifTokenController(req.body.accesstoken)
    if(userid == null) return res.status(400).send("Le propriétaire n'a pas pu être identifié");

    const dbuser = await User.findOne({ where: {id: userid} });

    if(dbuser.usertype == "restaurateur") return res.status(400).send("Vous êtes déjà restaurateur !");

    //Create a new restaurant
    var dbdeliveryman = await Deliveryman.findOne({ where: {userid: userid}});
    if(dbdeliveryman != null) return res.status(400).send("L'utilisateur est déjà livreur");
    if(dbdeliveryman == null){
        const deliveryman = Deliveryman.build({
            userid: userid,
            siret: req.body.siret,
            wallet: 0,
            sponsorship: "a générer automatiquement"
        })
        await deliveryman.save();
    }
    
    await User.update({usertype: "deliveryman"},{where: {id: userid}});

    //Send response 
    res.status(200).send(`Vous êtes maintenant livreur`)
};

//Modify deliveryman
const updateDeliverymanController = async (req, res) =>{
    res.status(200).send(`Rien ne peut être modifié pour un livreur`)
};

//Delete deliveryman
const deleteDeliverymanController = async (req, res) =>{
    
        //Check if data format is OK
        const { error } = deleteDeliverymanValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        //Check who is the user
        const userid = await verifTokenController(req.body.accesstoken)
        if(userid == null) return res.status(400).send("Le propriétaire n'a pas pu être identifié");
    
        //Checking if the restaurant is already in the database
        const dbdeliveryman = await Deliveryman.findOne({ where: {userid: userid} });
        if (dbdeliveryman == null) return res.status(400).send("Vous n'êtes pas livreur");
    
        await Deliveryman.destroy({where: {userid: userid}});
        await User.update({usertype: "customer"},{where: {id: userid}});
        //Send response 
        res.status(200).send(`Vous n'êtes plus livreur :(`)
};

//Info deliveryman
const infoDeliverymanController = async (req, res) =>{
    
    //Check if data format is OK
    const { error } = infoDeliverymanValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    
    //Check who is the user
    const userid = await verifTokenController(req.body.accesstoken)
    if(userid == null) return res.status(400).send("Le propriétaire n'a pas pu être identifié");

    //Get user info
    const dbdeliveryman = await Deliveryman.findOne({ where: {userid: userid} });
    if (!dbdeliveryman) return res.status(400).send("Aucune informations sur l'utilisateur"); 

    //Create res message with user private infos
    var resMessage =
        `
        {
            "siret": "${dbdeliveryman.dataValues.siret}",
            "wallet": "${dbdeliveryman.dataValues.wallet}",
            "sponsorship": "${dbdeliveryman.dataValues.sponsorship}"
        }
        `
    
    res.status(200).send(resMessage)
};

module.exports.createDeliverymanController = createDeliverymanController;
module.exports.updateDeliverymanController = updateDeliverymanController;
module.exports.deleteDeliverymanController = deleteDeliverymanController;
module.exports.infoDeliverymanController = infoDeliverymanController;