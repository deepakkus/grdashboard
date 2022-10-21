import axios from "axios";

import { GET_WEATHER_DATA, GET_WEATHER_DATA_ERROE } from "./types";
// import prepareWeatherData from "../../utils/prepareWeatherData";

// Get weatherData for dashboard
// export const getWeatherDataDB = () => async (dispatch) => {
//   try {
//     // const sensor = sensors.filter((sensor) => sensor.deviceId === id)[0];
//     // const lat = sensor.location.latitude;
//     // const lon = sensor.location.longitude;
//     const lat = 66;
//     const lon = 55;
//     const res = await axios.get(
//       `https://y9yaxzh357.execute-api.us-east-1.amazonaws.com/api/weather?lat=${lat}&lng=${lon}`
//     );

//     dispatch({
//       type: GET_WEATHER_DATA_DASHBOARD,
//       // payload: res.data,
//       payload: { weatherData_DB: res.data },
//     });
//   } catch (err) {
//     dispatch({
//       type: GET_WEATHER_DATA_DASHBOARD_ERROR,
//       // payload: { msg: err.response.statusText, status: err.response.status },
//       payload: { msg: err.response },
//     });
//   }
// };

// Get weatherData for public Data
export const getWeatherData = (lat, lon, polygon) => async(dispatch) => {
  let res1;
  let res2;
  let result = {};
  console.log(polygon)
    // console.log(polygon)
    await axios.post(`${process.env.REACT_APP_EOS_WEATHER_API}`, {
      geometry: {
        type: "Polygon",
        coordinates: [polygon]
      }
    })
    .then(async (res) => {
      res1 = res.data;
      console.log(res1)
      res2 = await axios.get(
        `${process.env.REACT_APP_WEATHER_API}?lat=${lat}&lng=${lon}`
      );
      result = {...res1, ...res2.data}
      return result
    }).then((result) => {
      dispatch({
        type: GET_WEATHER_DATA,
        payload: result
      })
  
    })
    
      
    
  
}

// export const getWeatherData = (lat, lon) => async (dispatch) => {
//   try {
//     // const lat = 66;
//     // const lon = 55;
//     // https://y9yaxzh357.execute-api.us-east-1.amazonaws.com/api/weather?lat=${lat}&lng=${lon}
//     // http://localhost:5001/
//     // http://localhost:5001/weather/${lat}&${lon}
//     // const res = await axios.get(
//     //   `https://y9yaxzh357.execute-api.us-east-1.amazonaws.com/api/weather?lat=${lat}&lng=${lon}`
//     // );
//     const res = await axios.get(
//       `${process.env.REACT_APP_WEATHER_API}?lat=${lat}&lng=${lon}`
//     );
//       //console.log("---////---Weather Data----/////------");
//       //console.log(res);
//     dispatch({
//       type: GET_WEATHER_DATA,
//       payload: res.data,
//       // payload: { weatherData_sensor: res.data },
//     });
//   } catch (err) {
//     dispatch({
//       type: GET_WEATHER_DATA_ERROE,
//       payload: err.response,
//       // payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };
