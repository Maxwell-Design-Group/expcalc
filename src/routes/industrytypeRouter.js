var express = require('express');
var app = express();
var industrytypeRouter = express.Router();

// Required store route
var IndustryType = require('../models/IndustryType');

// Defined store route
industrytypeRouter.route('/add/post').post(function(req, res, next) {
    var industrytype = new IndustryType(req.body);
    industrytype.save()
    .then((industrytype) => {
        res.json('IndustryType added successfully');
    })
    .catch((err) => {
        res.status(400).send("unable to save to database");
    });
});


// Defined get data(index or listing) route
industrytypeRouter.route('/').get(function(req, res, next) {
    IndustryType.find(function(err, industrytype) {
        if(err) {
            console.log(err);
        }
        else {
            res.json(industrytype);
        }
    });
})


// Defined edit route
industrytypeRouter.route('/edit/:id').get(function(req, res, next) {
    var id = req.params.id;
    IndustryType.findById(id, function(err, industrytype) {
        res.json(industrytype);
    });
});


// Defined update route
industrytypeRouter.route('/update/:id').post(function(req, res, next) {
    IndustryType.findById(req.params.id, function(err, industrytype) {
        if(!industrytype) {
            return next(new Error('could not load Document'));
        }
        else { // do your update here
            industrytype.industrytype = req.body.industrytype;
            industrytype.save().then(industrytype => {
                res.json('Update complete');
            })
            .catch((err) => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});


// Defined delete|remove|destroy route
industrytypeRouter.route('/delete/:id').get(function(req, res, next) {
    IndustryType.findByIdAndRemove({_id: req.params.id }, function(err, industrytype) {
        if(err) {
            res.json(err);
        }
        else {
            res.json('Successfully removed');
        }
    });
});

module.exports = industrytypeRouter;
