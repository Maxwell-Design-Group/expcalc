import * as types from "./ActionType";
import axios from "axios";
const updateAccordion = (id) => ({
  type: types.UPDATE_ACCORDION_ID,
  payload: id,
});
const next = (id) => ({
  type: types.NEXT_ACCORDION,
  payload: id,
});
const prev = (id) => ({
  type: types.PREV_ACCORDION,
  payload: id,
});

const stepsCompletion = (id) => ({
  type: types.COMPLETED_STEPS,
  payload: id,
});

const getMaster = (data) => ({
  type: types.GET_MASTER_DATA,
  payload: data,
});
const setTheme = (data) => ({
  type: types.SET_WINTHEME_DATA,
  payload: data,
});
const setClient = (data) => ({
  type: types.SET_CLIENT_DETAILS,
  payload: data,
});

const setPosData = (data) => ({
  type: types.SET_POS_DATA,
  payload: data,
});
const supportingfeatures = (data) => ({
  type: types.SET_SUPPORTING_FEATURE_DATA,
  payload: data,
});
// const setMasterData = (data) => ({
//   type: types.SET_MASTER_DATA,
//   payload: data,
// });
export const updateAccordionId = (id) => {
  return function (dispatch) {
    dispatch(updateAccordion(id));
  };
};
export const nextAccordionOpen = (id) => {
  return function (dispatch) {
    dispatch(next(id));
  };
};
export const prevAccordionOpen = (id) => {
  return function (dispatch) {
    dispatch(prev(id));
  };
};
export const completedSteps = (id) => {
  return function (dispatch) {
    dispatch(stepsCompletion(id));
  };
};
export const setWinThemes = (data) => {
  return function (dispatch) {
    dispatch(setTheme(data));
  };
};
export const setClientDetails = (data) => {
  return function (dispatch) {
    dispatch(setClient(data));
  };
};

export const getSupportingQuestionDetails = (data) => {
  console.log("posData ", data);

  return function (dispatch) {
    let posObj = {
      population: data.population,
      customisableconvenience: data.customisableconvenience,
      customisableconvenienceoption:
        data.customisableconvenienceoption === undefined
          ? ""
          : data.customisableconvenienceoption,
      mobile: data.mobile === undefined ? "" : data.mobile,
      kiosk: data.kiosk === undefined ? "" : data.kiosk,
      selfcheckout: data.selfCheckout === undefined ? "" : data.selfCheckout,
      cashier: data.cashier === undefined ? "" : data.cashier,
    };
    let catering = "";
    if (data.catering.length > 0) {
      catering = data.catering.split(" ");
    }
    let sfObj = {
      digitalSignage: {
        50: data.digitalsignage50 === undefined ? "" : data.digitalsignage50,
        55: data.digitalsignage55 === undefined ? "" : data.digitalsignage55,
        65: data.digitalsignage65 === undefined ? "" : data.digitalsignage65,
      },

      catering: catering,
    };
    console.log("posObj ", posObj);

    axios
      .post("https://expcalc-dev.herokuapp.com/pos", posObj)
      .then((response) => {
        console.log("response ", response);
        dispatch(setPosData(response.data.pos));
      })
      .catch((error) => {});
    axios
      .post("https://expcalc-dev.herokuapp.com/supportingfeatures", sfObj)
      .then((response) => {
        console.log("response ", response);
        dispatch(supportingfeatures(response.data));
      })
      .catch((error) => {});
  };
};

export const getMasterData = () => {
  return function (dispatch) {
    axios
      .get("https://expcalc-dev.herokuapp.com/master")
      .then((response) => {
        dispatch(getMaster(response.data));
      })
      .catch((error) => {});
  };
};
