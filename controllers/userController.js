//Load required elements
const bcrypt = require('bcryptjs')

//Load table models
const User = require('../models/user')
const Restaurant = require('../models/restaurant')
const Deliveryman = require('../models/deliveryman')

const Address = require('../models/address')

//Load validation models
const { registerUserValidation, updateUserValidation } = require('../validations/userValidation')

//Load token controller
const { verifTokenController } = require('../controllers/tokenController')

//Register user
const registerUserController = async (req, res) => {
    try {
        //Check if data format is OK
        const { error } = registerUserValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        //Checking if the user is already in the database
        const reponse = await User.findOne({ where: { email: req.body.email } });
        if (reponse != null) return res.status(400).send('L\'email est déjà utilisé !');

        if (req.body.password != req.body.confirmedPassword) return res.status(400).send("Les mots de passes ne sont pas identiques");

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        var sponsorshipLink = null
        if (req.param("sponsorshipLink")) { sponsorshipLink = req.param("sponsorshipLink") }

        //Create a new user
        const user = User.build({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: hashedPassword,
            userType: "customer",
            sponsorshipLink: sponsorshipLink
        })

        await user.save();
        //Send response 
        res.status(200).send(`Enregistré`)
    } catch (error) {
        res.status(400).send(error);
    }

};

//Modify user
const updateUserController = async (req, res) => {
    try {
        //Check if data format is OK
        const { error } = updateUserValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        //Check who is the user
        const accesstoken = req.headers['authorization'];
        var userid = await verifTokenController(accesstoken)
        if (userid == null) { userid = req.params.id }
        if (userid == null) return res.status(400).send("Vous n'avez pas la permission d'effectuer ceci !");

        //if you have password or newconfirmedPassword, you have to be sur that you have the other one
        if (req.body.newPassword) {
            if (!req.body.confirmedPassword) {
                return res.status(400).send("Vous devez envoyer un mot de passe et le mot de passe vérifié");
            }
        }
        if (req.body.confirmedPassword) {
            if (!req.body.newPassword) {
                return res.status(400).send("Vous devez envoyer un mot de passe et le mot de passe vérifié");
            }
        }

        //if you have both, you can compare it 
        if (req.body.newPassword && req.body.confirmedPassword) {
            if (req.body.newPassword != req.body.confirmedPassword) return res.status(400).send("Les mots de passes ne sont pas identiques");
        }

        //Update user infos
        if (req.body.firstName) { await User.update({ firstName: req.body.firstName }, { where: { id: userid } }); }
        if (req.body.lastName) { await User.update({ lastName: req.body.lastName }, { where: { id: userid } }); }
        if (req.body.phoneNumber) { await User.update({ phoneNumber: req.body.phoneNumber }, { where: { id: userid } }); }
        if (req.body.newPassword) {
            //Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.newPassword, salt)
            await User.update({ password: hashedPassword }, { where: { id: userid } });
        }
        if (req.body.usertype) {
            if (req.body.usertype != 'customer' && req.body.usertype != 'deliveryman' && req.body.usertype != 'restaurant') {
                return res.status(400).send("Type d'utilisateur non existant");
            }
            else {
                await User.update({ usertype: req.body.usertype }, { where: { id: userid } });
            }
        }
        var dbuser = await User.findOne({ where: { id: userid } });

        var dbaddress = ""
        if (dbuser.addressid == null) {
            dbaddress = await Address.findOne({ where: { country: null, city: null, address: null, zipCode: null } });
            //Address
            if (dbaddress == null) {
                const address = Address.build({
                    country: null,
                    city: null,
                    address: null,
                    zipCode: null,
                })
                await address.save();
            };

            dbaddress = await Address.findOne({ where: { country: null, city: null, address: null, zipCode: null } });
        } else {
            dbaddress = await Address.findOne({ where: { id: dbuser.addressid } });
        }

        if (req.body.city) { await Address.update({ city: req.body.city }, { where: { id: dbaddress.id } }); }
        if (req.body.country) { await Address.update({ country: req.body.country }, { where: { id: dbaddress.id } }); }
        if (req.body.zipCode) { await Address.update({ zipCode: req.body.zipCode }, { where: { id: dbaddress.id } }); }
        if (req.body.address) { await Address.update({ address: req.body.address }, { where: { id: dbaddress.id } }); }

        await User.update({ addressid: dbaddress.id }, { where: { id: userid } })

        // Warning let email update at the last update position
        if (req.body.email) { await User.update({ email: req.body.email }, { where: { id: userid } }); }

        res.status(200).send('Modifié')
    } catch (error) {
        res.status(400).send(error);
    }

};

