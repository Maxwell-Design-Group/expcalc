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

export const getMasterData = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/getmasterdata")
      .then((response) => {
        dispatch(getMaster(response));
      })
      .catch((error) => {});
  };
};
