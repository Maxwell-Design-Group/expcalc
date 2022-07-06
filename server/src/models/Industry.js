var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Industry type
var Industry = new Schema({
    IndustryType: {
        type: String
    },
	

},{
    collection: 'Industry'
});

module.exports = mongoose.model('Industry', Industry);

