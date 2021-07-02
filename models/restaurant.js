var Sequelize = require('sequelize')
var sequelize = require('../database')

var Restaurant = sequelize.define("Restaurant", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    addressid:{
        type: Sequelize.INTEGER,
        foreignkey: true,
    },
    userid:{
        type: Sequelize.INTEGER,
        foreignkey: true,
    },
    siret: Sequelize.STRING,
    email: Sequelize.STRING,
    name: Sequelize.STRING,
    phoneNumber: Sequelize.STRING,
    description: Sequelize.TEXT,
    website: Sequelize.TEXT,
    openingTime: Sequelize.STRING,
    closingTime: Sequelize.STRING,
    pictureLink: Sequelize.TEXT,
    type: Sequelize.STRING,
    sponsorshipLink : Sequelize.STRING
});

module.exports = Restaurant;