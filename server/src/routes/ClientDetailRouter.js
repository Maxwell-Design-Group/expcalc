var express = require('express');
var app = express();
var ClientDetailRouter = express.Router();


// Required store route
var ClientDetail = require('../models/ClientDetail');

// Defined store route
ClientDetailRouter.route('/add/post').post(function(req, res, next) {
    var ClientDetail = new ClientDetail(req.body);
    ClientDetail.save()
    .then((ClientDetail) => {
        res.json('Client Detail added successfully');
    })
    .catch((err) => {
        res.status(400).send("unable to save to database");
    });
});


// Defined get data(index or listing) route
ClientDetailRouter.route('/').get(function(req, res, next) {
    ClientDetail.find(function(err, ClientDetail) {
        if(err) {
            console.log(err);
        }
        else {
            res.json(ClientDetail);
        }
    });
})


// Defined edit route
ClientDetailRouter.route('/edit/:id').get(function(req, res, next) {
    var id = req.params.id;
    ClientDetail.findById(id, function(err, ClientDetail) {
        res.json(ClientDetail);
    });
});


// Defined update route
ClientDetailRouter.route('/update/:id').post(function(req, res, next) {
    ClientDetail.findById(req.params.id, function(err, ClientDetail) {
        if(!ClientDetail) {
            return next(new Error('could not load Document'));
        }
        else { // do your update here
            ClientDetail.ClientDetail.ClientName = req.body.ClientName;
			ClientDetail.ClientDetail.LifeWorks = req.body.LifeWorks;
			ClientDetail.ClientDetail.ContractType = req.body.ContractType;
			ClientDetail.ClientDetail.AnticipatedRevenue = req.body.AnticipatedRevenue;
			ClientDetail.ClientDetail.Population = req.body.Population;
            ClientDetail.save().then(ClientDetail => {
                res.json('Update complete');
            })
            .catch((err) => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});


// Defined delete|remove|destroy route
ClientDetailRouter.route('/delete/:id').get(function(req, res, next) {
    ClientDetail.findByIdAndRemove({_id: req.params.id }, function(err, ClientDetail) {
        if(err) {
            res.json(err);
        }
        else {
            res.json('Successfully removed');
        }
    });
});

module.exports = ClientDetailRouter;
