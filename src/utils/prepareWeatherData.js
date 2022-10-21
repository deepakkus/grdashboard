// import React, { useState, useEffect } from "react";

// export function prepareWeatherData({ weatherData, icon }) {
//   //   useEffect(() => {
//   //     getWeatherData();
//   //   }, [getWeatherData]);

//   const [weatherState, setWeatherState] = useState({});
//   const [iconState, setIconState] = useState({});

//   const weatherIcons = {
//     Thunderstorm: "wi-thunderstorm",
//     Drizzle: "wi-sleet",
//     Rain: "wi-storm-showers",
//     Snow: "wi-snow",
//     Atmosphere: "wi-fog",
//     Clear: "wi-day-sunny",
//     Clouds: "wi-day-fog",
//   };

//   //   get the right weather Icon depnds on the randeId
//   const get_WeatherIcon = (icons, rangeId) => {
//     switch (true) {
//       case rangeId >= 200 && rangeId < 232:
//         setIconState({ icon: icons.Thunderstorm });
//         break;
//       case rangeId >= 300 && rangeId <= 321:
//         setIconState({ icon: icons.Drizzle });
//         break;
//       case rangeId >= 500 && rangeId <= 521:
//         setIconState({ icon: icons.Rain });
//         break;
//       case rangeId >= 600 && rangeId <= 622:
//         setIconState({ icon: icons.Snow });
//         break;
//       case rangeId >= 701 && rangeId <= 781:
//         setIconState({ icon: icons.Atmosphere });
//         break;
//       case rangeId === 800:
//         setIconState({ icon: icons.Clear });
//         break;
//       case rangeId >= 801 && rangeId <= 804:
//         setIconState({ icon: icons.Clouds });
//         break;
//       default:
//         setIconState({ icon: icons.Clouds });
//     }
//   };

//   export const changeLogo = (image) => {
//     switch(image){
//       case "cloudy":
//         return weatherIcons.Clouds;
        
//       case "partly_cloudy":
//         return weatherIcons.Clouds;
//         break;
//       case "mostly_cloudy":
//         return weatherIcons.Clouds;
//         break;
//       case "mostly_clear":
//         return weatherIcons.Clear;
//         break;
//       case "clear":
//         return weatherIcons.Clear;
//         break;
//       case "fog":
//         return weatherIcons.Clouds;
//         break;
//       case "fog_light":
//         return weatherIcons.Clear;
//         break;
//       case "drizzle":
//         return weatherIcons.Drizzle;
//         break;
//       case "rain_light":
//         return weatherIcons.Drizzle;
//         break;
//       case "rain":
//         return weatherIcons.Rain;
//         break;
//       case "rain_heavy":
//         return weatherIcons.Rain;
//         break;
//       case "tstorm":
//         return weatherIcons.Thunderstorm;
//         break;
//       case "flurries":
//         return weatherIcons.Snow;
//         break;
//       case "snow_light":
//         return weatherIcons.Snow;
//         break;
//       case "snow":
//         return weatherIcons.Snow;
//         break;
//       case "snow_heavy":
//         return weatherIcons.Snow;
//         break;
//       case "ice_pallets_light":
//         return weatherIcons.Rain;
//         break;
//       case "ice_pallets_heavy":
//         return weatherIcons.Rain;
//         break;
//       case "ice_pallets":
//         return weatherIcons.Rain;
//         break;
//       case "freezing_drizzle":
//         return weatherIcons.Snow;
//         break;
//       case "freezing_rain_light":
//         return weatherIcons.Rain;
//         break;
//       case "freezing_rain":
//         return weatherIcons.Rain;
//         break;
//       case "freezing_rain_heavy":
//         return weatherIcons.Rain;
//         break;
//       default:
//         return weatherIcons.Atmosphere;
//     }
//   }

//   useEffect(async () => {
//     try {
//       getWeatherData();
//       // const lat = url.lat;
//       // const lon = url.lon;
//       const lat = 22;
//       const lon = 226;
//       const res = await axios.get(
//         `https://y9yaxzh357.execute-api.us-east-1.amazonaws.com/api/weather?lat=${lat}&lng=${lon}`
//       );
//       console.log("res", res.data);
//       setWeatherState({
//         weatherData: res.data,
//       });
//       getWeatherData(res.data);
//       get_WeatherIcon(weatherIcons, res.data.weatherId);
//     } catch (err) {
//       console.log(err);
//     }
//   }, [weatherIcons]);

//   // convert to celsius func
//   const calCelsius = (temp) => {
//     let cell = Math.floor(temp - 273.15);
//     return cell;
//   };

//   const { weatherData } = weatherState;
//   const { icon } = iconState;

//   console.log("weatherData", weatherData);
//   console.log("icon:", icon);

