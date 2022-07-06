var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for WinThemes
var WinTheme = new Schema({
    wintheme: {
        type: String
    },

},{
    collection: 'winthemes'
});

module.exports = mongoose.model('WinTheme', WinTheme);
