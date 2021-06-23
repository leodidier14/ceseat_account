var Sequelize = require('sequelize')
var sequelize = require('../database')

var Address = sequelize.define("address", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // userid:{
    //     type: Sequelize.INTEGER,
    //     foreignkey: true,
    // },
    // restaurantid:{
    //     type: Sequelize.INTEGER,
    //     foreignkey: true,
    // },
    country: Sequelize.STRING,
    city: Sequelize.STRING,
    address: Sequelize.STRING,
    postcode: Sequelize.INTEGER
    
});

module.exports = Address;