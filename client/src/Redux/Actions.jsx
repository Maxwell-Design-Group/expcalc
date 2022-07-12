import * as types from "./ActionType";

const updateAccordion = (id) => ({
  type: types.UPDATE_ACCORDION_ID,
  payload:id,

});
const next = (id) => ({
  type: types.NEXT_ACCORDION,
  payload:id,

});
const prev = (id) => ({
  type: types.PREV_ACCORDION,
  payload:id,
});

const stepsCompletion = (id) => ({
  type: types.COMPLETED_STEPS,
  payload:id,
});

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
