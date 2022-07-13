var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var cateringDetail = new Schema({
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
    collection: 'cateringdetail'
});

module.exports = mongoose.model('cateringDetail', cateringDetail);
