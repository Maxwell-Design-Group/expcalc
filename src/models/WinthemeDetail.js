var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for WinthemeDetails
var WinthemeDetail = new Schema({
    email: {
        type: String
    },
    winthemedetail: {
        type: String
    },

},{
    collection: 'winthemedetails'
});

module.exports = mongoose.model('WinthemeDetail', WinthemeDetail);
