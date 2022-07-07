var express = require('express');
var app = express();
var clientdetailRouter = express.Router();

// Required store route
var ClientDetail = require('../models/ClientDetail');

// Defined store route
clientdetailRouter.route('/add/post').post(function(req, res, next) {
    var clientdetail = new ClientDetail(req.body);
    clientdetail.save()
    .then((clientdetail) => {
        res.json('ClientDetail added successfully');
    })
    .catch((err) => {
        res.status(400).send("unable to save to database");
    });
});

//addingcommentfornoreason
// Defined get data(index or listing) route
clientdetailRouter.route('/').get(function(req, res, next) {
    ClientDetail.find(function(err, clientdetail) {
        if(err) {
            console.log(err);
        }
        else {
            res.json(clientdetail);
        }
    });
})


// Defined edit route
clientdetailRouter.route('/edit/:id').get(function(req, res, next) {
    var id = req.params.id;
    ClientDetail.findById(id, function(err, clientdetail) {
        res.json(clientdetail);
    });
});


// Defined update route
clientdetailRouter.route('/update/:id').post(function(req, res, next) {
    ClientDetail.findById(req.params.id, function(err, clientdetail) {
        if(!clientdetail) {
            return next(new Error('could not load Document'));
        }
        else { // do your update here
            clientdetail.email = req.body.email;
            clientdetail.ClientName = req.body.ClientName;
            clientdetail.LifeWorks = req.body.LifeWorks;
            clientdetail.ContractType = req.body.ContractType;
            clientdetail.AnticipatedRevenue = req.body.AnticipatedRevenue;
            clientdetail.Population = req.body.Population;
            clientdetail.industry_Type = req.body.industry_Type;            
            clientdetail.save().then(clientdetail => {
                res.json('Update complete');
            })
            .catch((err) => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});


// Defined delete|remove|destroy route
clientdetailRouter.route('/delete/:id').get(function(req, res, next) {
    ClientDetail.findByIdAndRemove({_id: req.params.id }, function(err, clientdetail) {
        if(err) {
            res.json(err);
        }
        else {
            res.json('Successfully removed');
        }
    });
});

module.exports = clientdetailRouter;
