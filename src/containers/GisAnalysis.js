import { connect } from "react-redux";
import GisAnalysis from "../components/Page/GisAnalysis";
// import { getUserFarms, getHeatMapData } from "../actions/farms";
import { getHeatMapData, getLinkForImage } from "../actions/heatmap";
import { getWeatherData } from "../actions/weather";

const mapStateToProps = (state) => {
  return {
    title: "gisAnalysis", // key of translation, not the translated text
    userId: state.user.userId,
    userFarms: state.farms.userFarms,
    heatMap: state.heatmap.heatMap,
    sensors: state.sensors.sensormeasures,
  };
};

export default connect(mapStateToProps, {getHeatMapData,getWeatherData, getLinkForImage})(
  GisAnalysis
);
