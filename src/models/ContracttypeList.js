var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var ContractTypeList = new Schema({
    contracttypelist: {
        type: String
    },

},{
    collection: 'contracttypelist'
});

module.exports = mongoose.model('ContractTypeList', ContractTypeList);


