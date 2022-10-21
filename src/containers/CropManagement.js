import { connect } from "react-redux";
import CropManagement from "../components/Page/CropManagement";
import { editCropCycle, addCropCycle } from "../actions/cropcycles";
import { addActivity } from "../actions/activities";
import { getSensorsData } from "../actions/sensors";

const mapStateToProps = (state) => {
  return {
    title: "crop-management-title", // key of translation, not the translated text
    userId: state.user.userId,
    token: state.user.token,
    userFarms: state.farms.userFarms,
    cultivationtypes: state.lookup.cultivationtypes,
    croptypes: state.lookup.croptypes,
    seedtypes: state.lookup.seedtypes,
    activitytypes: state.lookup.activities,
    userActivities: state.activities.userActivities,
    //cropcycles: state.cropCycles.userCropCycles,
    currentcropcycles: state.cropCycles.userCurrentCropCycles,
    pastcropcycles: state.cropCycles.userPastCropCycles,
    devices: state.devices,
    sensors: state.sensors.sensormeasures,
  };
};

export default connect(mapStateToProps, {
  editCropCycle,
  addCropCycle,
  addActivity,
  getSensorsData,
})(CropManagement);
