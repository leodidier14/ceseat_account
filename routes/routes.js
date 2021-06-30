//Load required elements
const router = require('express').Router()
const express = require('express')

const { registerUserController, updateUserController, deleteUserController, infoUserController, getRole } = require('../controllers/userController')
const { createRestaurantController, updateRestaurantController, deleteRestaurantController, infoRestaurantController } = require('../controllers/restaurantController')
const { createDeliverymanController, updateDeliverymanController, deleteDeliverymanController, infoDeliverymanController } = require('../controllers/deliverymanController')
const { registerDevController, updateDevController, deleteDevController, infoDevController } = require('../controllers/devController')

//Use json parser
router.use(express.json());

//Load tokenapp controller
const { verifTokenAppController } = require('../controllers/tokenAppController')

router.get('/available', function(req, res) {
    console.log('ask for availableity')
    res.send(true)
  });

//User routes
//Register user OK
router.post('/user', async function (req, res) {
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    registerUserController(req, res)
});
//Modify user OK (regarder pour changer de mail)
router.put('/user/:id', async function (req, res) {
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")
    try { updateUserController(req, res) } catch (error) { console.log(error)}
});
//Delete user OK
router.delete('/user/:id', async function (req, res) {
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    try { deleteDeliverymanController(req, res) } catch (error) { }
    try { deleteRestaurantController(req, res) } catch (error) { }
    try { deleteUserController(req, res) } catch (error) { }
});
//Info user OK
router.get('/user/:id', async function (req, res) {
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    infoUserController(req, res)
});

router.get('/getrole/:id', async function (req, res) {
    console.log('/getrole/:id get')
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    getRole(req, res)
});

//Restaurant routes
//Create restaurant OK
router.post('/restaurant', async function (req, res) {
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    createRestaurantController(req, res)
});
//Update restaurant OK
router.put('/restaurant/:id', async function (req, res) {
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    updateRestaurantController(req, res)
});
//Delete restaurant OK
router.delete('/restaurant/:id', async function (req, res) {
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    deleteRestaurantController(req, res)
});
//Infos restaurant OK
router.get('/restaurant/:id', async function (req, res) {
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    infoRestaurantController(req, res)
});


//Deliveryman routes
//Create deliveryman OK
router.post('/deliveryman', async function (req, res) {
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    createDeliverymanController(req, res)
});
//Update deliveryman OK (pas d'update)
router.put('/deliveryman/:id', async function (req, res) {
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    updateDeliverymanController(req, res)
});
//Delete deliveryman
router.delete('/deliveryman/:id', async function (req, res) {
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    deleteDeliverymanController(req, res)
});
//Infos deliveryman OK
router.get('/deliveryman/:id', async function (req, res) {
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    infoDeliverymanController(req, res)
});

//Dev routes
//Create dev OK
router.post('/dev', async function (req, res) {
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    registerDevController(req, res)
});
//Update dev OK (pas d'update)
router.put('/dev/:id', async function (req, res) {
    console.log('/dev/:id put')
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    console.log(checkTokenApp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")
    try { updateDevController(req, res) } catch (error) { console.log(error)}
});
//Delete dev
router.delete('/dev/:id', async function (req, res) {
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    deleteDevController(req, res)
});
//Infos dev OK
router.get('/dev/:id', async function (req, res) {
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    infoDevController(req, res)
});


module.exports = router;