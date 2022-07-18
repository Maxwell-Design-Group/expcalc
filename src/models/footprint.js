var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var footPrint = new Schema({
    footprint: {
        type: String
    },
    result: {
        type: String
    },
    

},{
    collection: 'footprint'
});

module.exports = mongoose.model('footPrint', footPrint);
