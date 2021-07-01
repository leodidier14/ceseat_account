//Load required elements
const router = require('express').Router()
const express = require('express')

const { registerUserController, updateUserController, deleteUserController, infoUserController, getRole } = require('../controllers/userController')
const { createRestaurantController, updateRestaurantController, deleteRestaurantController, infoRestaurantController } = require('../controllers/restaurantController')
const { createDeliverymanController, updateDeliverymanController, deleteDeliverymanController, infoDeliverymanController } = require('../controllers/deliverymanController')
const { registerDevController, updateDevController, deleteDevController, infoDevController } = require('../controllers/devController')
const { getAllUsers, deleteUserFromApp, changeUserRole } = require('../controllers/userController')

//Use json parser
router.use(express.json());

router.get('/app/user', async function (req, res) {
    getAllUsers(req, res)
});

router.delete('/app/user/:id', async function (req, res) {
    deleteUserFromApp(req, res)
});

router.put('/app/user', async function (req, res) {
    changeUserRole(req, res)
});

router.get('/available', function(req, res) {
    res.send(true)
});

//User routes
//Register user OK
router.post('/user', async function (req, res) {
    registerUserController(req, res)
});
//Modify user OK (regarder pour changer de mail)
router.put('/user/:id', async function (req, res) {
    try { updateUserController(req, res) } catch (error) { console.log(error)}
});
//Delete user OK
router.delete('/user/:id', async function (req, res) {
    try { deleteDeliverymanController(req, res) } catch (error) { }
    try { deleteRestaurantController(req, res) } catch (error) { }
    try { deleteUserController(req, res) } catch (error) { }
});
//Info user OK
router.get('/user/:id', async function (req, res) {
    infoUserController(req, res)
});

router.get('/getrole/:id', async function (req, res) {
    getRole(req, res)
});

//Restaurant routes
//Create restaurant OK
router.post('/restaurant', async function (req, res) {
    createRestaurantController(req, res)
});
//Update restaurant OK
router.put('/restaurant/:id', async function (req, res) {
    updateRestaurantController(req, res)
});
//Delete restaurant OK
router.delete('/restaurant/:id', async function (req, res) {
    deleteRestaurantController(req, res)
});
//Infos restaurant OK
router.get('/restaurant/:id', async function (req, res) {
    infoRestaurantController(req, res)
});

//Deliveryman routes
//Create deliveryman OK
router.post('/deliveryman', async function (req, res) {
    createDeliverymanController(req, res)
});
//Update deliveryman OK (pas d'update)
router.put('/deliveryman/:id', async function (req, res) {
    updateDeliverymanController(req, res)
});
//Delete deliveryman
router.delete('/deliveryman/:id', async function (req, res) {
    deleteDeliverymanController(req, res)
});
//Infos deliveryman OK
router.get('/deliveryman/:id', async function (req, res) {
    infoDeliverymanController(req, res)
});

//Dev routes
//Create dev OK
router.post('/dev', async function (req, res) {
    registerDevController(req, res)
});
//Update dev OK (pas d'update)
router.put('/dev/:id', async function (req, res) {
    try { updateDevController(req, res) } catch (error) { console.log(error)}
});
//Delete dev
router.delete('/dev/:id', async function (req, res) {
    deleteDevController(req, res)
});
//Infos dev OK
router.get('/dev/:id', async function (req, res) {
    infoDevController(req, res)
});

module.exports = router;