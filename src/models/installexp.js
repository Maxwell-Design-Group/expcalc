var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var installExp = new Schema({
    vender: {
        type: String
    },
    Experience: {
        type:String
    },
    capex: {
        type: Number
    },
    opex: {
        type: Number
    },
},{
    collection: 'installexp'
});

module.exports = mongoose.model('installExp', installExp);
