var Sequelize = require('sequelize')
var sequelize = require('../database')

var Address = sequelize.define("Address", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    country: Sequelize.STRING,
    city: Sequelize.STRING,
    address: Sequelize.STRING,
    zipCode: Sequelize.INTEGER
    
});

module.exports = Address;