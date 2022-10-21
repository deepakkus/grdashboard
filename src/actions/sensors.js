import axios from "axios";

import { GET_SENSORS_DATA, GET_SENSORS_DATA_ERROR } from "./types";

// import prepareWeatherData from "../../utils/prepareWeatherData";

// Get weatherData for dashboard
export const getSensorsData = (ids) => async (dispatch) => {
  try {
    const res = await axios.post("https://api.sensegrass.com/devices/records", {
      ids: ids,
    });
    dispatch({
      type: GET_SENSORS_DATA,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SENSORS_DATA_ERROR,
      payload: err.response,
      // payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
