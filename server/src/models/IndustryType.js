var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for IndustryTypes
var IndustryType = new Schema({
    industrytype: {
        type: String
    },

},{
    collection: 'industrytypes'
});

module.exports = mongoose.model('IndustryType', IndustryType);
