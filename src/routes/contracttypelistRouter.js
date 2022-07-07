var express = require('express');
var app = express();
var contracttypelistRouter = express.Router();

// Required store route
var ContracttypeList = require('../models/ContracttypeList');

// Defined store route
contracttypelistRouter.route('/add/post').post(function(req, res, next) {
    var contracttypelist = new ContracttypeList(req.body);
    contracttypelist.save()
    .then((contracttypelist) => {
        res.json('ContracttypeList added successfully');
    })
    .catch((err) => {
        res.status(400).send("unable to save to database");
    });
});


// Defined get data(index or listing) route
contracttypelistRouter.route('/').get(function(req, res, next) {
    ContracttypeList.find(function(err, contracttypelist) {
        if(err) {
            console.log(err);
        }
        else {
            res.json(contracttypelist);
        }
    });
})


// Defined edit route
contracttypelistRouter.route('/edit/:id').get(function(req, res, next) {
    var id = req.params.id;
    ContracttypeList.findById(id, function(err, contracttypelist) {
        res.json(contracttypelist);
    });
});


// Defined update route
contracttypelistRouter.route('/update/:id').post(function(req, res, next) {
    ContracttypeList.findById(req.params.id, function(err, contracttypelist) {
        if(!contracttypelist) {
            return next(new Error('could not load Document'));
        }
        else { // do your update here
            contracttypelist.contracttypelist = req.body.contracttypelist;
            contracttypelist.save().then(contracttypelist => {
                res.json('Update complete');
            })
            .catch((err) => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});


// Defined delete|remove|destroy route
contracttypelistRouter.route('/delete/:id').get(function(req, res, next) {
    ContracttypeList.findByIdAndRemove({_id: req.params.id }, function(err, contracttypelist) {
        if(err) {
            res.json(err);
        }
        else {
            res.json('Successfully removed');
        }
    });
});

module.exports = contracttypelistRouter;
