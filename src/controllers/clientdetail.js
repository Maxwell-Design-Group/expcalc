const clientDetails = require('../models/clientdetails.js');
const url = require('url');


// Create and Save a new Category
exports.create = (req, res) => {
    if ((req.body).length == 0) {
        return res.status(400).send({
            message: "Fields can not be empty"
        });
    }

    
    

    // Create a Category
    
    const clientdetails = new clientDetails({

        email: req.body.email,
        clientname: req.body.clientname,
        lifeworks: req.body.lifeworks,
        contracttype: req.body.contracttype,
        anticipatedrevenue: req.body.anticipatedrevenue,
        population: req.body.population,
        industrytype: req.body.industrytype,
        wintheme: req.body.wintheme,
        customisableconvenience: req.body.customisableconvenience,
        digitalsignage: req.body.digitalsignage,
        mobile: req.body.mobile,
        kiosk: req.body.kiosk,
        selfcheckout: req.body.selfcheckout,
        cashier: req.body.cashier,
        station: req.body.station,
        digitalsignage50: req.body.digitalsignage50,
        digitalsignage55: req.body.digitalsignage55,
        digitalsignage65: req.body.digitalsignage65,
        catering: req.body.catering,
        pos: req.body.pos,
        suportingfeature: req.body.suportingfeature,
        wtproduct: req.body.wtproduct
    });

    
   // Save Category in the database
    clientdetails.save()
        .then(data => {
            console.log(data);
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong."
            });
        });
    
};


// Update a category identified by the id in the request
exports.update = (req, res) => {
    if ((req.body).length == 0) {
        return res.status(400).send({
            message: "Fields can not be empty"
        });
    }

    clientDetails.findById(req.params.id, function(err, clientdetail) {
    if(!clientdetail) {
        return res.send('could not load Document');
    }
    else { // do your update here
        clientdetail.email= req.body.email,
        clientdetail.clientname= req.body.clientname,
        clientdetail.lifeworks= req.body.lifeworks,
        clientdetail.contracttype= req.body.contracttype,
        clientdetail.anticipatedrevenue= req.body.anticipatedrevenue,
        clientdetail.population= req.body.population,
        clientdetail.industrytype= req.body.industrytype,
        clientdetail.wintheme= req.body.wintheme,
        clientdetail.customisableconvenience= req.body.customisableconvenience,
        clientdetail.digitalsignage= req.body.digitalsignage,
        clientdetail.mobile= req.body.mobile,
        clientdetail.kiosk= req.body.kiosk,
        clientdetail.selfcheckout= req.body.selfcheckout,
        clientdetail.cashier= req.body.cashier,
        clientdetail.station= req.body.station,
        clientdetail.digitalsignage50= req.body.digitalsignage50,
        clientdetail.digitalsignage55= req.body.digitalsignage55,
        clientdetail.digitalsignage65= req.body.digitalsignage65,
        clientdetail.catering= req.body.catering,
        clientdetail.pos= req.body.pos,
        clientdetail.suportingfeature= req.body.suportingfeature,
        clientdetail.wtproduct= req.body.wtproduct
                    
        clientdetail.save()
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch((err) => {
            res.status(400).send("unable to update the database");
        });
    }
});

 };



// Delete a category with the specified id in the request
exports.delete = (req, res) => {
        clientDetails.findByIdAndRemove({_id: req.params.id }, function(err, clientdetail) {
            if(err) {
                res.json(err);
            }
            else {
                res.json('Successfully removed');
            }
        }).catch(err => {
            return res.status(500).send({
                message: "Could not delete category with id " + req.params.Id
            });
        });;
};



// Retrieve and return all categories from the database.
exports.find = (req, res) => {


    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    if (query.id) {
               
        clientDetails.findById(query.id, function(err, clientdetail) {
            
            if(!clientdetail) {
                return res.status(404).send({
                    message: "client not found with id " + req.params.Id
                });
            }
            else { // do your update here
                res.json(clientdetail);
            }
        });
    }
    else{
        clientDetails.find()
        .then(clientdetails => {
            res.send(clientdetails);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong."
            });
        });
    }
};


exports.findOne = (req, res) => {
    console.log('finedone');
    clientDetails.findById(req.params.Id)
        .then(clientdetails => {
            if (!clientdetails) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.Id
                });
            }
            console.log(clientdetails);
            res.send(clientdetails);
        }).catch(err => {
            return res.status(500).send({
                message: "Error retrieving category with id " + req.params.Id
            });
        });
};

exports.findByEmail = (req, res) => {
    clientDetails.findById(req.params.email)
        .then(clientdetails => {
            if (!clientdetails) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.email
                });
            }
            res.send(clientdetails);
        }).catch(err => {
            return res.status(500).send({
                message: "Error retrieving category with id " + req.params.email
            });
        });
};