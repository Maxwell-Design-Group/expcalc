var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var supportingFeatures = new Schema({
    Name: {
        type: String
    },
    value: {
        type: Number
    },

},{
    collection: 'supportingfeature'
});

module.exports = mongoose.model('supportingFeatures', supportingFeatures);