//   // get data from weatherData state
//   const precipIntensity = weatherData.precipIntensity;
//   const precipProbability = weatherData.precipProbability;
//   const pressure = weatherData.pressure;
//   const temp = calCelsius(weatherData.temp);
//   const wind_deg = weatherData.wind_deg;
//   const wind_speed = weatherData.wind_speed;
//   const weatherId = weatherData.weatherId;

//   //   console.log("precipIntensity", precipIntensity);

//   //weather icon func
//   // get_WeatherIcon(weatherIcons, weatherId);

//   return { weatherData, icon };
// }









{/* <Moment format="D MMM YYYY h:mm a" unix> */}
              {/* <Moment format="YYYY-MM-DD HH:mm"> */}

               {/* <i className={`wi ${icon} display-1  weatherIcon`} />
            <h4 className="pt-1">{temp}&deg;C</h4> */}

            {/* currentTemperature={weatherData.temp ? weatherData.temp.value : weatherData.temp} */}
            
            {/* <WeatherDisplay  
              height={50}
              width={120}
              // currentCondition={changeLogo(weatherData.weather_code ? weatherData.weather_code.value : weatherData.weather_code)}
              currentTemperature={weatherData.temp ? weatherData.temp.value : weatherData.temp}
            /> */}









const weatherIcons = {
  Thunderstorm: "wi wi-thunderstorm",
  Drizzle: "wi wi-sleet",
  Rain: "wi wi-storm-showers",
  Snow: "wi wi-snow",
  Atmosphere: "wi wi-fog",
  Clear: "wi wi-day-sunny",
  Clouds: "wi wi-day-fog",
};

export const changeLogo = (image) => {
  switch(image){
    case "cloudy":
      return weatherIcons.Clouds;
      
    case "partly_cloudy":
      return weatherIcons.Clouds;
      break;
    case "mostly_cloudy":
      return weatherIcons.Clouds;
      break;
    case "mostly_clear":
      return weatherIcons.Clear;
      break;
    case "clear":
      return weatherIcons.Clear;
      break;
    case "fog":
      return weatherIcons.Clouds;
      break;
    case "fog_light":
      return weatherIcons.Clear;
      break;
    case "drizzle":
      return weatherIcons.Drizzle;
      break;
    case "rain_light":
      return weatherIcons.Drizzle;
      break;
    case "rain":
      return weatherIcons.Rain;
      break;
    case "rain_heavy":
      return weatherIcons.Rain;
      break;
    case "tstorm":
      return weatherIcons.Thunderstorm;
      break;
    case "flurries":
      return weatherIcons.Snow;
      break;
    case "snow_light":
      return weatherIcons.Snow;
      break;
    case "snow":
      return weatherIcons.Snow;
      break;
    case "snow_heavy":
      return weatherIcons.Snow;
      break;
    case "ice_pallets_light":
      return weatherIcons.Rain;
      break;
    case "ice_pallets_heavy":
      return weatherIcons.Rain;
      break;
    case "ice_pallets":
      return weatherIcons.Rain;
      break;
    case "freezing_drizzle":
      return weatherIcons.Snow;
      break;
    case "freezing_rain_light":
      return weatherIcons.Rain;
      break;
    case "freezing_rain":
      return weatherIcons.Rain;
      break;
    case "freezing_rain_heavy":
      return weatherIcons.Rain;
      break;
    default:
      return weatherIcons.Atmosphere;
  }
}
export const changeDesc = (desc) => {
  switch(desc){
    case "cloudy":
      return "cloudy";
      
    case "partly_cloudy":
      return "cloudy";
      break;
    case "mostly_cloudy":
      return "cloudy";
      break;
    case "mostly_clear":
      return "clear";
      break;
    case "clear":
      return "clear";
      break;
    case "fog":
      return "fog";
      break;
    case "fog_light":
      return "fog";
      break;
    case "drizzle":
      return "drizzle";
      break;
    case "rain_light":
      return "drizzle";
      break;
    case "rain":
      return "rain";
      break;
    case "rain_heavy":
      return "heavy rain";
      break;
    case "tstorm":
      return "thunderstorm";
      break;
    case "flurries":
      return "flurry";
      break;
    case "snow_light":
      return "snow";
      break;
    case "snow":
      return "snow";
      break;
    case "snow_heavy":
      return "snow";
      break;
    case "ice_pallets_light":
      return "rain";
      break;
    case "ice_pallets_heavy":
      return "rain";
      break;
    case "ice_pallets":
      return "rain";
      break;
    case "freezing_drizzle":
      return "drizzle";
      break;
    case "freezing_rain_light":
      return "rain";
      break;
    case "freezing_rain":
      return "rain";
      break;
    case "freezing_rain_heavy":
      return "rain";
      break;
    default:
      return "Clear";
  }
}