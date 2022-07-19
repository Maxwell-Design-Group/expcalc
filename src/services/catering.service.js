const catering = require('../models/cateringdetail.js');

exports.findAll = async () => {
    try {
        return await catering.find()
    }
    catch (err) {
        return null;
    }
}

