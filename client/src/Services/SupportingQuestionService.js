import axios from "axios";
import Store from "../Redux/Store";
import Config from "../Config/Config.json";

import Alert from "../Components/Alert/Alert";
import {
  completedSteps,
  nextAccordionOpen,
  setClientDetails,
} from "../Redux/Actions";
class SupportingQuestionService {
  sendData(data, accordianId, clientDetails) {
    axios
      .put(Config.baseUrl + Config.client + clientDetails._id, data)
      .then((response) => {
        console.log("response", response);
        Alert.success("Okie Dokie, the estimates are on its' way!");
        Store.dispatch(setClientDetails(response.data));
        Store.dispatch(completedSteps(accordianId));
        Store.dispatch(nextAccordionOpen(accordianId));
      })
      .catch((error) => {});
  }

  updateDate(data, id) {
    axios
      .post(Config.baseUrl + Config.winthemeUpdate + id, data)
      .then((response) => {
        this.asetState({
          winthemedetails: response.data,
        });
      })
      .catch((error) => {});
  }

  deleteData(id) {
    axios
      .get(Config.baseUrl + Config.winthemeDelete + id)
      .then(() => {})
      .catch((error) => {});
  }
}

export default SupportingQuestionService;
