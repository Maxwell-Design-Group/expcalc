import axios from "axios";
import Store from "../Redux/Store";

import Alert from "../Components/Alert/Alert";
import {
  completedSteps,
  nextAccordionOpen,
  setClientDetails,
} from "../Redux/Actions";
class DiningExperienceService {
  sendData(data, accordianId, clientDetails) {
    axios
      .put(
        "https://expcalc-dev.herokuapp.com/client/" + clientDetails._id,
        data
      )
      .then((response) => {
        console.log("response", response);
        Alert.success("Dining Experience added successfully");
        Store.dispatch(setClientDetails(response.data));
        Store.dispatch(completedSteps(accordianId));
        Store.dispatch(nextAccordionOpen(accordianId + 1));
      })
      .catch((error) => {});
  }

  updateDate(data, id) {
    axios
      .post("https://expcalc-dev.herokuapp.com/wintheme/update/" + id, data)
      .then((response) => {
        this.asetState({
          winthemedetails: response.data,
        });
      })
      .catch((error) => {});
  }

  deleteData(id) {
    axios
      .get("https://expcalc-dev.herokuapp.com/wintheme/delete/" + id)
      .then(() => {})
      .catch((error) => {});
  }
}

export default DiningExperienceService;
