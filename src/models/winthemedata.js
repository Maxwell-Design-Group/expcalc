var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var winThemData = new Schema({
    email: {
        type: String
    },
    wintheme: {
        type: String
    },
	

},{
    collection: 'winthemdata'
});

module.exports = mongoose.model('winThemData', winThemData);


