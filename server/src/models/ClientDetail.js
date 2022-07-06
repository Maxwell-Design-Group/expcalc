var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ClientDetails
var ClientDetail = new Schema({
    email: {
        type: String
    },
    ClientName: {
        type: String
    },
	LifeWorks: {
        type: Boolean
    },
	ContractType: {
        type: String
    },	
	AnticipatedRevenue: {
        type: Number
    },
	Population: {
        type: Number
    },
	industry_Type: {
        type: String
    },

},{
    collection: 'clientdetails'
});

module.exports = mongoose.model('ClientDetail', ClientDetail);
