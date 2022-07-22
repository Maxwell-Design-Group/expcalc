var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var customisableConvenienceOption = new Schema({    
custConvOption: {
        type: String
    },
    capex: {
        type: Number
    },
    opex: {
        type: Number
    },
    Total: {
        type: Number
    },
    pos:{
        type: String 
    },
    pcapex: {
        type: Number
    },
    popex: {
        type: Number
    },

},{
    collection: 'customisableconvenienceoption'
});

module.exports = mongoose.model('customisableConvenienceOption', customisableConvenienceOption);
