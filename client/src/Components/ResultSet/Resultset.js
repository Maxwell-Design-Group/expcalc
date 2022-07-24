import React from "react";
import "./Resultset.css";
import { useSelector } from "react-redux";
import ClientDetailService from "../../Services/ClientDetailService";
import Alert from "../Alert/Alert";



const Resultset = (props) => {
  const { isMobileView = false } = props;
  const { clientDetails } = useSelector((state) => state.Reducer);
  const { posDetails } = useSelector((state) => state.Reducer);
  const { supportingFeatureDetails } = useSelector((state) => state.Reducer);
  const { masterData } = useSelector((state) => state.Master);

  
  const clientDetailService = new ClientDetailService();
  const sendMail = () => {
   
    if (document.getElementById("email").value.trim() === ""){
      Alert.error("Enter the email id");
      document.getElementById("email").focus();
      return ;
    }


    let objpos =[];

    posDetails.forEach(item => {
         let pos = {
          text : item.pos,
          value : item.total
         }
         objpos.push( pos);
    });

    let objfeature = [];

    supportingFeatureDetails.forEach(item => {
     
      let arr = item.split('$');

      let f ={
        text :arr[0] ,
        value: " $"+ arr[1] 
      }
      objfeature.push( f);
    });


    const obj ={

      "email":document.getElementById("email").value,

      "name":clientDetails.clientname,
  
      "total":document.getElementById("capex").innerHTML,
  
      "capex":document.getElementById("opex").innerHTML,
  
      "opex":document.getElementById("total").innerHTML,
  
      "anticipatedRevnue":clientDetails.anticipatedrevenue,
  
      "busiest15Min":clientDetails.population,
  
      "contractType":clientDetails.contracttype,
  
      "industryType":clientDetails.industrytype,
  
      "winThemes":clientDetails.wintheme,

      "pos":objpos,

      "features":objfeature,

      "stations":getstations(),

      "selection":getproduct()

    };

    console.log(clientDetails);
    console.log(masterData);
    console.log(obj);

    clientDetailService.sendEmail(obj);
  }

  function getstations(){
    if (clientDetails.station !== undefined ){
         let stalist = clientDetails.station.split(",");
         var obj =[];
 
         stalist.forEach(item => {
           var st = masterData.stationdata.filter(e=>e.station === item);
           
           if(st!==null){
             let capex=0;
             let opex=0
             for(let i=0;i<st.length;i++){
               if( parseInt(clientDetails.population)<=500){
                     if(st[i].vender!=="Mashgin"){
                        capex = capex + Number(st[i].capex);
                        opex = opex + Number(st[i].opex)
                     }
               }
               else{
                 capex = capex + Number(st[i].capex);
                 opex = opex + Number(st[i].opex)
               }
             }

             let o =  {
               text :item ,
               value: " $"+ parseInt( Number(capex)+Number(opex) ) 
              
             };

             obj.push(o);
               
               
           }
 
         });
         
       return obj;
    }
    else
    {
     return [];
    }
    
}

function getproduct(){
 if(clientDetails.wtproduct!==undefined){
       let prod = clientDetails.wtproduct.split(",");
       var obj =[];
   
       prod.forEach(item => {
         var p = masterData.wtproduct.filter(e=>e.product === item);
         if(p!==null){
          let capex=0;
          let opex=0
          for(let i=0;i<p.length;i++){
            capex = capex + Number(p[i].capex);
            opex = opex + Number(p[i].opex)
          }

          let o =  {
            text :item ,
            value: " $"+ parseInt( Number(capex)+Number(opex) ) 
           
          };

          obj.push(o);
            
         }
         
   
       });
       console.log(obj);
     return obj;
 } else{
   return [];
 }
 
}

  return (
    <>
      <div className="dashboard-resultset-main-container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h5 className="dashboard-resultset-heder">EXPORT RESULT SET</h5>
            <p className="dashboard-resultset-text">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr tempor
              invidunt.
            </p>
          </div>
          {isMobileView && (
            <div className="total-cost" id="total">
              $0
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: isMobileView ? "row" : "column",
            justifyContent: "space-evenly",
          }}
        >
          <form>
            <div>
              <input id ="email"
                className="dashboard-resultset-email-input"
                type="text"
                placeholder="Enter the email address "
              />
            </div>
            <div>
              <button
                className="dashboard-resultset-email-btn"
                type="button"
                // class="result_next_btn btn btn-contained btn-small"
                style={{
                  width: "100%",
                  height: "48px",
                  background: "#000000 0% 0% no-repeat padding-box",
                  borderRadius: "24px",
                  opacity: "1",
                  color: "#FFFFFF",
                }}
                onClick={() => sendMail()}
              >
                EMAIL ME THE ESTIMATES
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="dashboard-resultset-main-container">
        <h5 className="dashboard-resultset-heder">EXPORT RESULT SET</h5>
        <p className="dashboard-resultset-text">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr tempor
          invidunt.
        </p>
        <form>
          <div>
            <input
              className="dashboard-resultset-email-input"
              type="text"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <button
              className="dashboard-resultset-email-btn"
              type="button"
              // class="result_next_btn btn btn-contained btn-small"
              style={{
                width: "265px",
                height: "48px",
                background: "#000000 0% 0% no-repeat padding-box",
                borderRadius: "24px",
                opacity: "1",
                color: "#FFFFFF",
              }}
            >
              EMAIL ME THE ESTIMATES
            </button>
          </div>
        </form>
      </div> */}
    </>
  );
};

export default Resultset;
