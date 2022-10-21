import axios from "axios";

import {
  GET_HISTORY_DATA_7D_,
  GET_HISTORY_DATA_7D_ERROR,
  GET_HISTORY_DATA_1M_,
  GET_HISTORY_DATA_1M_ERROR,
  GET_HISTORY_DATA_1Y_,
  GET_HISTORY_DATA_1Y_ERROR,
} from "./types";

export const getHistoryData_7D = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `
        https://8lq68nbfs5.execute-api.us-east-1.amazonaws.com/default/user_device_summary/demo_farm_1/7d
      
      
      `
    );

    dispatch({
      type: GET_HISTORY_DATA_7D_,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_HISTORY_DATA_7D_ERROR,
      payload: { msg: err.response },
    });
  }
};

export const getHistoryData_1M = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://8lq68nbfs5.execute-api.us-east-1.amazonaws.com/default/user_device_summary/demo_farm_1/1m`
    );
    dispatch({
      type: GET_HISTORY_DATA_1M_,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_HISTORY_DATA_1M_ERROR,
      payload: { msg: err.response },
    });
  }
};

export const getHistoryData_1Y = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://8lq68nbfs5.execute-api.us-east-1.amazonaws.com/default/user_device_summary/demo_farm_1/1y`
    );
    dispatch({
      type: GET_HISTORY_DATA_1Y_,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_HISTORY_DATA_1Y_ERROR,
      payload: { msg: err.response },
    });
  }
};







// https://api.sensegrass.com/device_summary/farm-device-summary/demo_farm_1/7d