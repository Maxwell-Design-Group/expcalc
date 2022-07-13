var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var industryType = new Schema({
    industrytype: {
        type: String
    },

},{
    collection: 'industrytype'
});

module.exports = mongoose.model('industryType', industryType);
