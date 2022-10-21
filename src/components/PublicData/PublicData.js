import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getWeatherData } from "../../actions/weather";
import { useTranslation } from "react-i18next";
import { Loader , Grid, Container} from "semantic-ui-react";
import "../../utils/css/weather-icons.css";
import "./PublicData.scss";
import WeatherDisplay from "react-weather-display";
import MainButton from "../MainButton/MainButton";

// import { useTranslation } from "react-i18next";

// const weatherIcons = {
//   Thunderstorm: "wi-thunderstorm",
//   Drizzle: "wi-sleet",
//   Rain: "wi-storm-showers",
//   Snow: "wi-snow",
//   Atmosphere: "wi-fog",
//   Clear: "wi-day-sunny",
//   Clouds: "wi-day-fog",
// };

const  PublicData = (props) =>{
  // weatherData = null;
  // TODO get latlng from browser location if not found
  // transltion i18next
  const { t } = useTranslation("public-data");
  let polygon = props.userFarms[0].location;
  // console.log(polygon)
  const { weatherData, getWeatherData, latlng, className, gisclassName } = props
  const DetailWeather = weatherData[0];
  console.log(DetailWeather)
  // DetailWeather ? setApi(true) : setApi(false)
  const Min_Air_Temp = DetailWeather ? DetailWeather.Temp_air_min.toFixed(2) : DetailWeather
  const Max_Air_Temp = DetailWeather ? DetailWeather.Temp_air_max.toFixed(2) : DetailWeather
  const Rel_Humidity = DetailWeather ? DetailWeather.Rel_humidity.toFixed(2) : DetailWeather
  const Min_Land_Temp = DetailWeather ? DetailWeather.Temp_land_min.toFixed(2) : DetailWeather;
  const Max_Land_Temp = DetailWeather ? DetailWeather.Temp_land_max.toFixed(2) : DetailWeather
  const Rain_det = DetailWeather ? DetailWeather.Rain : DetailWeather
  const snow_depth = DetailWeather ? DetailWeather.Snow_depth : DetailWeather
  const Wind_det = DetailWeather ? DetailWeather.Windspeed : DetailWeather
  // console.log(Min_Air_Temp, Max_Air_Temp, Rain_det, Rel_Humidity)
  // console.log(DetailWeather)
  // weather Icon function
  // const [iconState, setIconState] = useState({ icon: "wi-day-sunny" });
  // console.log("routeID", match.params.id);
  // console.log("top", weatherData);

  // get the right weather Icon depnds on the randeId
  // const get_WeatherIcon = (icons, rangeId) => {
  //   switch (true) {
  //     case rangeId >= 200 && rangeId < 232:
  //       setIconState({ icon: icons.Thunderstorm });
  //       break;
  //     case rangeId >= 300 && rangeId <= 321:
  //       setIconState({ icon: icons.Drizzle });
  //       break;
  //     case rangeId >= 500 && rangeId <= 521:
  //       setIconState({ icon: icons.Rain });
  //       break;
  //     case rangeId >= 600 && rangeId <= 622:
  //       setIconState({ icon: icons.Snow });
  //       break;
  //     case rangeId >= 701 && rangeId <= 781:
  //       setIconState({ icon: icons.Atmosphere });
  //       break;
  //     case rangeId === 800:
  //       setIconState({ icon: icons.Clear });
  //       break;
  //     case rangeId >= 801 && rangeId <= 804:
  //       setIconState({ icon: icons.Clouds });
  //       break;
  //     default:
  //       setIconState({ icon: icons.Clouds });
  //   }
  // };

  const changeLogo = (image) => {
    switch(image){
      case "cloudy":
        return "cloudy";
        break;
      case "partly_cloudy":
        return "cloudy";
        break;
      case "mostly_cloudy":
        return "cloudy";
        break;
      case "mostly_clear":
        return "sunny";
        break;
      case "clear":
        return "sunny";
        break;
      case "fog":
        return "cloudy";
        break;
      case "fog_light":
        return "sunny";
        break;
      case "drizzle":
        return "cloudy";
        break;
      case "rain_light":
        return "rainy";
        break;
      case "rain":
        return "rainy";
        break;
      case "rain_heavy":
        return "rainy";
        break;
      case "tstorm":
        return "rainy";
        break;
      case "flurries":
        return "rainy";
        break;
      case "snow_light":
        return "snowy";
        break;
      case "snow":
        return "snowy";
        break;
      case "snow_heavy":
        return "snowy";
        break;
      case "ice_pallets_light":
        return "rainy";
        break;
      case "ice_pallets_heavy":
        return "rainy";
        break;
      case "ice_pallets":
        return "rainy";
        break;
      case "freezing_drizzle":
        return "snowy";
        break;
      case "freezing_rain_light":
        return "rainy";
        break;
      case "freezing_rain":
        return "rainy";
        break;
      case "freezing_rain_heavy":
        return "rainy";
        break;
      default:
        return "cloudy";
    }
  }

  useEffect(()=> {
    // getWeatherData(latlng.lat, latlng.lon);
    // get_WeatherIcon(weatherIcons, weatherData && weatherData.weatherId);
    
    !DetailWeather && getWeatherData(latlng.lat, latlng.lon, polygon)

  
  }, []);
  
  // convert to celsius func
  const calCelsius = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };

  // const { icon } = iconState;
  // if (!weatherData) {
  //   console.log('yes')
  // }
  
  
  // const precipIntensity = weatherData.precipitation ? weatherData.precipitation.value : weatherData.precipitation;
  // const humidity = weatherData.humidity ? weatherData.precipitation.value : weatherData.humidity;
  // const visibility = weatherData.visibility ? weatherData.visibility.value : weatherData.visibility;
  const temp = weatherData.temp ? weatherData.temp.value : weatherData.temp;
  // const wind_direction = weatherData.wind_direction ? weatherData.wind_direction.value : weatherData.wind_direction;
  // const wind_speed = weatherData.wind_speed ? weatherData.wind_speed.value : weatherData.wind_speed;
  const weatherDesc = weatherData.weather_code ? weatherData.weather_code.value : weatherData.weather_code;
  const main = weatherData.weather_code ? weatherData.weather_code.value : weatherData.weather_code;


  // if (!weatherData) {
  //   return <p>no data found</p>;
  //   // return <Loader active inline="centered" className="mt-4" />;
  // }


  
  
  //weather icon func
  // get_WeatherIcon(weatherIcons, weatherId);
  // const UrlID = match.params.id;

  return weatherData ? (
    <div className = {gisclassName ? gisclassName : ""}>
      <Grid className = {className ? className : `mx-0 weather-det`}>
        <Grid.Row className="ml-0">
          <Grid.Column className="ml-0" textAlign = "center">
            <Container textAlign="center" className="">
              <div className="PublicData">
                <h5>{t("Public Weather Data")}</h5>  
                <div className="weather">
                  <div className="weather-details">
                    <div className = "weather-desc">
                      <h6>
                        {weatherDesc}
                      </h6>
                      <h6>
                        {t("temp")}{` ${temp}`}&deg;C
                      </h6>
                    </div>
                    <div>
                      <i className="weatherIcon">
                        <WeatherDisplay 
                          height={140}
                          width={140}
                          currentCondition={changeLogo(main)}
                          currentTemperature={temp}
                        />
                      </i>
                    </div>
                  </div>
                  
                  <div className = "crop-weather">
                    <div className = "">
                      Air Temp: <span className = "air-temp">{ Min_Air_Temp} to {Max_Air_Temp}
                      </span>
                    </div>
                    <div>
                      <div>
                        Humidity: <span className = "air-temp">{Rel_Humidity}</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        Snow Depth: <span className = "air-temp">{snow_depth}</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        Land Temp: <span className = "air-temp">{Min_Land_Temp} to {Max_Land_Temp}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </Container>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className = "ml-0">
          <Grid.Column width = {8} className = "ml-0">
            <Container> 
              <div>
                <div>
                  <h6 className = "mb-2" style = {{fontWeight: "600"}}>
                    RAIN
                  </h6>
                </div>
                <div>
                  <p>
                    "02H" : {Rain_det ? Rain_det['02h'].toFixed(4) : Rain_det} 
                  </p>
                  <p>
                    "05H" : {Rain_det ? Rain_det['05h'].toFixed(4) : Rain_det} 
                  </p>
                  <p>
                    "08H" : {Rain_det ? Rain_det['08h'].toFixed(4) : Rain_det} 
                  </p>
                  <p>
                    "11H" : {Rain_det ? Rain_det['11h'].toFixed(4) : Rain_det} 
                  </p>
                  <p>
                    "14H" : {Rain_det ? Rain_det['14h'].toFixed(4) : Rain_det} 
                  </p>
                  <p>
                    "17H" : {Rain_det ? Rain_det['17h'].toFixed(4) : Rain_det} 
                  </p>
                  <p>
                    "20H" : {Rain_det ? Rain_det['20h'].toFixed(4) : Rain_det} 
                  </p>
                  <p>
                    "23H" : {Rain_det ? Rain_det['23h'].toFixed(4) : Rain_det}
                  </p>  
                </div>
              </div>
            </Container>
          </Grid.Column>
          <Grid.Column width = {8}> 
            <Container>
              <div>
                <div>
                  <h5 className = "mb-2" style = {{fontWeight: "600"}}>
                    WINDSPEED
                  </h5>
                </div>
                <div>
                  <p>
                    "02H" : {Wind_det ? Wind_det['02h'].toFixed(4) : Wind_det} 
                  </p>
                  <p>
                    "05H" : {Wind_det ? Rain_det['05h'].toFixed(4) : Wind_det} 
                  </p>
                  <p>
                    "08H" : {Wind_det ? Rain_det['08h'].toFixed(4) : Wind_det} 
                  </p>
                  <p>
                    "11H" : {Wind_det ? Rain_det['11h'].toFixed(4) : Wind_det} 
                  </p>
                  <p>
                    "14H" : {Wind_det ? Rain_det['14h'].toFixed(4) : Wind_det} 
                  </p>
                  <p>
                    "17H" : {Wind_det ? Rain_det['17h'].toFixed(4) : Wind_det} 
                  </p>
                  <p>
                    "20H" : {Wind_det ? Rain_det['20h'].toFixed(4) : Wind_det} 
                  </p>
                  <p>
                    "23H" : {Wind_det ? Wind_det['23h'].toFixed(4) : Wind_det}
                  </p>  
                </div>
              </div>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  ) : (
    // ""
    <Loader active inline="centered" className="mt-3" />
  );
}

const mapStateToProps = (state) => ({
  
  weatherData: state.weather.weatherData_sensor,
  sensors: state.sensors.sensormeasures,
});

export default connect(mapStateToProps, { getWeatherData })(PublicData);
