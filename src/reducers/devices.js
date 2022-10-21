import {
  ADD_DEVICE,
  ADD_DEVICE_ERROR,
  SET_DEVICES,
  GET_DEVICES_ERROR,
  GET_DEVICES_DROPDOWN_OPTIONS,
  GET_DEVICES_DROPDOWN_OPTIONS_ERROR,
} from "../actions/types";

const initialState = {
  userDevices: [],
  UserDevicesOptions: [
    // {
    //   deviceId: "14fbedaf-1b14-49f3-93ab-f3e405ab3e0d",
    //   deviceName: "firstOne",
    //   deviceTypeId: "5ef45caeea9d8150d06a300f",
    //   userId: "1",
    //   __v: 0,
    //   _id: "5efb3e506e20a00008848f62",
    // },
  ],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_DEVICE:
      return {
        ...state,
        userDevices: state.userDevices.find((d) => d._id === payload._id)
          ? state.userDevices.map((d) => (d._id === payload._id ? payload : d))
          : [...state.userDevices, payload],
        loading: false,
      };
    case ADD_DEVICE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SET_DEVICES:
      return {
        ...state,
        userDevices: payload,
        loading: false,
      };
    case GET_DEVICES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_DEVICES_DROPDOWN_OPTIONS:
      return {
        ...state,
        UserDevicesOptions: payload,
        loading: false,
      };
    case GET_DEVICES_DROPDOWN_OPTIONS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
