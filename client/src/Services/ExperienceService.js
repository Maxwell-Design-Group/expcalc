import axios from "axios";
import Store from "../Redux/Store";

import Alert from "../Components/Alert/Alert";
import {
  completedSteps,
  getSupportingQuestionDetails,
  nextAccordionOpen,
  setClientDetails,
} from "../Redux/Actions";
class ExperienceService {
  sendData(data, accordianId, clientDetails) {
    axios
      .put(
        "https://expcalc-dev.herokuapp.com/client/" + clientDetails._id,
        data
      )
      .then((response) => {
        console.log("data", data);
        console.log("clientDetails", clientDetails);
        // Alert.success("WinthemeDetail added successfully");
        Store.dispatch(setClientDetails(response.data));

        Store.dispatch(completedSteps(accordianId));
        Store.dispatch(nextAccordionOpen(accordianId + 1));
        Store.dispatch(getSupportingQuestionDetails(data));
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

export default ExperienceService;