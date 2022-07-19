import axios from "axios";
import Store from "../Redux/Store";

import Alert from "../Components/Alert/Alert";
import { completedSteps, nextAccordionOpen } from "../Redux/Actions";
class calculatedataService {
  

  getcalculation(data) {
   
    var master = data.master;

    console.log('calcuation func');
    console.log(data);
   
     
     var capex=0;
     var opex=0;
     var total=0;
     
     var footprint = "";

     if (data.mobile==true){
      footprint =   "Mobile";
     } else if (data.mobile==true && data.kiosk==true){
      footprint =   "Mobile + Kiosk";
     
    } else if (data.mobile==true && data.selfCheckout==true){
      footprint =   "Mobile + Self-Checkout";
    
    } else if (data.mobile==true && data.cashier==true){
      footprint =   "Mobile + Cashier";
  
    } else if (data.mobile==true && data.Kiosk==true && data.selfCheckout==true){  
      footprint =   "Mobile + Kiosk + Self-Checkout";

    } else if (data.mobile==true && data.Kiosk==true && data.cashier==true){ 
      footprint =   "Mobile + Kiosk + Cashier"; 

    } else if (data.mobile==true && data.selfCheckout==true && data.cashier==true){  
      footprint =   "Mobile + Self-Checkout + Cashier";

    } else if (data.mobile==true && data.kiosk==true && data.selfCheckout==true && data.cashier==true){ 
      footprint =   "Mobile + Kiosk + Self-Checkout + Cashier"; 

    } else if (data.kiosk==true){ 
      footprint =   "Kiosk"; 

    } else if (data.kiosk==true  && data.selfCheckout==true){ 
      footprint =   "Kiosk + Self-Checkout"; 

    } else if (data.kiosk==true  && data.cashier==true){ 
      footprint =   "Kiosk + Cashier"; 

    } else if (data.kiosk==true  && data.selfCheckout==true && data.cashier==true) { 
      footprint =   "Kiosk + Self-Checkout + Cashier"; 

    } else if (data.selfCheckout==true){ 
      footprint =   "Self-Checkout"; 

    } else if (data.selfCheckout==true && data.cashier==true){ 
      footprint =   "Self-Checkout + Cashier"; 

    } else if (data.cashier==true){ 
      footprint =   "Cashier"; 

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

      
              if( data.pos!==undefined && footprint!=""){

                    
                    const pos = master.pos.filter(e=>e.range1 <= Number(data.population) && e.range2 >= Number(data.population));
                  
                    pos.forEach(p => {              
                      if(p!=null){
                        if(p.pos==data.pos){
                          capex=  capex + Number( p.capex) 
                          opex= opex + Number( p.opex) 
                          total= total +  Number( p.capex) ;
                        }

                        capex=  capex + Number( p.icapex) 
                        opex= opex + Number( p.iopex) 
                        total= total +  Number( p.icapex) +Number( p.iopex);

                        capex=  capex + Number( p.ncapex) 
                        opex= opex + Number( p.nopex) 
                        total= total +  Number( p.ncapex) +Number( p.nopex);
                        
                    }
                  });
                
            }  

            if( data.station!==undefined && master.stationdata!==undefined){
                    
                    const st = master.stationdata.filter(e=>e.station == data.station);
                    console.log(st);
                    st.forEach(s => {              
                      if(s!=null){
                        capex=  capex + Number( s.capex) 
                        opex= opex + Number( s.opex) 
                        total= total +  Number( s.capex) ;
                      
                        console.log('total stations');
                    }
                  });
          
            } 


     }

     if( data.digitalsignage!==undefined && master.digitalsignage!=undefined){

        var suportingFeatureslist =  data.digitalsignage.split(',');

        suportingFeatureslist.forEach(sp => {
          const ydigitalsignage = master.digitalsignage.filter(e=>e.digitalsign  == sp);
            if(ydigitalsignage!=null && ydigitalsignage.length>0){
              if(sp=="50"){
                capex=  capex + Number( ydigitalsignage[0].capex) * Number(data.digitalsignageqty50);
                opex= opex + Number( ydigitalsignage[0].opex) * Number(data.digitalsignageqty50);
                total= total + ( (Number( ydigitalsignage[0].capex) * Number(data.digitalsignageqty50)) + (Number( ydigitalsignage[0].opex) * Number(data.digitalsignageqty50)));
              }else if(sp=="55"){
                capex=  capex + Number( ydigitalsignage[0].capex) * Number(data.digitalsignageqty55);
                opex= opex + Number( ydigitalsignage[0].opex) * Number(data.digitalsignageqty55);
                total= total + ( (Number( ydigitalsignage[0].capex) * Number(data.digitalsignageqty55)) + (Number( ydigitalsignage[0].opex) * Number(data.digitalsignageqty55)));
              }else if(sp=="65"){
                capex=  capex + Number( ydigitalsignage[0].capex) * Number(data.digitalsignageqty65);
                opex= opex + Number( ydigitalsignage[0].opex) * Number(data.digitalsignageqty65);
                total= total + ( (Number( ydigitalsignage[0].capex) * Number(data.digitalsignageqty65)) + (Number( ydigitalsignage[0].opex) * Number(data.digitalsignageqty65)));
              }
              
            }
        });
        
     }

     
     if(data.catering!==undefined){
        var categorylist =  data.catering.split(',');

        categorylist.forEach(category => {
           let categorydata = master.cateringdetail.filter(e=>e.digitalsign == category);
           if(categorydata!=null && categorydata.length>0){
               capex=  capex + Number( categorydata[0].capex);
               opex= opex +  Number( categorydata[0].opex);
               total= total + ( Number( categorydata[0].capex) + Number( categorydata[0].opex));
           }
        });
     }

     if(data.wtproduct!==undefined && data.wtproduct!== null && data.wtproduct.length>0){
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
