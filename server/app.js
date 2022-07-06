var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 4200;
var cors = require('cors');


//Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb+srv://dmaxwell:ZiscohFcN6FkC5zb@cluster0.bhz6k.mongodb.net/test/aramarkDB')
    .then(() => {
        console.log('Start');
    })
    .catch((err) => {
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

// Required aplication specific custom router module
var clientdetailRouter = require('./src/routes/clientdetailRouter');

// Required aplication specific custom router module
var contracttypelistRouter = require('./src/routes/contracttypelistRouter');

// Required aplication specific custom router module
var industrytypeRouter = require('./src/routes/industrytypeRouter');

// Required aplication specific custom router module
var winthemedetailRouter = require('./src/routes/winthemedetailRouter');

// Required aplication specific custom router module
//var winthemeRouter = require('./src/routes/winthemeRouter');

// Use middlewares to set view engine and post json data to the server
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/clientdetails', clientdetailRouter);

app.use('/contracttypelists', contracttypelistRouter);

app.use('/industrytypes', industrytypeRouter);

app.use('/winthemedetails', winthemedetailRouter);

//app.use('/wintheme', winthemeRouter);


// Start the server
app.listen(port, function() {
    console.log('Server is running on Port: ', port);
});
