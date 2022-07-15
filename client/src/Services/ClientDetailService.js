import axios from "axios";
import Store from "../Redux/Store";
import Alert from "../Components/Alert/Alert";
import {
  completedSteps,
  nextAccordionOpen,
  setClientDetails,
  updateClientId,
} from "../Redux/Actions";
class ClientDetailService {
  accordianId = Store.getState.Reducer;

  sendData(data, accordianId) {
    axios
      .post("https://expcalc-dev.herokuapp.com/client", data)
      .then((response) => {
        Alert.success("ClientDetail added successfully");

        Store.dispatch(setClientDetails(response.data));
        Store.dispatch(completedSteps(accordianId - 1));
        Store.dispatch(nextAccordionOpen(accordianId));
      })
      .catch((error) => {});
  }

  updateDate(data, id) {
    axios
      .post("https://expcalc-dev.herokuapp.com/client/" + id, data)
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
      .get("http://localhost:3000/client")
      .then((response) => {
        return response[response.length];
      })
      .catch((error) => {});
  }
}

export default ClientDetailService;
