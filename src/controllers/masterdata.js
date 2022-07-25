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
const posExp = require('../models/posexp.js');
const footPrint = require('../models/footprint.js');
const installExp = require('../models/installexp.js');
const networkExp = require('../models/networkexp.js');
const digitalSignageService = require('../services/digital-signage.service');
const cateringService = require('../services/catering.service');
const estimateSerivce=require('../services/createEstimateExcel');
const emailer=require('../utils/emailer.utils');
const fs = require('fs');


exports.findAll = async (req, res) => {

    var gcontracttypelist = [];
    var gindustrytype = [];
    var gstationList = [];
    var gwtproduct = [];

    var gsupportingfeature = [];
    var gdigitalsignage = [];
    var gcateringdetail = [];
    var gwth = [];
    var gccoption = [];
    var gpos = [];
    var gposexp = [];
    var ginstallexp = [];
    var gnetworkexp = [];
    var gfp=[];

    await contractTypeList.find()
        .then(contracttypelist => {

            gcontracttypelist = contracttypelist;
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong."
            });
        });

    //-----------------------------------------
    await posExp.find()
        .then(posexp  => {

            gposexp = posexp;
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong."
            });
        });

    //-----------------------------------------
    await installExp.find()
    .then(installexp  => {
       // console.log(installexp);
        ginstallexp = installexp;
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });

