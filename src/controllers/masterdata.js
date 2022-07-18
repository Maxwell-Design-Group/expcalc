const contractTypeList = require('../models/contracttypelist.js');
const industryType = require('../models/industrytype.js');
const stationList = require('../models/stationlist.js');
const wtProduct = require('../models/wtproduct.js');
const winTheme = require('../models/wintheme.js');
const customisableConvenienceOption = require('../models/customisableconvenienceoption.js');
const supportingFeature = require('../models/supportingfeature.js');
const digitalSignage = require('../models/digitalsignage.js');
const cateringDetail = require('../models/cateringdetail.js');
const posData = require('../models/posdata.js');
const digitalSignageService = require('../services/digital-signage.service');

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
    var gpos = [];
    

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
    posData.find()
    .then(pos => {
       
        gpos = pos;
        console.log(gpos);
        
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
        console.log(gpos);
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
            wintheme: gwth ,
            pos: gpos,
            
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



exports.getSupportingFeatures = async (req, res) => {
    let ds50Total = 0;
    let ds55Total = 0;
    let ds65Total = 0;
    let digitalSignageResult = [];
    const digitalSignages = await digitalSignageService.findAll();
    console.log(digitalSignages);
    for (let i = 0; i < digitalSignages.length; i++) {
        if (digitalSignages[i]['digitalsign'] == '50') {
            ds50Total =Number(digitalSignages[i]['capex']) +Number(digitalSignages[i]['opex']);
        }
        else if (digitalSignages[i]['digitalsign'] == '55') {
            ds55Total =Number(digitalSignages[i]['capex']) +Number(digitalSignages[i]['opex']);
        }
        else if (digitalSignages[i]['digitalsign'] == '65') {
            ds65Total =Number(digitalSignages[i]['capex']) +Number(digitalSignages[i]['opex']);
        }
    }

    if (req.body.digitalSignage) {
        if (req.body.digitalSignage['50']) {
            let total = Number(req.body.digitalSignage['50']) * Number(ds50Total);
            digitalSignageResult.push('Digital Signage ' + '$' + total)
        }
        if (req.body.digitalSignage['55']) {
            let total = Number(req.body.digitalSignage['55']) * Number(ds50Total);
            digitalSignageResult.push('Digital Signage ' + '$' + total)
        }
        if (req.body.digitalSignage['65']) {
            let total = Number(req.body.digitalSignage['50']) * Number(ds50Total);
            digitalSignageResult.push('Digital Signage ' + '$' + total)
        }
        return res.send(digitalSignageResult);
    }
}

exports.pos = (req, res) => {

    var gpos = [];
    var capex=  "0";
    var opex= "0";
    var total="0";
        if (req.body.customisableconvenience === 'true'){
         
       
        //-----------------------------------------
        customisableConvenienceOption.find()
        .then(c => {
    
            const ccoption = c.filter(e=>e.custConvOption===req.body.customisableconvenienceoption);
           
            if (ccoption!=null && ccoption.length>0){
                ccoption.forEach(cco => {
                    capex=  capex + Number( cco.capex);
                    opex= opex + Number(cco.opex);
                    total= total + (Number(cco.capex) + Number(cco.opex));
    
                   return res.send({ /// the block will return single only due to validation to chose single ccoption
                      pos:{ 
                        pos:cco.pos,
                       capex:capex,
                       opex:opex,
                       total:total
                   }
                });
                }); 
            }
            else{
                return res.send("Data not found");
            }      
            
            
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong."
            });
        });
        
     }
     else {


            //-----------------------------------------
            posData.find()
            .then(pos => {
            
                const poslist = pos.filter(e=>e.range1 <= req.body.population && e.range2 >= req.body.population);
           
                if (poslist!=null && poslist.length>0){
                    poslist.forEach(l => {

                        console.log(l);
                    
                    }); 

                       return res.send({ 
                        pos:poslist
                                       });

                }
                else{
                    return res.send("Data not found");
                }
                

            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something went wrong."
                });
            });

           // console.log('gpos details');
            //console.log(gpos);
        }

        
    
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

           var networkinstallation = [
            {"Item":"I","Range1":"0","Range2":"100","capex":"54947.0","opex":"4200"},
            {"Item":"N","Range1":"0","Range2":"100","capex":"9318.0","opex":"10800.0"},
            {"Item":"I","Range1":"101","Range2":"200","capex":"60489.0","opex":"4200.0"},
            {"Item":"N","Range1":"101","Range2":"200","capex":"12424.0","opex":"14400.0"},
            {"Item":"I","Range1":"201","Range2":"300","capex":"549470.0","opex":"4200.0"},
            {"Item":"N","Range1":"201","Range2":"300","capex":"9318.0","opex":"10800.0"},
            {"Item":"I","Range1":"301","Range2":"400","capex":"549470.0","opex":"4200.0"},
            {"Item":"N","Range1":"301","Range2":"400","capex":"9318.0","opex":"10800.0"},
            {"Item":"I","Range1":"401","Range2":"499","capex":"54947.0","opex":"4200.0"},
            {"Item":"N","Range1":"401","Range2":"499","capex":"9318.0","opex":"10800.0"},
            {"Item":"I","Range1":"500","Range2":"550","capex":"54947.0","opex":"4200.0"},
            {"Item":"N","Range1":"500","Range2":"550","capex":"9318.0","opex":"10800.0"},
            {"Item":"I","Range1":"551","Range2":"600","capex":"54947.0","opex":"4200.0"},
            {"Item":"N","Range1":"551","Range2":"600","capex":"9318.0","opex":"10800.0"},
            {"Item":"I","Range1":"601","Range2":"1000","capex":"54947.0","opex":"4200.0"},
            {"Item":"N","Range1":"601","Range2":"1000","capex":"9318.0","opex":"10800.0"},
            {"Item":"I","Range1":"1001","Range2":"2000","capex":"54947.0","opex":"4200.0"},
            {"Item":"N","Range1":"1001","Range2":"2000","capex":"9318.00","opex":"10800.0"},
            {"Item":"I","Range1":"2001","Range2":"3000","capex":"549470.0","opex":"4200.0"},
            {"Item":"N","Range1":"2001","Range2":"3000","capex":"9318.0","opex":"10800.0"},
            {"Item":"I","Range1":"3001","Range2":"5000","capex":"54947.0","opex":"4200.0"},
            {"Item":"N","Range1":"3001","Range2":"5000","capex":"9318.0","opex":"10800.0"}
            ];

            console.log(networkinstallation);

            let netinst = networkinstallation.filter(e=>e.Range1 <= Number( req.body.population) && e.Range2 >= Number( req.body.population));
                if(netinst!=null && netinst.length>0){

                    netinst.forEach(item => {
                        capex=  capex + Number( item.capex);
                        opex= opex +  Number( item.opex);
                        total= total + ( Number( item.capex) + Number( item.opex));  
                    });
                }
           
                if(req.body.station!=undefined && req.body.station!=""){
                    var stationlist =  req.body.station.split(',');

                    stationlist.forEach(station => {
                     let stationdata = master.stationdata.filter(e=>e.station === station);
                     if(stationdata!=null && stationdata.length>0){
                         capex=  capex + Number( stationdata[0].capex);
                         opex= opex +  Number( stationdata[0].opex);
                         total= total + ( Number( stationdata[0].capex) + Number( stationdata[0].opex));
                     }
                  });
                }
           


     }

     if( req.body.digitalsignage!=undefined){
        const ydigitalsignage = master.digitalsignage.filter(e=>e.digitalsign  === req.body.digitalsignage);

        if(ydigitalsignage!=null && ydigitalsignage.length>0){
           capex=  capex + Number( ydigitalsignage[0].capex) * Number(req.body.digitalsignageqty);
           opex= opex + Number( ydigitalsignage[0].opex) * Number(req.body.digitalsignageqty);
           total= total + ( (Number( ydigitalsignage[0].capex) * Number(req.body.digitalsignageqty)) + (Number( ydigitalsignage[0].opex) * Number(req.body.digitalsignageqty)));
        }
     }

     
     if(req.body.catering!=undefined){
        var categorylist =  req.body.catering.split(',');

        categorylist.forEach(category => {
           let categorydata = master.cateringdetail.filter(e=>e.digitalsign===category);
           if(categorydata!=null && categorydata.length>0){
               capex=  capex + Number( categorydata[0].capex);
               opex= opex +  Number( categorydata[0].opex);
               total= total + ( Number( categorydata[0].capex) + Number( categorydata[0].opex));
           }
        });
     }

     if(req.body.wtproduct!=undefined){
        var wtproductlist =  req.body.wtproduct.split(',');

        wtproductlist.forEach(category => {
           let wtproductdata = master.wtproduct.filter(e=>e.digitalsign===category);
            
           if(wtproductdata!=null && wtproductdata.length>0){
               capex=  capex + Number( wtproductdata[0].capex);
               opex= opex + Number( wtproductdata[0].opex);
               total= total + ( Number( wtproductdata[0].capex) + Number( categorydata[0].opex));
           }
        });
     }
     

     res.send(
        {
          capex:capex ,
          opex:opex ,
          total:total
        }
     );

}