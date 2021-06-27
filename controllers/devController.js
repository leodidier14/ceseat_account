//Load required elements
const bcrypt = require('bcryptjs')

//Load table models
const Dev = require('../models/dev')
const Address = require('../models/address')

//Load validation models
const {registerDevValidation, updateDevValidation} = require('../validations/devValidation')

//Load token controller
const {verifTokenDevController} = require('../controllers/tokenDevController')

//Register dev
const registerDevController = async (req, res) =>{ 

    //Check if data format is OK
    const { error } = registerDevValidation(req.body);
    if (error) return res.status(200).send(error.details[0].message)
   
    //Checking if the dev is already in the database
    const reponse = await Dev.findOne({ where: {email: req.body.email} });
    if (reponse != null) return res.status(200).send('L\'email est déjà utilisé !');

    if (req.body.password != req.body.confirmedPassword ) return res.status(200).send("Les mots de passes ne sont pas identiques");
    
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create a new dev
    const dev = Dev.build({ 
        siret : req.body.siret,
        email: req.body.email,
        password: hashedPassword,
        userType: "dev"
    })

    await dev.save();

    //Send response 
    res.status(200).send(`Enregistré`)
};

//Modify dev
const updateDevController = async (req, res) => {
    
    //Check if data format is OK
    const { error } = updateDevValidation(req.body);
    if (error) return res.status(200).send(error.details[0].message)

    //Check who is the dev
    const accesstoken = req.headers['authorization'];
    const devid = await verifTokenDevController(accesstoken)
    console.log(devid)
    if(devid == null) return res.status(200).send("Vous n'avez pas la permission d'effectuer ceci !");
     
    //if you have password or newconfirmedPassword, you have to be sur that you have the other one
    if(req.body.password){
        if(!req.body.confirmedPassword){
            return res.status(200).send("Vous devez envoyer un mot de passe et le mot de passe vérifié");
        }
    }
    if(req.body.confirmedPassword){
        if(!req.body.password){
            return res.status(200).send("Vous devez envoyer un mot de passe et le mot de passe vérifié");
        }
    }

    //if you have both, you can compare it 
    if (req.body.password && req.body.confirmedPassword){
        if (req.body.password != req.body.confirmedPassword ) return res.status(200).send("Les mots de passes ne sont pas identiques");
    }
    
    //Update dev infos
    if(req.body.password){
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        await Dev.update({password: hashedPassword},{where: {id: devid}});
    }
    if (req.body.devtype){
        if(req.body.devtype != 'customer' && req.body.devtype != 'deliveryman' && req.body.devtype != 'restaurant')
        {
            return res.status(200).send("Type d'utilisateur non existant");
        }
        else
        {
            await Dev.update({devtype: req.body.devtype},{where: {id: devid}});
        }
    }

    // Warning let email update at the last update position
    if (req.body.email){await Dev.update({email: req.body.email},{where: {id: devid}});}
    
    res.status(200).send('Modifié')
};

//Delete dev 
const deleteDevController = async (req, res) => { 

    const devid = req.params.id

    const deleteDev = await Dev.destroy({where: {id: devid}});

    res.status(200).send('Supprimé')
};

//Info dev
const infoDevController = async (req, res) => { 
    
    const devid = req.params.id

    //Get dev info
    const dbdev = await Dev.findOne({ where: {id: devid} });
    if (!dbdev) return res.status(200).send("Aucune informations sur l'utilisateur"); 

    var resMessage =  
        `
        {
            "siret" : "${dbdev.dataValues.siret}",
            "email": "${dbdev.dataValues.email}"
        }
        `
    res.status(200).send(resMessage)
};

module.exports.registerDevController = registerDevController;
module.exports.updateDevController = updateDevController;
module.exports.deleteDevController = deleteDevController;
module.exports.infoDevController = infoDevController;