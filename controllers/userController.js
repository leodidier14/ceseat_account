//Load required elements
const bcrypt = require('bcryptjs')

//Load table models
const User = require('../models/user')
const Address = require('../models/address')

//Load validation models
const {registerUserValidation, updateUserValidation, deleteUserValidation, infoUserValidation} = require('../validations/userValidation')

//Load token controller
const {verifTokenController} = require('../controllers/tokenController')

//Register user
const registerUserController = async (req, res) =>{ 

    //Check if data format is OK
    const { error } = registerUserValidation(req.body);
    if (error) return res.status(200).send(error.details[0].message)
   
    //Checking if the user is already in the database
    const reponse = await User.findOne({ where: {email: req.body.email} });
    if (reponse != null) return res.status(200).send('L\'email est déjà utilisé !');

    if (req.body.password != req.body.checkpassword ) return res.status(200).send("Les mots de passes ne sont pas identiques");
    
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    var sponsorship = null
    if(req.param("sponsorship")){sponsorship = req.param("sponsorship")}

    //Create a new user
    const user = User.build({ 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
        usertype: "customer",
        sponsorship: sponsorship
    })

    await user.save();

    //Send response 
    res.status(200).send(`Enregistré`)
};

//Modify user
const updateUserController = async (req, res) => {
    
    //Check if data format is OK
    const { error } = updateUserValidation(req.body);
    if (error) return res.status(200).send(error.details[0].message)

    //Check who is the user
    const userid = await verifTokenController(req.body.accesstoken)
    if(userid == null) return res.status(200).send("Vous n'avez pas la permission d'effectuer ceci !");
     
    //if you have newpassword or newcheckpassword, you have to be sur that you have the other one
    if(req.body.newpassword){
        if(!req.body.checkpassword){
            return res.status(200).send("Vous devez envoyer un mot de passe et le mot de passe vérifié");
        }
    }
    if(req.body.checkpassword){
        if(!req.body.newpassword){
            return res.status(200).send("Vous devez envoyer un mot de passe et le mot de passe vérifié");
        }
    }

    //if you have both, you can compare it 
    if (req.body.newpassword && req.body.checkpassword){
        if (req.body.newpassword != req.body.checkpassword ) return res.status(200).send("Les mots de passes ne sont pas identiques");
    }
    
    //Update user infos
    if (req.body.firstname){await User.update({firstname: req.body.firstname},{where: {id: userid}});}
    if (req.body.lastname){await User.update({lastname: req.body.lastname},{where: {id: userid}});}
    if (req.body.phone){await User.update({phone: req.body.phone},{where: {id: userid}});}
    if(req.body.newpassword){
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newpassword, salt)
        await User.update({password: hashedPassword},{where: {id: userid}});
    }
    if (req.body.usertype){
        if(req.body.usertype != 'customer' && req.body.usertype != 'deliveryman' && req.body.usertype != 'restaurant')
        {
            return res.status(200).send("Type d'utilisateur non existant");
        }
        else
        {
            await User.update({usertype: req.body.usertype},{where: {id: userid}});
        }
    }
    var dbuser = await User.findOne({ where: {id: userid}});

    var dbaddress = ""
    if (dbuser.addressid == null) {
            dbaddress = await Address.findOne({ where: {country: null, city: null, address: null, postcode : null}});
            //Address
            if(dbaddress == null){
                const address = Address.build({ 
                    country: null,
                    city: null,
                    address: null,
                    postcode: null,
            })
            await address.save();
    };

    dbaddress = await Address.findOne({ where: {country: null, city: null, address: null, postcode : null}});
    } else {
        dbaddress = await Address.findOne({ where: {id: dbuser.addressid}});
    }

    if (req.body.city){await Address.update({city: req.body.city},{where: {id: dbaddress.id}});}
    if (req.body.country){await Address.update({country: req.body.country},{where: {id: dbaddress.id}});}
    if (req.body.postcode){await Address.update({postcode: req.body.postcode},{where: {id: dbaddress.id}});}
    if (req.body.address){await Address.update({address: req.body.address},{where: {id: dbaddress.id}});}

    await User.update({addressid: dbaddress.id},{where: {id: userid}})

    // Warning let email update at the last update position
    if (req.body.email){await User.update({email: req.body.email},{where: {id: userid}});}
    
    res.status(200).send('Modifié')
};

//Delete user 
const deleteUserController = async (req, res) => { 

    const userid = req.params.id

    var dbuser = await User.findOne({ where: {id: userid}});
 
    const deleteUser = await User.destroy({where: {id: userid}});
    const deleteAddress = await Address.destroy({where: {id: dbuser.addressid}});

    res.status(200).send('Supprimé')
};

//Info user
const infoUserController = async (req, res) => { 
    
    const userid = req.params.id

    //Get user info
    const dbuser = await User.findOne({ where: {id: userid} });
    if (!dbuser) return res.status(200).send("Aucune informations sur l'utilisateur"); 

    //Checking if the email exists 
    const dbaddress = await Address.findOne({ where: {id: dbuser.addressid} });

    var resMessage = ""

    if (!dbaddress) {
        //Create res message with user private infos
        resMessage =  
        `
        {
            "firstname": "${dbuser.dataValues.firstname}",
            "lastname": "${dbuser.dataValues.lastname}",
            "email": "${dbuser.dataValues.email}",
            "phone": "${dbuser.dataValues.phone}"
        }
        `
    }
    else {
        //Create res message with user private infos
        resMessage =  
        `
        {
            "firstname": "${dbuser.dataValues.firstname}",
            "lastname": "${dbuser.dataValues.lastname}",
            "email": "${dbuser.dataValues.email}",
            "phone": "${dbuser.dataValues.phone}",
            "address": "${dbaddress.dataValues.address}",
            "postalcode": "${dbaddress.dataValues.postcode}",
            "city": "${dbaddress.dataValues.city}",
            "country": "${dbaddress.dataValues.country}"
        }
        `
    }
    
    res.status(200).send(resMessage)
};

module.exports.registerUserController = registerUserController;
module.exports.updateUserController = updateUserController;
module.exports.deleteUserController = deleteUserController;
module.exports.infoUserController = infoUserController;