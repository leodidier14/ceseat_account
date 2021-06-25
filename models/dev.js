var Sequelize = require('sequelize')
var sequelize = require('../database')

var Dev = sequelize.define("Dev", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userid:{
        type: Sequelize.INTEGER,
        foreignkey: true,
    },
    siret: Sequelize.STRING
});

module.exports = Dev;