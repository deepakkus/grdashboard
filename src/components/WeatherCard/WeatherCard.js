// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { compose } from "redux";
// import { withRouter } from "react-router-dom";
// import { Grid, Loader } from "semantic-ui-react";
// import Moment from "react-moment";
// import { getWeatherData } from "../../actions/weather";
// import "../../utils/css/weather-icons.css";
// //Optional include of the default css styles
// import "./weatherCard.scss";

// import {changeLogo, changeDesc} from "../../utils/prepareWeatherData"

// // import WeatherDisplay from "react-weather-display";



// function WeatherCard({ weatherData }) {
//   // console.log(match);
//   useEffect(() => {
//     // get_WeatherIcon(weatherIcons, weatherData && weatherData.weatherId);
//   }, [weatherData]);

//   // convert to celsius func
//   const calCelsius = (temp) => {
//     let cell = Math.floor(temp - 273.15);
//     return cell;
//   };

//   const temp = weatherData.temp ? weatherData.temp.value : weatherData.temp;
//   console.log("New-Temp- ",weatherData.temp ? weatherData.temp.value : weatherData.temp);
//   const time = weatherData.observation_time ? weatherData.observation_time.value : weatherData.observation_time;
//   const weatherDesc = weatherData.weather_code ? weatherData.weather_code.value : weatherData.weather_code;


//   const changeTemp = (temp) => {
//     const newTemp = temp-273.15;
//     return newTemp.toFixed(2);
//   }

//   return temp ? (
//       <Grid className="weatherCard">
//         <Grid.Row className="mx-0 top">
//           <div className="middle-section">
//             <div className={`${changeLogo(weatherDesc)} weatherIcon`}/>
//           </div>
//         </Grid.Row>
//         <Grid.Row className="mx-0 p-0 bottom" columns={2}>
          
//           <Grid.Column width={10} className="left-section">
//               <div className="weatherdesc">
//                 <h4>{changeDesc(weatherDesc)}</h4>
//               </div>
//               <div className="currtime">
//                 <h5>
//                   <Moment format="HH:mm">
//                   {time}
//                   </Moment>
//                 </h5>
//               </div>
//           </Grid.Column>

//           <Grid.Column width={6} className="right-section">
//             <div>
              
//               <h3 className='text-white text-center'>
//                 <span>{weatherData.temp ? weatherData.temp.value : weatherData.temp}&deg;</span><span>C</span>
//               </h3>
//               <h5 className="text-center">  
//                 <Moment format="DD MMM YYYY">
//                   {time}
//                 </Moment>
                
//               </h5>
              
//             </div>
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
//   ) : (
//     // ""
//     <Loader active inline="centered" className="mt-3" />
//   );
// }
// const mapStateToProps = (state) => ({
//   weatherData: state.weather.weatherData_sensor,
// });
// // export default connect(mapStateToProps, { getWeatherData })(WeatherCard);
// export default compose(
//   withRouter,
//   connect(mapStateToProps, { getWeatherData })
// )(WeatherCard);

