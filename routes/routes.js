//Load required elements
const router = require('express').Router()
const path = require('path')
const express = require('express')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const {registerUserController, updateUserController, deleteUserController, infoUserController} = require('../controllers/userController')
const {createRestaurantController, updateRestaurantController, deleteRestaurantController, infoRestaurantController} = require('../controllers/restaurantController')
const {createDeliverymanController, updateDeliverymanController, deleteDeliverymanController, infoDeliverymanController} = require('../controllers/deliverymanController')

//Use json parser
router.use(express.json());


//User routes
//Register user OK
router.post('/user',function(req, res){ 
    registerUserController(req, res)
});
//Modify user OK (regarder pour changer de mail)
router.put('/user', function(req, res){
    updateUserController(req, res)
});
//Delete user OK
router.delete('/user', function(req, res){ 
    deleteUserController(req, res)
});
//Info user OK
router.get('/user', function(req, res){ 
    infoUserController(req, res)
});


//Restaurant routes
//Create restaurant OK
router.post('/restaurant', function(req, res){
    createRestaurantController(req, res)    
});
//Update restaurant OK
router.put('/restaurant', function(req, res){
    updateRestaurantController(req, res)
});
//Delete restaurant OK
router.delete('/restaurant', function(req, res){
    deleteRestaurantController(req, res)
});
//Infos restaurant OK
router.get('/restaurant', function(req, res){
    infoRestaurantController(req, res)
});


//Deliveryman routes
//Create deliveryman OK
router.post('/deliveryman', function(req, res){
    createDeliverymanController(req, res)    
});
//Update deliveryman OK (pas d'update)
router.put('/deliveryman', function(req, res){
    updateDeliverymanController(req, res)
});
//Delete deliveryman
router.delete('/deliveryman', function(req, res){
    deleteDeliverymanController(req, res)
});
//Infos deliveryman OK
router.get('/deliveryman', function(req, res){
    infoDeliverymanController(req, res)
});



module.exports = router;