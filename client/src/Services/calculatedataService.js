import axios from "axios";
import Store from "../Redux/Store";

import Alert from "../Components/Alert/Alert";
import { completedSteps, nextAccordionOpen } from "../Redux/Actions";
class calculatedataService {
  

  getcalculation(data) {
   
    var master = data.master;

    
     var capex=0;
     var opex=0;
     var total=0;
     
     var footprint = "";


     

     if (data.mobile==true){
      footprint =   "Mobile";
     } 
	  if (data.cashier==true){ 
      footprint =   "Cashier"; 

    }
    if (data.kiosk==true){ 
      footprint =   "Kiosk"; 

    } 
    if (data.selfcheckout==true){ 
      footprint =   "Self-Checkout"; 

    } 
    if (data.kiosk==true  && data.selfcheckout==true){ 
      footprint =   "Kiosk + Self-Checkout"; 

    } 
    if (data.kiosk==true  && data.cashier==true){ 
      footprint =   "Kiosk + Cashier"; 

    } 	
    if (data.mobile==true && data.kiosk==true){
      footprint =   "Mobile + Kiosk";
     
    } 
    if (data.mobile==true && data.selfcheckout==true){
      footprint =   "Mobile + Self-Checkout";
    
    } 
    if (data.mobile==true && data.cashier==true){
      footprint =   "Mobile + Cashier";
  
    } 
    if (data.selfCheckout==true && data.cashier==true){ 
      footprint =   "Self-Checkout + Cashier"; 

    } 
    if (data.mobile==true && data.Kiosk==true && data.selfcheckout==true){  
      footprint =   "Mobile + Kiosk + Self-Checkout";

    } 
    if (data.mobile==true && data.Kiosk==true && data.cashier==true){ 
      footprint =   "Mobile + Kiosk + Cashier"; 

    } 
    if (data.mobile==true && data.selfcheckout==true && data.cashier==true){  
      footprint =   "Mobile + Self-Checkout + Cashier";

    } 
    if (data.kiosk==true  && data.selfcheckout==true && data.cashier==true) { 
      footprint =   "Kiosk + Self-Checkout + Cashier"; 

    } 
    if (data.mobile==true && data.kiosk==true && data.selfcheckout==true && data.cashier==true){ 
      footprint =   "Mobile + Kiosk + Self-Checkout + Cashier"; 

    } 

    

     if (data.customisableconvenience === true){
         
        const ccoption = master.ccoption.filter(e=>e.custConvOption===data.customisableconvenienceoption);
       
        if (ccoption!==null && ccoption.length>0){
            capex=  capex + Number( ccoption[0].capex);
            opex= opex + Number(ccoption[0].opex);
            total= total + (Number(ccoption[0].capex) + Number(ccoption[0].opex));
        }
        
        
     }
     else{

      
              if( master.pos!==undefined && footprint!=""){

                    let d = Number(data.population)/250;
                    if (d>=1){
                        if (parseInt(d)<parseFloat(d))
                        {
                          d=d+1;
                        }
                    }
                    console.log(d);
                    //const pos = master.pos.filter(e=>e.range1 <= Number(data.population) && e.range2 >= Number(data.population));
                    const pos = master.pos.filter(e=>e.footprint == footprint);
                    console.log(footprint);
                    console.log(pos);
                    pos.forEach(p => {              
                      if(p!=null){
                          capex=  capex + Number( p.capex) 
                          opex= opex + Number( p.opex) 
                          total= total +  Number( p.capex) ;
                        

                          capex=  capex + Number( p.icapex) 
                          opex= opex + Number( p.iopex) 
                          total= total +  Number( p.icapex) +Number( p.iopex);

                          capex=  capex + Number( p.ncapex) * parseInt(d);
                          opex= opex + Number( p.nopex) *  parseInt(d);
                          total= total +  (Number( p.ncapex) +Number( p.nopex)) * parseInt(d);
                        
                    }
                  });
                
            }  

            if( data.station!==undefined && data.station!=="" && master.stationdata!==undefined){
                    
                    const st = master.stationdata.filter(e=>e.station == data.station);
                    console.log(st);
                    if (st!=null && st.length>0){
                          st.forEach(s => {              
                            if(s!=null){
                              capex=  capex + Number( s.capex) 
                              opex= opex + Number( s.opex) 
                              total= total +  Number( s.capex) ;
                            
                              console.log('total stations' + total);
                          }
                        });
                    }
            } 


     }


     if(   master.digitalsignage!=undefined){

        if (data.digitalsignage50!==undefined){
          console.log(data.digitalsignage50);
          let digitalsignage = master.digitalsignage.filter(e=>e.digitalsign  == '50');
           console.log(digitalsignage);

          if(digitalsignage!=null && digitalsignage.length>0 && data.digitalsignage50>0){
              capex= capex +  Number( digitalsignage[0].capex) * Number(data.digitalsignage50);
              opex= opex+ Number( digitalsignage[0].opex) * Number(data.digitalsignage50);
              total= total+ capex + opex;
          } 
        }

        
        if (data.digitalsignage55!==undefined){
          let digitalsignage = master.digitalsignage.filter(e=>e.digitalsign  == '55');
          if(digitalsignage!=null && digitalsignage.length>0 && data.digitalsignage55>0){
              capex= capex +  Number( digitalsignage[0].capex) * Number(data.digitalsignage55);
              opex= opex+ Number( digitalsignage[0].opex) * Number(data.digitalsignage55);
              total= total+ capex + opex;
          } 
        }

        if (data.digitalsignage65!==undefined){
          let digitalsignage = master.digitalsignage.filter(e=>e.digitalsign  == '65');
          if(digitalsignage!=null && digitalsignage.length>0 && data.digitalsignage65>0){
              capex= capex +  Number( digitalsignage[0].capex) * Number(data.digitalsignage65);
              opex= opex+ Number( digitalsignage[0].opex) * Number(data.digitalsignage65);
              total= total+ capex + opex;
          } 
        }
      
    }
   

     if(data.catering!==undefined){
        var cataringlist =  data.catering.split(',');
         
        cataringlist.forEach(ct => {
          
           let cateringdata = master.cateringdetail.filter(e=> ct.indexOf(e.digitalsign ) !== -1);
           
           if(cateringdata!=null && cateringdata.length>0){
               capex=  capex + Number( cateringdata[0].capex);
               opex= opex +  Number( cateringdata[0].opex);
               total= total + ( Number( cateringdata[0].capex) + Number( cateringdata[0].opex));
           }
        });
     }

    //  if( data.pos!==undefined  && master.pos!=undefined){
                    
    //       const pos = master.pos.filter(e=>e.pos === data.pos);
        
    //       pos.forEach(p => {              
    //         if(p!=null){
    //           if(p.pos==data.pos){
    //             capex=  capex + Number( p.capex) 
    //             opex= opex + Number( p.opex) 
    //             total= total +  Number( p.capex) ;
    //           }
    //       }
    //     });
  
    // } 

    //  if( data.digitalsignage!==undefined && master.digitalsignage!=undefined){

    //     var suportingFeatureslist =  data.digitalsignage.split(',');

    //     suportingFeatureslist.forEach(sp => {
    //       const ydigitalsignage = master.digitalsignage.filter(e=>e.digitalsign  == sp);
    //         if(ydigitalsignage!=null && ydigitalsignage.length>0){
    //           if(sp=="50"){
    //             capex=  capex + Number( ydigitalsignage[0].capex) * Number(data.digitalsignageqty50);
    //             opex= opex + Number( ydigitalsignage[0].opex) * Number(data.digitalsignageqty50);
    //             total= total + ( (Number( ydigitalsignage[0].capex) * Number(data.digitalsignageqty50)) + (Number( ydigitalsignage[0].opex) * Number(data.digitalsignageqty50)));
    //           }else if(sp=="55"){
    //             capex=  capex + Number( ydigitalsignage[0].capex) * Number(data.digitalsignageqty55);
    //             opex= opex + Number( ydigitalsignage[0].opex) * Number(data.digitalsignageqty55);
    //             total= total + ( (Number( ydigitalsignage[0].capex) * Number(data.digitalsignageqty55)) + (Number( ydigitalsignage[0].opex) * Number(data.digitalsignageqty55)));
    //           }else if(sp=="65"){
    //             capex=  capex + Number( ydigitalsignage[0].capex) * Number(data.digitalsignageqty65);
    //             opex= opex + Number( ydigitalsignage[0].opex) * Number(data.digitalsignageqty65);
    //             total= total + ( (Number( ydigitalsignage[0].capex) * Number(data.digitalsignageqty65)) + (Number( ydigitalsignage[0].opex) * Number(data.digitalsignageqty65)));
    //           }
              
    //         }
    //     });
        
    //  }

     
    //  if(data.catering!==undefined){
    //     var categorylist =  data.catering.split(',');

    //     categorylist.forEach(category => {
    //        let categorydata = master.cateringdetail.filter(e=>e.digitalsign == category);
    //        if(categorydata!=null && categorydata.length>0){
    //            capex=  capex + Number( categorydata[0].capex);
    //            opex= opex +  Number( categorydata[0].opex);
    //            total= total + ( Number( categorydata[0].capex) + Number( categorydata[0].opex));
    //        }
    //     });
    //  }

     if(data.wtproduct!==undefined && data.wtproduct!== null && data.wtproduct.length>0 && master.wtproduct !== undefined){
        var wtproductlist =  data.wtproduct.split(',');
        
        wtproductlist.forEach(category => {
           let wtproductdata = master.wtproduct.filter(e=>e.product==category);
            
           if(wtproductdata!=null && wtproductdata.length>0){
               capex=  capex + Number( wtproductdata[0].capex);
               opex= opex + Number( wtproductdata[0].opex);
               total= total + ( Number( wtproductdata[0].capex) + Number( wtproductdata[0].opex));
           }
        });
     }
        
    if(capex!==0 && opex!==0 && total!==0){
      document.getElementById("capex").innerHTML = '$' + capex.toFixed(2);
      document.getElementById("opex").innerHTML= '$' + opex.toFixed(2);
      document.getElementById("total").innerHTML = '$' + total.toFixed(2);
    }
    else{
      if (document.getElementById("capex")!=undefined){
        document.getElementById("capex").innerHTML = '$0.00';
        document.getElementById("opex").innerHTML= '$0.00' ;
        document.getElementById("total").innerHTML = '$0.00';
      }
    } 

  }
 
}



export default calculatedataService;
