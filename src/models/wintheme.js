var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var winTheme = new Schema({
    wintheme: {
        type: String
    },
    capex: {
        type: Number
    },    
    opex: {
        type: Number
    },

},{
    collection: 'wintheme'
});

module.exports = mongoose.model('winTheme', winTheme);
  