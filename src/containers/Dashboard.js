import { connect } from "react-redux";
import Dashboard from "../components/Page/Dashboard";
import { getSensorsData } from "../actions/sensors";
import { getWeatherData } from "../actions/weather";
import { getUserFarmCropCycles } from "../actions/cropcycles";
import { addFarm, editFarm } from "../actions/farms";
import { getIdealRange } from "../actions/ranges";
import { addActivity } from "../actions/activities";

const mapStateToProps = (state) => {
  return {
    title: "dashboard", // key of translation, not the translated text
    userId: state.user.userId,
    token: state.user.token,
    userDevices: state.devices.userDevices,
    sensors: state.sensors.sensormeasures,
    userFarms: state.farms.userFarms,
    lookup: state.lookup,
    ranges: state.ranges,
    history_data: state.history_data,
    soiltypes: state.lookup.soiltypes,
    terraintypes: state.lookup.terraintypes,
    watersources: state.lookup.watersources,
    croptypes: state.lookup.croptypes,
    cultivationtypes: state.lookup.cultivationtypes,
    activitytypes: state.lookup.activities,
    currentcropcycles: state.cropCycles.userCurrentCropCycles,
    userFarmCropCycles: state.cropCycles.userFarmCropCycle,
  };
};

export default connect(mapStateToProps, {
  getSensorsData,
  getWeatherData,
  getUserFarmCropCycles,
  addFarm,
  editFarm,
  getIdealRange,
  addActivity,
})(Dashboard);
