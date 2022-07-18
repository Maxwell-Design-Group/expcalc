var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var posData = new Schema({
    pos: {
        type: String
    },
    footprint: {
        type: String
    },
    range1: {
        type: String
    },
    range2: {
        type: Number
    },
    capex: {
        type: Number
    },
    opex: {
        type: String
    },
    icapex: {
        type: String
    },
    iopex: {
        type: String
    },
    ncapex: {
        type: Number
    },
    nopex: {
        type: Number
    },
    

},{
    collection: 'posdata'
});

module.exports = mongoose.model('posData', posData);
