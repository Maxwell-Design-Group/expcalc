var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var posExp = new Schema({
    vender: {
        type: String
    },
    experience: {
        type:String
    },
    capex: {
        type: Number
    },
    opex: {
        type: Number
    },
},{
    collection: 'posexp'
});

module.exports = mongoose.model('posExp', posExp);
