import * as types from "./ActionType";

//defining initial state of application
const initialState = {
  masterData: {},
};

const MasterDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MASTER_DATA:
      return {
        ...state,
        masterData: action.payload,
      };
    case types.SET_MASTER_DATA:
      return {
        ...state,
        masterData: action.payload,
      };
    default:
      return state;
  }
};

export default MasterDataReducer;
