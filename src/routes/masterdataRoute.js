module.exports = (app) => {
    const common = require('../controllers/common.js');
    const clientData = require('../controllers/clientdetail.js');

    
    app.post('/client', clientData.create);

    app.get('/client', clientData.find);

    app.delete('/client', clientData.delete);

    app.put('/client/:id',  clientData.update);


    // app.get('/master', masterdata.findAll);

    // app.get('/contract', masterdata.findContractTypeList);

    // app.get('/industry', masterdata.findTndustryType);

    // app.get('/wintheme', masterdata.findwinTheme);

    // app.get('/ccoption', masterdata.findCustomisableConvenienceOption);

    // app.get('/master', common.findAll);

    // app.get('/contract', common.findContractTypeList);

    // app.get('/industry', common.findTndustryType);

    // app.get('/wintheme', common.findwinTheme);

    // app.get('/ccoption', common.findCustomisableConvenienceOption);
    
   }