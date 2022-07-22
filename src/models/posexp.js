var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var posexp = new Schema({
    vendor: {
        type: String
    },
    experience: {
        type: []
    },
    capex: {
        type: Number
    },
    opex: {
        type: Number
    }

},{
    collection: 'posexp'
});

module.exports = mongoose.model('posexp', posexp);
