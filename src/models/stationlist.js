var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var stationList = new Schema({
    station: {
        type: String
    },
    type: {
        type: String
    },
    vender: {
        type: String
    },
    capex: {
        type: Number
    },
    opex: {
        type: Number
    },

},{
    collection: 'stationlist'
});

module.exports = mongoose.model('stationList', stationList);
