import { connect } from "react-redux";
import AddDevice from "../components/Page/AddDevice/AddDevice";
import { saveDevice } from "../actions/devices";
const mapStateToProps = (state) => {
  return {
    title: "add-device",
    devicetypes: state.lookup.devicetypes,
    userId: state.user.userId,
    token: state.user.token,
    devices: state.devices,
  };
};

export default connect(mapStateToProps, {
  saveDevice,
})(AddDevice);
