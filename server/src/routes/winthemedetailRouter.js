var express = require('express');
var app = express();
var winthemedetailRouter = express.Router();

// Required store route
var WinthemeDetail = require('../models/WinthemeDetail');

// Defined store route
winthemedetailRouter.route('/add/post').post(function(req, res, next) {
    var winthemedetail = new WinthemeDetail(req.body);
    winthemedetail.save()
    .then((winthemedetail) => {
        res.json('WinthemeDetail added successfully');
    })
    .catch((err) => {
        res.status(400).send("unable to save to database");
    });
});


// Defined get data(index or listing) route
winthemedetailRouter.route('/').get(function(req, res, next) {
    WinthemeDetail.find(function(err, winthemedetail) {
        if(err) {
            console.log(err);
        }
        else {
            res.json(winthemedetail);
        }
    });
})


// Defined edit route
winthemedetailRouter.route('/edit/:id').get(function(req, res, next) {
    var id = req.params.id;
    WinthemeDetail.findById(id, function(err, winthemedetail) {
        res.json(winthemedetail);
    });
});


// Defined update route
winthemedetailRouter.route('/update/:id').post(function(req, res, next) {
    WinthemeDetail.findById(req.params.id, function(err, winthemedetail) {
        if(!winthemedetail) {
            return next(new Error('could not load Document'));
        }
        else { // do your update here
            winthemedetail.email = req.body.email;
            winthemedetail.winthemedetail = req.body.winthemedetail;
            winthemedetail.save().then(winthemedetail => {
                res.json('Update complete');
            })
            .catch((err) => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});


// Defined delete|remove|destroy route
winthemedetailRouter.route('/delete/:id').get(function(req, res, next) {
    WinthemeDetail.findByIdAndRemove({_id: req.params.id }, function(err, winthemedetail) {
        if(err) {
            res.json(err);
        }
        else {
            res.json('Successfully removed');
        }
    });
});

module.exports = winthemedetailRouter;
