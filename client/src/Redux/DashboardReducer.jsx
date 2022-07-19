import * as types from "./ActionType";

//defining initial state of application
const initialState = {
  accordionId: 0,
  completedSteps: [],
  themes: [],
  clientDetails: {},
  posDetails: [],
  supportingFeatureDetails: [],
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
    case types.SET_POS_DATA:
      return {
        ...state,
        posDetails: action.payload,
      };
    case types.GET_POS_DATA:
      return {
        ...state,
        posDetails: action.payload,
      };
    case types.SET_SUPPORTING_FEATURE_DATA:
      return {
        ...state,
        supportingFeatureDetails: action.payload,
      };
    case types.GET_SUPPORTING_FEATURE_DATA:
      return {
        ...state,
        supportingFeatureDetails: action.payload,
      };
    default:
      return state;
  }
};

export default DashboardReducer;
