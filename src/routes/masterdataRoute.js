module.exports = (app) => {
    const masterdata = require('../controllers/masterdata.js');
    const clientData = require('../controllers/clientdetail.js');

    
    app.post('/client', clientData.create);

    app.get('/client', clientData.find);

    app.delete('/client', clientData.delete);

    app.put('/client/:id',  clientData.update);


    app.get('/master', masterdata.findAll); 

    app.get('/contract', masterdata.findContractTypeList);

    app.get('/industry', masterdata.findTndustryType);

    app.get('/wintheme', masterdata.findwinTheme);

    app.get('/ccoption', masterdata.findCustomisableConvenienceOption);

    app.get('/pos', masterdata.pos);

    app.get('/supportingfeatures', masterdata.pos);

    app.get('/calculate', masterdata.calculecapexopex);
    
   }