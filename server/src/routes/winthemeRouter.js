var express = require('express');
var app = express();
var winthemeRouter = express.Router();

// Required store route
var WinTheme = require('../models/WinTheme');

// Defined store route
winthemeRouter.route('/add/post').post(function(req, res, next) {
    var wintheme = new WinTheme(req.body);
    wintheme.save()
    .then((wintheme) => {
        res.json('WinTheme added successfully');
    })
    .catch((err) => {
        res.status(400).send("unable to save to database");
    });
});


// Defined get data(index or listing) route
winthemeRouter.route('/').get(function(req, res, next) {
    WinTheme.find(function(err, wintheme) {
        if(err) {
            console.log(err);
        }
        else {
            res.json(wintheme);
        }
    });
})


// Defined edit route
winthemeRouter.route('/edit/:id').get(function(req, res, next) {
    var id = req.params.id;
    WinTheme.findById(id, function(err, wintheme) {
        res.json(wintheme);
    });
});


// Defined update route
winthemeRouter.route('/update/:id').post(function(req, res, next) {
    WinTheme.findById(req.params.id, function(err, wintheme) {
        if(!wintheme) {
            return next(new Error('could not load Document'));
        }
        else { // do your update here
            wintheme.wintheme = req.body.wintheme;
            wintheme.save().then(wintheme => {
                res.json('Update complete');
            })
            .catch((err) => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});


// Defined delete|remove|destroy route
winthemeRouter.route('/delete/:id').get(function(req, res, next) {
    WinTheme.findByIdAndRemove({_id: req.params.id }, function(err, wintheme) {
        if(err) {
            res.json(err);
        }
        else {
            res.json('Successfully removed');
        }
    });
});

module.exports = winthemeRouter;
