import { connect } from "react-redux";
import Sensors from "../components/Page/Sensors";
import { getSensorsData } from "../actions/sensors";
import { getIdealRange } from "../actions/ranges";
import { addActivity } from "../actions/activities";

const mapStateToProps = (state) => {
  return {
    sensors: state.sensors.sensormeasures,
    title: "sensors",
    devices: state.devices,
    currentcropcycles: state.cropCycles.userCurrentCropCycles,
    lookup: state.lookup,
    userFarms: state.farms.userFarms,
    ranges: state.ranges.ranges,
  };
};

export default connect(mapStateToProps, {
  getSensorsData,
  getIdealRange,
  addActivity,
})(Sensors);
