import axios from "axios";
import Store from "../Redux/Store";

import Alert from "../Components/Alert/Alert";
import { completedSteps, nextAccordionOpen } from "../Redux/Actions";
class WinthemeDetailService {
  sendData(data, accordianId) {
    axios
      .post("https://expcalc-dev.herokuapp.com/winthemedetails/add/post", data)
      .then((response) => {
        Alert.success("WinthemeDetail added successfully");
        Store.dispatch(completedSteps(accordianId));
        Store.dispatch(nextAccordionOpen(accordianId + 1));
      })
      .catch((error) => {});
  }

  updateDate(data, id) {
    axios
      .post(
        "https://expcalc-dev.herokuapp.com/winthemedetails/update/" + id,
        data
      )
      .then((response) => {
        this.asetState({
          winthemedetails: response.data,
        });
      })
      .catch((error) => {});
  }

  deleteData(id) {
    axios
      .get("https://expcalc-dev.herokuapp.com/winthemedetails/delete/" + id)
      .then(() => {})
      .catch((error) => {});
  }
}

export default WinthemeDetailService;
