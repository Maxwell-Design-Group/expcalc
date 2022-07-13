const contractTypeList = require('../models/contracttypelist.js');
const industryType = require('../models/industrytype.js');
const stationList = require('../models/stationlist.js');
const wtProduct = require('../models/wtproduct.js');
const winTheme = require('../models/wintheme.js');
const customisableConvenienceOption = require('../models/customisableconvenienceoption.js');
const supportingFeature = require('../models/supportingfeature.js');
const digitalSignage = require('../models/digitalsignage.js');
const cateringDetail = require('../models/cateringdetail.js');


exports.findAll = (req, res) => {

    var gcontracttypelist = [];
    var gindustrytype=[];
    var gstationList=[];
    var gwtproduct=[];

    var gsupportingfeature=[];
    var gdigitalsignage=[];
    var gcateringdetail=[];
    var gwth=[];
    var gccoption =[];
    

	contractTypeList.find()
    .then(contracttypelist => {
       
       gcontracttypelist=contracttypelist;
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });

    //-----------------------------------------
    industryType.find()
    .then(industrytype => {
       
        gindustrytype = industrytype;
        
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });

    //-----------------------------------------
    stationList.find()
    .then(stationList => {
       
        gstationList = stationList;
       
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });

    //-----------------------------------------
    wtProduct.find()
    .then(wtproduct => {
       
        gwtproduct = wtproduct;
       
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });
    

    //-----------------------------------------
    winTheme.find()
    .then(wintheme => {
       
        gwth = wintheme;
       
       
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });

    //-----------------------------------------
    customisableConvenienceOption.find()
    .then(c => {
       
        gccoption = c;       

        
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });

    //-----------------------------------------
    supportingFeature.find()
    .then(supportingfeature => {
       
        gsupportingfeature = supportingfeature;
       
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });

    //-----------------------------------------
    digitalSignage.find()
    .then(digitalsignage => {
       
        gdigitalsignage = digitalsignage;
        
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });


    //-----------------------------------------
    cateringDetail.find()
    .then(cateringdetail => {
       

        gcateringdetail = cateringdetail;
        console.log(gwth);
        return res.status(200).send({
            success: true,        
            contracttypelist:gcontracttypelist,
            industrytype: gindustrytype,
            stationdata:gstationList,
            wtproduct: gwtproduct, 

            supportingfeature:gsupportingfeature,
            digitalsignage:gdigitalsignage,
            cateringdetail:gcateringdetail,

            ccoption: gwth,
            wintheme:gccoption
            
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });

    
};

exports.findContractTypeList = (req, res) => {

    contractTypeList.find()
    .then(contracttypelist => {
        res.send(contracttypelist);
       
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });
}


exports.findTndustryType = (req, res) => {
    industryType.find()
    .then(industrytype => {
        res.send(industrytype);
        
        
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });
}


exports.findwinTheme = (req, res) => {
    winTheme.find()
    .then(wintheme => {
        res.send(wintheme);       
       
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });
}

exports.findCustomisableConvenienceOption = (req, res) => {
    customisableConvenienceOption.find()
    .then(c => {
       
              
        res.send(c); 
        
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });
}
