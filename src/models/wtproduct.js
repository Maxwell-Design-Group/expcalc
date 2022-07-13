var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var wtProduct = new Schema({
    product: {
        type: String
    },
    Wintheme: {
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
    productDescription: {
        type: String
    },

},{
    collection: 'wtproduct'
});

module.exports = mongoose.model('wtProduct', wtProduct);
