module.exports = (app) => {    
    const winthemeData = require('../controllers/winthemedata.js');

    
    app.post('/add/post', winthemeData.create);

    app.put('//update/:id',  winthemeData.update);

    app.delete('/delete/:id', winthemeData.delete);
}