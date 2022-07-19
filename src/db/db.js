const mongoose = require('mongoose');
require('dotenv').config();

console.log("db connection strings ");
console.log(process.env.DB_CONNECTION);
console.log(process.env.DB_CONNECTIONLOCAL);

mongoose.Promise = global.Promise;
// // Connect MongoDB at cloude 
// const url = 'mongodb+srv://dmaxwell:ZiscohFcN6FkC5zb@cluster0.bhz6k.mongodb.net/test';
// // Connect MongoDB at default port 27017.
// const url_local = 'mongodb://localhost:27017';//process.env.DB_CONNECTIONLOCAL

// Connect MongoDB at cloude 
const url = process.env.DB_CONNECTION;
// Connect MongoDB at default port 27017.
const url_local = process.env.DB_CONNECTIONLOCAL
    
mongoose.connect(url, {
    dbName: "aramarkDB",
    useNewUrlParser: true,   
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

