module.exports = (app) => {
    const masterdata = require('../controllers/masterdata.js');
    const clientData = require('../controllers/clientdetail.js');

    
    app.post('/client', clientData.create);

    app.get('/client', clientData.find);

    app.delete('/client', clientData.delete);

    app.put('/client/:id',  clientData.update);



    // app.get('/clientbyid/:id', clientData.findOne);

    // app.get('/clientbyemail/:email', clientData.findByEmail);

    app.get('/master', masterdata.findAll);

    app.get('/contract', masterdata.findContractTypeList);

    app.get('/industry', masterdata.findTndustryType);

    app.get('/wintheme', masterdata.findwinTheme);

    app.get('/ccoption', masterdata.findCustomisableConvenienceOption);
    
    // app.put('//update/:id',  clientData.update);

    // app.delete('/delete/:id', clientData.delete);
}