//Delete user 
const deleteUserController = async (req, res) => {
    try {
        const userid = req.params.id

        var dbuser = await User.findOne({ where: { id: userid } });

        const deleteUser = await User.destroy({ where: { id: userid } });
        const deleteAddress = await Address.destroy({ where: { id: dbuser.addressid } });

        res.status(200).send('Supprimé')
    } catch (error) {
        res.status(400).send(error);
    }

};

//Info user
const infoUserController = async (req, res) => {
    try {
        //Check who is the user
        const accesstoken = req.headers['authorization'];
        var userid = await verifTokenController(accesstoken)
        if (userid == null) { userid = req.params.id }

        //Get user info
        const dbuser = await User.findOne({ where: { id: userid } });
        if (!dbuser) return res.status(400).send("Aucune informations sur l'utilisateur");

        //Checking if the email exists 
        const dbaddress = await Address.findOne({ where: { id: dbuser.addressid } });

        var resMessage = ""

        if (!dbaddress) {
            //Create res message with user private infos
            resMessage =
                `
        {
            "id" : "${dbuser.dataValues.id}",
            "firstName": "${dbuser.dataValues.firstName}",
            "lastName": "${dbuser.dataValues.lastName}",
            "email": "${dbuser.dataValues.email}",
            "phoneNumber": "${dbuser.dataValues.phoneNumber}",
            "address": null,
            "zipCode": null,
            "city": null,
            "country": null,
            "sponsorshipLink": "SPLCST21${dbuser.dataValues.id}"
        }
        `
        }
        else {
            //Create res message with user private infos
            resMessage =
                `
        {
            "id" : "${dbuser.dataValues.id}",
            "firstName": "${dbuser.dataValues.firstName}",
            "lastName": "${dbuser.dataValues.lastName}",
            "email": "${dbuser.dataValues.email}",
            "phoneNumber": "${dbuser.dataValues.phoneNumber}",
            "address": "${dbaddress.dataValues.address}",
            "zipCode": "${dbaddress.dataValues.zipCode}",
            "city": "${dbaddress.dataValues.city}",
            "country": "${dbaddress.dataValues.country}",
            "sponsorshipLink": "SPLCST21${dbuser.dataValues.id}"
        }
        `
        }

        res.status(200).send(resMessage)
    } catch (error) {
        res.status(400).send(error);
    }

};

const getRole = async (req, res) => {
    try {

        //Check who is the user
        const accesstoken = req.headers['authorization'];
        const userid = await verifTokenController(accesstoken)

        const restaurant = await Restaurant.findOne({ where: { userid: userid } });

        const deliveryman = await Deliveryman.findOne({ where: { userid: userid } });


        /*  const dev = await dev.findOne({ where: { id: userid } });*/
        const dbtype = await User.findOne({ where: { id: userid } });
        if (restaurant) {
            res.status(200).send({ 'type': "restaurant", "id": restaurant.dataValues.id })
        } else if (deliveryman) {
            res.status(200).send({ 'type': "deliveryman", "id": restaurant.dataValues.id })
        } else if (dbtype.dataValues.userType == 'businessman') {
            res.status(200).send({ 'type': "businessman", "id": 0 })
        } else if (dbtype.dataValues.userType == 'technician') {
            res.status(200).send({ 'type': "technician", "id": 0 })
        } else {
            res.status(200).send('client')
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const dbusers = await User.find();
        res.status(200).send(dbusers);
    } catch (error) {
        res.status(400).send("users cannot be find");
    }

}
module.exports.getAllUsers = getAllUsers;

const deleteUserFromApp = async (req, res) => {
    const userid = req.params.id
    try {
        const user = await User.find({ id: userid });
        res.status(200).send("user deleted");
    } catch (error) {
        res.status(400).send("user cannot be deleted");
    }
}
module.exports.deleteUserFromApp = deleteUserFromApp;


const changeUserRole = async (req, res) => {
    const userid = req.body.id
    try {
        await User.update({ userType: req.body.userType }, { where: { id: userid } });
        res.status(200).send("role changed");
    } catch (error) {
        res.status(400).send("role cannot be changed");
    }

}
module.exports.changeUserRole = changeUserRole;

module.exports.registerUserController = registerUserController;
module.exports.updateUserController = updateUserController;
module.exports.deleteUserController = deleteUserController;
module.exports.infoUserController = infoUserController;
module.exports.getRole = getRole;
