var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var digitalSignage = new Schema({
    digitalsign: {
        type: String
    },
    qty: {
        type: Number
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
    collection: 'digitalsignage'
});

module.exports = mongoose.model('digitalSignage', digitalSignage);
