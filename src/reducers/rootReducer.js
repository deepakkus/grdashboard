import { combineReducers } from "redux";
import weather from "./weather";
import sensors from "./sensors";
import lookup from "./lookup";
import devices from "./devices";
import farms from "./farms";
import user from "./user";
import cropCycles from "./cropCycles"
import ranges from "./ranges";
import history_data from "./history_data";
import heatmap from "./heatmap";
import activities from "./activities";

const rootReducer = combineReducers({
  weather,
  sensors,
  lookup,
  devices,
  farms,
  heatmap,
  cropCycles,
  user,
  ranges,
  history_data,
  activities
});

export default rootReducer;
