var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var costconexp = new Schema({
    pos: {
        type: String
    },
    custconvoption: {
        type: String
    },
    capex: {
        type: Number
    },
    opex: {
        type: Number
    },
    total: {
        type: Number
    },

},{
    collection: 'costconexp'
});

module.exports = mongoose.model('costconexp', costconexp);
