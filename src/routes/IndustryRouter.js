var express = require('express');
var app = express();
var industryRouter = express.Router();

// Required store route
var industry = require('../models/industry');

// Defined store route
industryRouter.route('/add/post').post(function(req, res, next) {
    var industry = new industry(req.body);
    industry.save()
    .then((industry) => {
        res.json('industry added successfully');
    })
    .catch((err) => {
        res.status(400).send("unable to save to database");
    });
});


// Defined get data(index or listing) route
industryRouter.route('/').get(function(req, res, next) {
    industry.find(function(err, industry) {
        if(err) {
            console.log(err);
        }
        else {
            res.json(industry);
        }
    });
})


// Defined edit route
industryRouter.route('/edit/:id').get(function(req, res, next) {
    var id = req.params.id;
    industry.findById(id, function(err, industry) {
        res.json(industry);
    });
});


// Defined update route
industryRouter.route('/update/:id').post(function(req, res, next) {
    industry.findById(req.params.id, function(err, industry) {
        if(!industry) {
            return next(new Error('could not load Document'));
        }
        else { // do your update here
            industry.industry = req.body.Industrytype;
            industry.save().then(industry => {
                res.json('Update complete');
            })
            .catch((err) => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});


// Defined delete|remove|destroy route
industryRouter.route('/delete/:id').get(function(req, res, next) {
    industry.findByIdAndRemove({_id: req.params.id }, function(err, industry) {
        if(err) {
            res.json(err);
        }
        else {
            res.json('Successfully removed');
        }
    });
});

module.exports = industryRouter;
