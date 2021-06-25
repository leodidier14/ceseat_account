//Load required elements
const router = require('express').Router()
const express = require('express')

const {registerUserController, updateUserController, deleteUserController, infoUserController} = require('../controllers/userController')
const {createRestaurantController, updateRestaurantController, deleteRestaurantController, infoRestaurantController} = require('../controllers/restaurantController')
const {createDeliverymanController, updateDeliverymanController, deleteDeliverymanController, infoDeliverymanController} = require('../controllers/deliverymanController')
const {createDevController, updateDevController, deleteDevController, infoDevController} = require('../controllers/devController')

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
router.delete('/user/:id', function(req, res){ 
    try {deleteDeliverymanController(req, res)} catch (error) {}
    try {deleteRestaurantController(req, res)} catch (error) {}
    try {deleteUserController(req, res)} catch (error) {}
});
//Info user OK
router.get('/user/:id', function(req, res){ 
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
router.delete('/restaurant/:id', function(req, res){
    deleteRestaurantController(req, res)
});
//Infos restaurant OK
router.get('/restaurant/:id', function(req, res){
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
router.delete('/deliveryman/:id', function(req, res){
    deleteDeliverymanController(req, res)
});
//Infos deliveryman OK
router.get('/deliveryman/:id', function(req, res){
    infoDeliverymanController(req, res)
});

//Dev routes
//Create dev OK
router.post('/dev', function(req, res){
    createDevController(req, res)    
});
//Update dev OK (pas d'update)
router.put('/dev', function(req, res){
    updateDevController(req, res)
});
//Delete dev
router.delete('/dev/:id', function(req, res){
    deleteDevController(req, res)
});
//Infos dev OK
router.get('/dev/:id', function(req, res){
    infoDevController(req, res)
});


module.exports = router;