import { GET_SENSORS_DATA, GET_SENSORS_DATA_ERROR } from "../actions/types";

const initialState = {
  // sensormeasures: [],
  sensormeasures: [
    // {
    //   location: {
    //     longitude: "_",
    //     latitude: "_",
    //   },
    //   deviceId: "_",
    //   level0: {
    //     airTemp: "_",
    //     humidity: "_",
    //     solarRad: "_",
    //   },
    //   level1: {
    //     salinity: "_",
    //     soilTemp: "_",
    //     "evapotranspiration(ET)": "_",
    //     potassium: "_",
    //     nitrogen: "_",
    //     pH: "_",
    //     respiration: "_",
    //     moisture: "_",
    //     pressure: "_",
    //     phosphorus: "_",
    //   },
    //   device: {
    //     hw_version: "_",
    //     software_version: "_",
    //     battery: "_",
    //     signal: "_",
    //     uptime: "_",
    //   },
    //   level2: {
    //     salinity: "_",
    //     soilTemp: "_",
    //     potassium: "_",
    //     nitrogen: "_",
    //     pH: "_",
    //     aeration: "_",
    //     moisture: "_",
    //     pressure: "_",
    //     phosphorus: "_",
    //   },
    //   timestamp: "_",
    //   level3: {
    //     salinity: "_",
    //     soilTemp: "_",
    //     potassium: "_",
    //     nitrogen: "_",
    //     pH: "_",
    //     moisture: "_",
    //     pressure: "_",
    //     phosphorus: "_",
    //   },
    // },
  ],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SENSORS_DATA:
      return {
        ...state,
        sensormeasures: payload,
        loading: false,
      };
    case GET_SENSORS_DATA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
