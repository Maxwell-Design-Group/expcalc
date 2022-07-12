import { combineReducers } from "redux";
import DashboardReducer from "./DashboardReducer";

// Combined All Reducers

const rootReducer = combineReducers({
    Reducer:DashboardReducer,
  
});

export default rootReducer;
