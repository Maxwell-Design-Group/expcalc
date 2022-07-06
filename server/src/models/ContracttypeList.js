var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for ContracttypeLists
var ContracttypeList = new Schema({
    contracttypelist: {
        type: String
    },

},{
    collection: 'contracttypelists'
});

module.exports = mongoose.model('ContracttypeList', ContracttypeList);
