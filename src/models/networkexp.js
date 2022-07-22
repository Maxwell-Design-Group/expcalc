var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var networkExp = new Schema({
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
    collection: 'networkexp'
});

module.exports = mongoose.model('networkExp', networkExp);
