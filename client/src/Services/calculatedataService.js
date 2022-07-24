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

            
            if( master.footprint!==undefined && footprint!=""){
              

              let d = Number(data.population)/250;
              if (d>=1){
              if (parseInt(d)<parseFloat(d))
              {
                        d=d+1;
               }
               }

              const ft =  master.footprint.filter(e=>e.footprint == footprint);
              
              
              if (ft!=null && ft.length>0){
                
                  const explist = ft[0].result.split(',');
                  
                  if (explist !=null){
                      explist.forEach(expitem => {
                        
                         var expitem2 = expitem.split("+");

                         if(expitem2!=null){

                              expitem2.forEach(expitem3 => {

                                      //==================================POS=====================================================
                                  const posexp = master.posexp.filter(e=>e.vender.trim().indexOf(expitem3.trim())!=-1)
                                  
                                  if(posexp!=null){
                                    const footprintarr = footprint.split('+');
                                    footprintarr.forEach(f => {
                                      console.log(f);
                                      const p = posexp.filter(e=>e.Experience.trim().indexOf(f.trim())!=-1);
                                      console.log(p);
                                          if (p!=null && p.length>0)
                                          {
                                            
                                            for(let i=0;i<p.length;i++){
                                              
                                              if (data.population<=500){
                                                if(p[i].vender!="Mashgin"){
                                                  capex=  capex + Number( p[i].Capex) * parseInt(d);
                                                  opex= opex + Number( p[i].opex) *  parseInt(d);
                                                  total= total +  (Number( p[i].Capex) +Number( p[i].opex)) * parseInt(d);
                                                }
                                                
                                              }
                                              else{
                                                capex=  capex + Number( p[i].Capex) * parseInt(d);
                                                opex= opex + Number( p[i].opex) *  parseInt(d);
                                                total= total +  (Number( p[i].Capex) +Number( p[i].opex)) * parseInt(d);
                                              }
                                              
                                            }
                                          } 

                                    });

                                  }
                                //===========================================INSTALL===================================================
                                const installexp = master.installexp.filter(e=>e.vender.trim().indexOf(expitem3.trim())!=-1)
                                
                                if(installexp!=null){
                                  const footprintarr = footprint.split('+');
                                  footprintarr.forEach(f => {
                                    const p = installexp.filter(e=>e.Experience.indexOf(f.trim().trim())!=-1);
                                        if (p!=null && p.length>0)
                                        {
                                          
                                          for(let i=0;i<p.length;i++){
                                            
                                            if (data.population<=500){
                                              if(p[i].vender!="Mashgin"){
                                                capex=  capex + Number( p[i].Capex) * parseInt(d);
                                                opex= opex + Number( p[i].opex) *  parseInt(d);
                                                total= total +  (Number( p[i].Capex) +Number( p[i].opex)) * parseInt(d);
                                              }
                                              
                                            }
                                            else{
                                              capex=  capex + Number( p[i].Capex) * parseInt(d);
                                              opex= opex + Number( p[i].opex) *  parseInt(d);
                                              total= total +  (Number( p[i].Capex) +Number( p[i].opex)) * parseInt(d);
                                            }
                                            
                                          }
                                        } 

                                  });

                                }
                              //=============================================network=================================================

                              const networkexp = master.networkexp.filter(e=>e.vender.trim().indexOf("Aramark")!=-1)
                                  
                              if(networkexp!=null){
                                const footprintarr = footprint.split('+');
                                footprintarr.forEach(f => {
                                  const p = networkexp.filter(e=>e.Experience.trim().indexOf(f.trim())!=-1);
                                      if (p!=null && p.length>0)
                                      {
                                        
                                        for(let i=0;i<p.length;i++){
                                          console.log("network");
                                          if (data.population<=500){
                                            if(p[i].vender!="Mashgin"){
                                              capex=  capex + Number( p[i].Capex) 
                                              opex= opex + Number( p[i].opex) 
                                              total= total +  (Number( p[i].Capex) +Number( p[i].opex)) 
                                            }
                                            
                                          }
                                          else{
                                            capex=  capex + Number( p[i].Capex) 
                                            opex= opex + Number( p[i].opex) 
                                            total= total +  (Number( p[i].Capex) +Number( p[i].opex))
                                          }
                                          
                                        }
                                      } 

                                });

                              }
                            //================================================================================================
                              
                             });

                         }


                      });
                  }
                  

              }
            }
            
           

            if( data.station!==undefined && data.station!=="" && master.stationdata!==undefined){
                    console.log(data.station);
                    var station = data.station.split(",");
                    if (station!=null && station.length>0){
                      station.forEach(item => {
                        const st = master.stationdata.filter(e=>e.station == item);
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
                      });
                    }
                    
            } 


     }


     if(   master.digitalsignage!=undefined){

        if (data.digitalsignage50!==undefined){
          console.log(data.digitalsignage50);
          let digitalsignage = master.digitalsignage.filter(e=>e.digitalsign  == '50');
           console.log(digitalsignage);
           console.log(data.digitalsignage50);
           console.log(total);

          if(digitalsignage!=null && digitalsignage.length>0 && data.digitalsignage50>0){
              capex= capex +  Number( digitalsignage[0].capex) * Number(data.digitalsignage50);
              opex= opex+ Number( digitalsignage[0].opex) * Number(data.digitalsignage50);
              total= total+ (Number( digitalsignage[0].capex) * Number(data.digitalsignage50) + Number( digitalsignage[0].opex) * Number(data.digitalsignage50));
          } 
        }

        
        if (data.digitalsignage55!==undefined){
          let digitalsignage = master.digitalsignage.filter(e=>e.digitalsign  == '55');
          if(digitalsignage!=null && digitalsignage.length>0 && data.digitalsignage55>0){
              capex= capex +  Number( digitalsignage[0].capex) * Number(data.digitalsignage55);
              opex= opex+ Number( digitalsignage[0].opex) * Number(data.digitalsignage55);
              total= total+ (Number( digitalsignage[0].capex) * Number(data.digitalsignage55) + Number( digitalsignage[0].opex) * Number(data.digitalsignage55));
          } 
        }

        if (data.digitalsignage65!==undefined){
          let digitalsignage = master.digitalsignage.filter(e=>e.digitalsign  == '65');
          if(digitalsignage!=null && digitalsignage.length>0 && data.digitalsignage65>0){
              capex= capex +  Number( digitalsignage[0].capex) * Number(data.digitalsignage65);
              opex= opex+ Number( digitalsignage[0].opex) * Number(data.digitalsignage65);
              total= total+( Number( digitalsignage[0].capex) * Number(data.digitalsignage65) + Number( digitalsignage[0].opex) * Number(data.digitalsignage65));
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
      document.getElementById("capex").innerHTML = '$' + parseInt(capex) ;
      document.getElementById("opex").innerHTML= '$' + parseInt( opex);
      document.getElementById("total").innerHTML = '$' + parseInt( total);
    }
    else{
      if (document.getElementById("capex")!=undefined){
        document.getElementById("capex").innerHTML = '$0';
        document.getElementById("opex").innerHTML= '$0' ;
        document.getElementById("total").innerHTML = '$0';
      }
    } 

  }

      
   
 
}




export default calculatedataService;
