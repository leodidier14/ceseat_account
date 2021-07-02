var Sequelize = require('sequelize')
var sequelize = require('../database')

var Deliveryman = sequelize.define("Deliveryman", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userid:{
        type: Sequelize.INTEGER,
        foreignkey: true,
    },
    siret: Sequelize.STRING,
    wallet: Sequelize.DECIMAL,
    sponsorshipLink: Sequelize.STRING
});

module.exports = Deliveryman;