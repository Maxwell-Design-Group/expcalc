import * as types from "./ActionType";

//defining initial state of application
const initialState = {
  accordionId: 0,
  completedSteps: [],
  themes: [],
  clientDetails: {},
};

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NEXT_ACCORDION:
      return {
        ...state,
        accordionId: action.payload,
      };
    case types.UPDATE_ACCORDION_ID:
      return {
        ...state,
        accordionId: action.payload,
      };
    case types.PREV_ACCORDION:
      return {
        ...state,
        accordionId: action.payload,
      };
    case types.COMPLETED_STEPS:
      return {
        ...state,
        completedSteps: [...state.completedSteps, action.payload],
      };
    case types.GET_WINTHEME_DATA:
      return {
        ...state,
        themes: action.payload,
      };
    case types.SET_WINTHEME_DATA:
      return {
        ...state,
        themes: action.payload,
      };
    case types.SET_CLIENT_DETAILS:
      return {
        ...state,

        clientDetails: action.payload,
      };
    default:
      return state;
  }
};

export default DashboardReducer;
