import {
  GET_WEATHER_DATA,
  GET_WEATHER_DATA_ERROE,
  GET_WEATHER_DATA_DASHBOARD,
  GET_WEATHER_DATA_DASHBOARD_ERROR,
} from "../actions/types";

const initialState = {
  weatherData_DB: {},
  weatherData_sensor: {},
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WEATHER_DATA:
      return {
        ...state,
        weatherData_sensor: payload,
        loading: false,
      };
    case GET_WEATHER_DATA_ERROE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_WEATHER_DATA_DASHBOARD:
      return {
        ...state,
        weatherData_DB: payload,
        loading: false,
      };
    case GET_WEATHER_DATA_DASHBOARD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
