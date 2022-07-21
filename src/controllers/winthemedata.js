const winThemData = require('../models/winthemedata.js');


// Create and Save a new Category
exports.create = (req, res) => {
	if((req.body).length == 0) {
        return res.status(400).send({
            message: "Fields can not be empty"
        });
    }

    // Create a Category
    const winThemData = new winThemData({
        email: req.body.email, 
        wintheme: req.body.wintheme

    });

    // Save Category in the database
    winThemData.save()
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
     winThemData.findByIdAndUpdate(req.params.Id, {
        email: req.body.email, 
        wintheme: req.body.wintheme
    }, {new: true})
    .then(winthemdata => {
        if(!winthemdata) {
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
    winThemData.findByIdAndRemove(req.params.Id)
    .then(winthemdata => {
        if(!winthemdata) {
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
	winThemData.find()
    .then(winthemdata => {
        res.send(winthemdata);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });
};

// Find a single category with a id
exports.findOne = (req, res) => {
	winThemData.findById(req.params.Id)
    .then(winthemdata => {
        if(!winthemdata) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.Id
            });            
        }
        res.send(winthemdata);
    }).catch(err => {        
        return res.status(500).send({
            message: "Error retrieving category with id " + req.params.Id
        });
    });
};