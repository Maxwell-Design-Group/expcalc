const digitalSignage = require('../models/digitalsignage.js');

exports.findAll = async () => {
    try {
        return await digitalSignage.find()
    }
    catch (err) {
        return null;
    }
}