const mongoose = require('mongoose');
const { Schema } = mongoose;

const apiinfo = new Schema({
    name : String,
    port: String,
    version : String
});

module.exports = mongoose.model('apiinf', apiinfo)