//-----------------------------------------
    await networkExp.find()
    .then(networkexp  => {

        gnetworkexp = networkexp;
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });

    //-----------------------------------------
    await footPrint.find()
    .then(footprint  => {

        gfp = footprint;
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong."
        });
    });

    //-----------------------------------------
    await industryType.find()
        .then(industrytype => {

            gindustrytype = industrytype;

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong."
            });
        });

    //-----------------------------------------
    await stationList.find()
        .then(stationList => {

            gstationList = stationList;

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong."
            });
        });

    //-----------------------------------------
    await wtProduct.find()
        .then(wtproduct => {

            gwtproduct = wtproduct;

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong."
            });
        });


    //-----------------------------------------
    await winTheme.find()
        .then(wintheme => {

            gwth = wintheme;


        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong."
            });
        });

    //-----------------------------------------
    await customisableConvenienceOption.find()
        .then(c => {

            gccoption = c;


        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong."
            });
        });

    //-----------------------------------------
    await supportingFeature.find()
        .then(supportingfeature => {

            gsupportingfeature = supportingfeature;

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong."
            });
        });

    //-----------------------------------------
    await digitalSignage.find()
        .then(digitalsignage => {

            gdigitalsignage = digitalsignage;
            //console.log(gdigitalsignage);

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong."
            });
        });

    //-----------------------------------------
    await posData.find()
        .then(pos => {

            gpos = pos;
           // console.log(gpos);

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong."
            });
        });

    //-----------------------------------------
    await cateringDetail.find()
        .then(cateringdetail => {


            gcateringdetail = cateringdetail;
            //console.log(gwth);
           // console.log(gpos);
            return res.status(200).send({
                success: true,
                contracttypelist: gcontracttypelist,
                industrytype: gindustrytype,
                stationdata: gstationList,
                wtproduct: gwtproduct,

                supportingfeature: gsupportingfeature,
                digitalsignage: gdigitalsignage,
                cateringdetail: gcateringdetail,

                ccoption: gccoption,
                wintheme: gwth,
                pos: gpos,
                posexp:gposexp,

                installexp:ginstallexp,
                networkexp:gnetworkexp,

                footprint:gfp,


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
    let result=[];
    const digitalSignages = await digitalSignageService.findAll();
    const catering = await cateringService.findAll();

   

    for (let i = 0; i < digitalSignages.length; i++) {
        if (digitalSignages[i]['digitalsign'] == '50') {
            ds50Total = Number(digitalSignages[i]['capex']) + Number(digitalSignages[i]['opex']);
            
        }
        else if (digitalSignages[i]['digitalsign'] == '55') {
            ds55Total = Number(digitalSignages[i]['capex']) + Number(digitalSignages[i]['opex']);
            
        }
        else if (digitalSignages[i]['digitalsign'] == '65') {
            ds65Total = Number(digitalSignages[i]['capex']) + Number(digitalSignages[i]['opex']);
            
        }
    }
    
     

    if (req.body.digitalSignage) {
        if (req.body.digitalSignage['50']) {
            let total = Number(req.body.digitalSignage['50']) * Number(ds50Total);
            // digitalSignageResult.push('Digital Signage  $'  + total)

            // digitalSignageResult.push('Digital Signagevalue:'  + total)

            digitalSignageResult.push('Digital Signage50 $' + total);
        }
        if (req.body.digitalSignage['55']) {
            let total = Number(req.body.digitalSignage['55']) * Number(ds55Total);
            
            digitalSignageResult.push('Digital Signage55 $' + total);
        }
        if (req.body.digitalSignage['65']) {
            let total = Number(req.body.digitalSignage['50']) * Number(ds65Total);


            digitalSignageResult.push('Digital Signage65 $'  + total);
        }
        
        
        console.log("catering");
        if (req.body.catering) {
            for (let i = 0; i < catering.length; i++) {
                for (let j = 0; j < req.body.catering.length; j++) {
                    
                    if (catering[i].digitalsign == req.body.catering[j]) {
                        let total = Number(catering[i].capex) + Number(catering[i].opex);
                        
                        digitalSignageResult.push(catering[i].digitalsign + ' $'  + total);
                    }
                }
            }
        }
       
    }

    return res.send(digitalSignageResult);
    
}



exports.pos = async (req, res) => {

    
    var capex = "0";
    var opex = "0";
    var total = "0";
   
    
    
    var footprint = "";
     

    if (req.body.mobile==true){
      footprint =   "Mobile";
     } 
	  if (req.body.cashier==true){ 
      footprint =   "Cashier"; 

    }
    if (req.body.kiosk==true){ 
      footprint =   "Kiosk"; 

    } 
    if (req.body.selfcheckout==true){ 
      footprint =   "Self-Checkout"; 

    } 
    if (req.body.kiosk==true  && req.body.selfcheckout==true){ 
      footprint =   "Kiosk + Self-Checkout"; 

    } 
    if (req.body.kiosk==true  && req.body.cashier==true){ 
      footprint =   "Kiosk + Cashier"; 

    } 	
    if (req.body.mobile==true && req.body.kiosk==true){
      footprint =   "Mobile + Kiosk";
     
    } 
    if (req.body.mobile==true && req.body.selfcheckout==true){
      footprint =   "Mobile + Self-Checkout";
    
    } 
    if (req.body.mobile==true && req.body.cashier==true){
      footprint =   "Mobile + Cashier";
  
    } 
    if (req.body.selfCheckout==true && req.body.cashier==true){ 
      footprint =   "Self-Checkout + Cashier"; 

    } 
    if (req.body.mobile==true && req.body.Kiosk==true && req.body.selfcheckout==true){  
      footprint =   "Mobile + Kiosk + Self-Checkout";

    } 
    if (req.body.mobile==true && req.body.Kiosk==true && req.body.cashier==true){ 
      footprint =   "Mobile + Kiosk + Cashier"; 

    } 
    if (req.body.mobile==true && req.body.selfcheckout==true && req.body.cashier==true){  
      footprint =   "Mobile + Self-Checkout + Cashier";

    } 
    if (req.body.kiosk==true  && req.body.selfcheckout==true && req.body.cashier==true) { 
      footprint =   "Kiosk + Self-Checkout + Cashier"; 

    } 
    if (req.body.mobile==true && req.body.kiosk==true && req.body.selfcheckout==true && req.body.cashier==true){ 
      footprint =   "Mobile + Kiosk + Self-Checkout + Cashier"; 

    } 

    
    if (req.body.customisableconvenience == true) {

          
        //-----------------------------------------
       await customisableConvenienceOption.find()
            .then(c => {

                const ccoption = c.filter(e => e.custConvOption === req.body.customisableconvenienceoption);
                
                if (ccoption != null && ccoption.length > 0) {
                    ccoption.forEach(cco => {
                        capex = capex + Number(cco.capex);
                        opex = opex + Number(cco.opex);
                        total = total + (Number(cco.pcapex) + Number(cco.popex));

                        return res.send({ /// the block will return single only due to validation to chose single ccoption
                            pos: [{                               
                                pos: req.body.customisableconvenienceoption +'-'+ cco.pos,
                                capex: capex,
                                opex: opex,
                                total: total
                            }]
                        });
                    });
                }
                else {
                    return res.send("Data not found");
                }


            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something went wrong."
                });
            });

    }
    else {

        var footprintdata=req.body.master.footprint;
        var posexpdata = req.body.master.posexp;
        
        var pos = [];
       
        

        if( footprintdata!==undefined && footprintdata!==null && footprintdata.length>0 && footprint!="" && posexpdata!==null){
              

            let d = Number(req.body.population)/250;
            if (d>=1){
            if (parseInt(d)<parseFloat(d))
            {
                      d=d+1;
             }
             }

            const ft =  footprintdata.filter(e=>e.footprint === footprint);
            
            
            if (ft!=null && ft.length>=0){
              
                const explist = ft[0].result.split(',');
                
                if (explist !=null){
                    var pcapex = 0;
                    var popex =0;
                    var ptotal =0;
                    explist.forEach(expitem => {
                      
                       var expitem2 = expitem.split("+");

                       if(expitem2!=null){

                            expitem2.forEach(expitem3 => {

                                    //==================================POS=====================================================
                                const pos2 = posexpdata.filter(e=>e.vender.trim().indexOf(expitem3.trim())!=-1)
                               
                                if (pos2!=null && pos2.length>0){
                                    
                                    const footprintarr = footprint.split('+');
                                    
                                    footprintarr.forEach(f => {
                                    
                                    const p = pos2.filter(e=>e.Experience.indexOf(f.trim())!==-1 );
                                    
                                    
                                    p.forEach(item => {
                                        if (Number(req.body.population)<=500){
                                             if (item.vender !=="Mashgin"){
                                                pcapex = pcapex +Number( item.Capex )* Number(d);
                                                popex = popex + Number(item.opex)* Number(d);
                                                ptotal =(Number(item.Capex) + Number(item.opex))* Number(d);  
                                             }
                                        }
                                        else {
                                            pcapex = pcapex + Number(item.Capex)* Number(d);
                                            popex = popex + Number(item.opex)* Number(d);
                                            ptotal =(Number(item.Capex) + Number(item.opex))* Number(d);  
                                        }

                                        
                                    });
                                    
                                  })


                                }
                                
                                
                            
                           });

                       }
                       
                       capex = capex + pcapex;
                       opex = opex + popex;
                       total = ptotal;

                       objpos = {                               
                        pos:  expitem,
                        capex: capex,
                        opex: opex,
                        total: total
                        };

                        pos.push(objpos);

                    });
                }
                

            }
          }

          return res.send( /// the block will return single only due to validation to chose single ccoption
               {pos} 
            );

        // console.log('gpos details');
        //console.log(gpos);
    }



}

exports.calculecapexopex = (req, res) => {

    var master = req.body.master;

    // console.log(master);
    var capex = 0;
    var opex = 0;
    var total = 0;


    if (req.body.customisableconvenience === 'true') {

        const ccoption = master.ccoption.filter(e => e.custConvOption === req.body.customisableconvenienceoption);

        if (ccoption != null && ccoption.length > 0) {
            capex = capex + Number(ccoption[0].capex);
            opex = opex + Number(ccoption[0].opex);
            total = total + (Number(ccoption[0].capex) + Number(ccoption[0].opex));
        }


    }
    else {


        const pos = master.data.pos.filter(e => e.range1 <= req.body.population && e.range2 >= req.body.population);
        pos.forEach(p => {
            if (p != null && p.length > 0) {
                capex = capex + Number(p.capex)
                opex = opex + Number(p.opex)
                total = total + Number(p.capex);

                capex = capex + Number(p.icapex)
                opex = opex + Number(p.iopex)
                total = total + Number(p.icapex) + Number(p.iopex);

                capex = capex + Number(p.ncapex)
                opex = opex + Number(p.nopex)
                total = total + Number(p.ncapex) + Number(p.nopex);
            }
        });


    }

    if (req.body.digitalsignage != undefined) {
        const ydigitalsignage = master.digitalsignage.filter(e => e.digitalsign === req.body.digitalsignage);

        if (ydigitalsignage != null && ydigitalsignage.length > 0) {
            capex = capex + Number(ydigitalsignage[0].capex) * Number(req.body.digitalsignageqty);
            opex = opex + Number(ydigitalsignage[0].opex) * Number(req.body.digitalsignageqty);
            total = total + ((Number(ydigitalsignage[0].capex) * Number(req.body.digitalsignageqty)) + (Number(ydigitalsignage[0].opex) * Number(req.body.digitalsignageqty)));
        }
    }


    if (req.body.catering != undefined) {
        var categorylist = req.body.catering.split(',');

        categorylist.forEach(category => {
            let categorydata = master.cateringdetail.filter(e => e.digitalsign === category);
            if (categorydata != null && categorydata.length > 0) {
                capex = capex + Number(categorydata[0].capex);
                opex = opex + Number(categorydata[0].opex);
                total = total + (Number(categorydata[0].capex) + Number(categorydata[0].opex));
            }
        });
    }

    if (req.body.wtproduct != undefined) {
        var wtproductlist = req.body.wtproduct.split(',');

        wtproductlist.forEach(category => {
            let wtproductdata = master.wtproduct.filter(e => e.digitalsign === category);

            if (wtproductdata != null && wtproductdata.length > 0) {
                capex = capex + Number(wtproductdata[0].capex);
                opex = opex + Number(wtproductdata[0].opex);
                total = total + (Number(wtproductdata[0].capex) + Number(categorydata[0].opex));
            }
        });
    }


    res.send(
        {
            capex: capex,
            opex: opex,
            total: total
        }
    );

}

exports.sendEstimate =async (req, res) => {
  let filepath=await estimateSerivce.createEstimate(req.body);
  const contents = fs.readFileSync(filepath, {encoding: 'base64'});
  fs.unlinkSync(filepath);
  emailer.sendEmail(req.body.email,req.body.name,contents);
   res.json('Success');
}