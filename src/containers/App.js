import { connect } from "react-redux";
import App from "../components/App";
import { getLookupData } from "../actions/lookup";
import { setUserIdToken } from "../actions/user";
import { getUserDevices } from "../actions/devices";
import { getUserFarms } from "../actions/farms";
import { getUserActivities } from "../actions/activities";
//getUserCropCycles,
import { getUserSortedCropCycles } from "../actions/cropcycles";
import { getIdealRange } from "../actions/ranges";
import { getSensorsData } from "../actions/sensors";

import {
  getHistoryData_7D,
  getHistoryData_1M,
  getHistoryData_1Y,
} from "../actions/history_data";

const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
    token: state.user.token,
    userFarms: state.farms.userFarms,
    //userCropCycles: state.cropCycles.userCropCycles,
    userCurrentCropCycles: state.cropCycles.userCurrentCropCycles,
    userPastCropCycles: state.cropCycles.userPastCropCycles,
    appLoading: state.user.appLoading,
    devices: state.devices,
  };
};

export default connect(mapStateToProps, {
  getLookupData,
  setUserIdToken,
  getUserDevices,
  getUserFarms,
  //getUserCropCycles,
  getUserSortedCropCycles,
  getIdealRange,
  getHistoryData_7D,
  getHistoryData_1M,
  getHistoryData_1Y,
  getUserActivities,
  getSensorsData,
})(App);
