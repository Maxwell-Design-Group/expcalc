import axios from "axios";
import Store from "../Redux/Store";
import Alert from "../Components/Alert/Alert";
import { completedSteps, nextAccordionOpen, setClientDetails,  } from "../Redux/Actions";
class ClientDetailService {
  accordianId = Store.getState.Reducer;

  

  sendData(data, accordianId) {
    axios
      .post("https://expcalc-dev.herokuapp.com/client", data)
      .then((response) => {
        Alert.success("ClientDetail added successfully");
        console.log(response);
        console.log(
          "current id" + accordianId + "response",
          response + "next acc" + accordianId + 1
        );
        Store.dispatch(completedSteps(accordianId - 1));
        Store.dispatch(nextAccordionOpen(accordianId));
        Store.dispatch(setClientDetails(data));

        
      })
      .catch((error) => {});
  }

  updateData(data, id) {
    axios
      .post(
        "https://expcalc-dev.herokuapp.com/client/" + id,
        data
      )
      .then((response) => {
        this.asetState({
          clientdetails: response.data,
        });
      })
      .catch((error) => {});
  }

  deleteData(id) {
    axios
      .get("https://expcalc-dev.herokuapp.com/client/" + id)
      .then(() => {})
      .catch((error) => {});
  }

  getData(id) {
    axios
      .get("https://expcalc-dev.herokuapp.com/client")
      .then((response) => {      
        console.log(response[response.length]);
        
          return response[response.length];
        
      })
      .catch((error) => {});
  }

}



export default ClientDetailService;
