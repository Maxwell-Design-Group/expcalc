import * as types from "./ActionType";

//defining initial state of application
const initialState = {
  accordionId: 0,
  completedSteps:[],
};

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NEXT_ACCORDION:
      return {
        ...state,
        accordionId:action.payload,
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
          completedSteps: [...state.completedSteps,action.payload],
        };
    default:
      return state;
  }
};

export default DashboardReducer;
