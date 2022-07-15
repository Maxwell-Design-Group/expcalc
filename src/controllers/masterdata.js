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
        console.log(gdigitalsignage);
        
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

            ccoption: gccoption,
            wintheme:gwth 
            
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



exports.calculecapexopex = (req, res) => {
    
     var master = req.body.master;

    // console.log(master);
     var capex=0;
     var opex=0;
     var total=0;
     
    
     if (req.body.customisableconvenience === 'true'){
         
        const ccoption = master.ccoption.filter(e=>e.custConvOption===req.body.customisableconvenienceoption);
       
        if (ccoption!=null && ccoption.length>0){
            capex=  capex + Number( ccoption[0].capex);
            opex= opex + Number(ccoption[0].opex);
            total= total + (Number(ccoption[0].capex) + Number(ccoption[0].opex));
        }
        
        
     }
     else{

        
           
           var stationlist =  req.body.station.split(',');
     

           stationlist.forEach(station => {
            let stationdata = master.stationdata.filter(e=>e.station === station);
            if(stationdata!=null && stationdata.length>0){
                capex=  capex + Number( stationdata[0].capex);
                opex= opex +  Number( stationdata[0].opex);
                total= total + ( Number( stationdata[0].capex) + Number( stationdata[0].opex));
            }
         });

        console.log(footprintdt);
        console.log(posdatalist);

        

     }

     
     const ydigitalsignage = master.digitalsignage.filter(e=>e.digitalsign  === req.body.digitalsignage);

     if(ydigitalsignage!=null && ydigitalsignage.length>0){
        capex=  capex + Number( ydigitalsignage[0].capex) * Number(req.body.digitalsignageqty);
        opex= opex + Number( ydigitalsignage[0].opex) * Number(req.body.digitalsignageqty);
        total= total + ( (Number( ydigitalsignage[0].capex) * Number(req.body.digitalsignageqty)) + (Number( ydigitalsignage[0].opex) * Number(req.body.digitalsignageqty)));
     }
    

    

     var categorylist =  req.body.catering.split(',');
     

     categorylist.forEach(category => {
        let categorydata = master.cateringdetail.filter(e=>e.digitalsign===category);
        if(categorydata!=null && categorydata.length>0){
            capex=  capex + Number( categorydata[0].capex);
            opex= opex +  Number( categorydata[0].opex);
            total= total + ( Number( categorydata[0].capex) + Number( categorydata[0].opex));
        }
     });

    

     var wtproductlist =  req.body.wtproduct.split(',');

     wtproductlist.forEach(category => {
        let wtproductdata = master.wtproduct.filter(e=>e.digitalsign===category);
         
        if(wtproductdata!=null && wtproductdata.length>0){
            capex=  capex + Number( wtproductdata[0].capex);
            opex= opex + Number( wtproductdata[0].opex);
            total= total + ( Number( wtproductdata[0].capex) + Number( categorydata[0].opex));
        }
     });

     

     res.send(
        {
          capex:capex ,
          opex:opex ,
          total:total
        }
     );

}