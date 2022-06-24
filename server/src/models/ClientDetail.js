var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Client detail
var ClientDetail = new Schema({
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
        type: Integer
    },
	Population: {
        type: Integer
    },
	industry_Type: {
        type: String
    },

},{
    collection: 'ClientDetail'
});

module.exports = mongoose.model('ClientDetail', ClientDetail);


