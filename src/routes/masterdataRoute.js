module.exports = (app) => {
    const masterdata = require('../controllers/masterdata.js');
    const clientData = require('../controllers/clientdetail.js');

    
    app.post('/add/post', clientData.create);

    app.get('/allclient', clientData.findAll);

    app.get('/clientbyid/:id', clientData.findOne);

    app.get('/clientbyemail/:email', clientData.findByEmail);

    app.get('/getmasterdata', masterdata.findAll);

    app.get('/contracttypelist', masterdata.findContractTypeList);

    app.get('/industrytype', masterdata.findTndustryType);

    app.get('/wintheme', masterdata.findwinTheme);

    app.get('/customisableconvenienceoption', masterdata.findCustomisableConvenienceOption);
    
    app.put('//update/:id',  clientData.update);

    app.delete('/delete/:id', clientData.delete);
}