var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var networkexp = new Schema({
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
    collection: 'networkexp'
});

module.exports = mongoose.model('networkexp', networkexp);
