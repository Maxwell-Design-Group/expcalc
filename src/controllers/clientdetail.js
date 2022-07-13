const clientDetails = require('../models/clientdetails.js');


// Create and Save a new Category
exports.create = (req, res) => {
	if((req.body).length == 0) {
        return res.status(400).send({
            message: "Fields can not be empty"
        });
    }

    // Create a Category
    const clientDetails = new clientDetails({
        
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
    clientDetails.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });
};


// Update a category identified by the id in the request
exports.update = (req, res) => {
	if((req.body).length == 0) {
        return res.status(400).send({
            message: "Fields can not be empty"
        });
    }
     // Find category and update it with the request body
     clientDetails.findByIdAndUpdate(req.params.Id, {
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
    }, {new: true})
    .then(clientdetails => {
        if(!clientdetails) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.Id
            });
        }
        res.send(clientdetails);
    }).catch(err => {        
        return res.status(500).send({
            message: "Error updating category with id " + req.params.Id
        });
    });
};

// Delete a category with the specified id in the request
exports.delete = (req, res) => {
    clientDetails.findByIdAndRemove(req.params.Id)
    .then(clientdetails => {
        if(!clientdetails) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.Id
            });
        }
        res.send({message: "Category deleted successfully!"});
    }).catch(err => {      
        return res.status(500).send({
            message: "Could not delete category with id " + req.params.Id
        });
    });
};



// Retrieve and return all categories from the database.
exports.findAll = (req, res) => {
	clientDetails.find()
    .then(clientdetails => {
        res.send(clientdetails);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });
};


exports.findOne = (req, res) => {
    console.log('finedone');
	clientDetails.findById(req.params.Id)
    .then(clientdetails => {
        if(!clientdetails) {
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
        if(!clientdetails) {
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