import axios from "axios";

import {
  ADD_DEVICE,
  ADD_DEVICE_ERROR,
  SET_DEVICES,
  GET_DEVICES_ERROR,
  GET_DEVICES_DROPDOWN_OPTIONS,
  GET_DEVICES_DROPDOWN_OPTIONS_ERROR,
} from "./types";

export const saveDevice = (device, token) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/device`,
      device,
      {
        headers: {
          Authorization: `Bearer ${token} ${device.userId}`,
        },
      }
    );
    dispatch({
      type: ADD_DEVICE,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    dispatch({
      type: ADD_DEVICE_ERROR,
      payload: err.response,
      //   payload: { msg: err.response },
      // payload: { msg: err.response.statusText, status: err.response.status },
    });
    return err.response;
  }
};

export const getUserDevices = (userId, token) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/device/all/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token} ${userId}`,
        },
      }
    );
    dispatch({
      type: SET_DEVICES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_DEVICES_ERROR,
      payload: { msg: err.response },
    });
  }
};

export const getUserDevicesOptions = (userDevices, deviceTypeId) => async (
  dispatch
) => {
  try {
    const getUserDevices_Options = (userDevices, deviceTypeId) => {
      return userDevices.filter((d) => d.deviceTypeId === deviceTypeId);
    };
    const UserDevicesOptions = getUserDevices_Options(
      userDevices,
      deviceTypeId
    );
    console.log(UserDevicesOptions);

    dispatch({
      type: GET_DEVICES_DROPDOWN_OPTIONS,
      payload: UserDevicesOptions,
    });
  } catch (err) {
    dispatch({
      type: GET_DEVICES_DROPDOWN_OPTIONS_ERROR,
      payload: { msg: err.response },
    });
  }
};
