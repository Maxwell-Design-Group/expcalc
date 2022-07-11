import axios from "axios";
import Store from "../Redux/Store";

import Alert from "../Components/Alert/Alert";
import { completedSteps, nextAccordionOpen } from "../Redux/Actions";

class ClientDetailService {
  accordianId = Store.getState.Reducer;

  sendData(data, accordianId) {
    axios
      .post("http://localhost:4200/clientdetails/add/post", data)
      .then((response) => {
        Alert.success("ClientDetail added successfully");
        console.log(
          "current id" + accordianId + "response",
          response + "next acc" + accordianId + 1
        );
        Store.dispatch(completedSteps(accordianId - 1));
        Store.dispatch(nextAccordionOpen(accordianId));
      })
      .catch((error) => {});
  }

  updateDate(data, id) {
    axios
      .post("http://localhost:4200/clientdetails/update/" + id, data)
      .then((response) => {
        this.asetState({
          clientdetails: response.data,
        });
      })
      .catch((error) => {});
  }

  deleteData(id) {
    axios
      .get("http://localhost:4200/clientdetails/delete/" + id)
      .then(() => {})
      .catch((error) => {});
  }
}

export default ClientDetailService;
