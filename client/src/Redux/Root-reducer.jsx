import { combineReducers } from "redux";
import DashboardReducer from "./DashboardReducer";
import MasterDataReducer from "./MasterDataReducer";

// Combined All Reducers

const rootReducer = combineReducers({
  Reducer: DashboardReducer,
  Master: MasterDataReducer,
});

export default rootReducer;
