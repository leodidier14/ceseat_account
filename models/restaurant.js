var Sequelize = require('sequelize')
var sequelize = require('../database')

var Restaurant = sequelize.define("restaurant", {
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
    phone: Sequelize.STRING,
    description: Sequelize.TEXT,
    website: Sequelize.TEXT,
    openingtime: Sequelize.TEXT,
    picturelink: Sequelize.TEXT,
    type: Sequelize.STRING
});

module.exports = Restaurant;