var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var clientDetails = new Schema({
    email: {
        type: String
    },
    clientname: {
        type: String        
    },
	lifeworks: {
        type: Boolean
    },
	contracttype: {
        type: String
    },	
	anticipatedrevenue: {
        type: Number
    },
	population: {
        type: Number
    },
	industrytype: {
        type: String 
    },
    wintheme: {
        type: String // Pass Comma seperated string 
    },    
    customisableconvenience: {
        type: Boolean
    }, 
	digitalsignage: {
        type: String
    },
	mobile: {
        type: Boolean
    },	
	kiosk: {
        type: Boolean
    },
	selfcheckout: {
        type: Boolean
    },
	cashier: {
        type: Boolean
    },
    station: {
        type: String // Pass Comma seperated string 
    },	
	digitalsignage50: {
        type: Number  
    },
    digitalsignage55: {
        type: Number  
    },
    digitalsignage65: {
        type: Number  
    },
    catering: {
        type: String
    },
    pos: {
        type: String // Pass Comma seperated string 
    },
    suportingfeature:{
        type: String // Pass Comma seperated string 
    },
    wtproduct: {
        type: String // Pass Comma seperated string 
    },
    ccopt: {
        type: String // Pass Comma seperated string 
    },

},{
    collection: 'clientdetails'
});

module.exports = mongoose.model('clientDetails', clientDetails);


