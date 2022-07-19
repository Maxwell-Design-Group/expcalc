import axios from "axios";
import Store from "../Redux/Store";

import Alert from "../Components/Alert/Alert";
import { completedSteps, nextAccordionOpen } from "../Redux/Actions";
class calculatedataService {
  

  getcalculation(data) {
   
    var master = data.master;

     console.log(data);
     var capex=0;
     var opex=0;
     var total=0;
     
    
     if (data.customisableconvenience === true){
         
        const ccoption = master.ccoption.filter(e=>e.custConvOption===data.customisableconvenienceoption);
       
        if (ccoption!==null && ccoption.length>0){
            capex=  capex + Number( ccoption[0].capex);
            opex= opex + Number(ccoption[0].opex);
            total= total + (Number(ccoption[0].capex) + Number(ccoption[0].opex));
        }
        
        
     }
     else{

           
      if( data.pos!==undefined){
            const pos = master.data.pos.filter(e=>e.range1 <= data.population && e.range2 >= data.population);
            pos.forEach(p => {
              if(p!=null && p.length>0){
                capex=  capex + Number( p.capex) 
                opex= opex + Number( p.opex) 
                total= total +  Number( p.capex) ;

                capex=  capex + Number( p.icapex) 
                opex= opex + Number( p.iopex) 
                total= total +  Number( p.icapex) +Number( p.iopex);

                capex=  capex + Number( p.ncapex) 
                opex= opex + Number( p.nopex) 
                total= total +  Number( p.ncapex) +Number( p.nopex);
            }
          });
        
     }  


     }

     if( data.digitalsignage!==undefined){
        const ydigitalsignage = master.digitalsignage.filter(e=>e.digitalsign  === data.digitalsignage);

        if(ydigitalsignage!=null && ydigitalsignage.length>0){
           capex=  capex + Number( ydigitalsignage[0].capex) * Number(data.digitalsignageqty);
           opex= opex + Number( ydigitalsignage[0].opex) * Number(data.digitalsignageqty);
           total= total + ( (Number( ydigitalsignage[0].capex) * Number(data.digitalsignageqty)) + (Number( ydigitalsignage[0].opex) * Number(data.digitalsignageqty)));
        }
     }

     
     if(data.catering!==undefined){
        var categorylist =  data.catering.split(',');

        categorylist.forEach(category => {
           let categorydata = master.cateringdetail.filter(e=>e.digitalsign===category);
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
           let wtproductdata = master.wtproduct.filter(e=>e.digitalsign===category);
            
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
       
        
       var obj= {
          finalcapex:capex,
          finalopex:opex ,
          finaltotal:total
        };
       

  }
 
}

export default calculatedataService;
