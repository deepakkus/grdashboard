const turf = require("@turf/turf");
const axios = require("axios");

export const fillSelect = (optionsType, optionsData) => {
  if (optionsType && optionsData && optionsData.length) {
    const options = [];
    for (const index in optionsData) {
      const selectOption = {
        key: optionsData[index]._id,
        value: optionsData[index]._id,
        text: optionsData[index].name,
      };
      options.push(selectOption);
    }
    return options;
  } else {
    return [{ key: 0, value: "No Options", text: "No Options" }];
  }
};

export const calculateArea = (polygonLatLng) => {
  // eg: polygon is of format : [[[125, -15], [113, -22], [154, -27], [144, -15], [125, -15]]]
  const polygon = turf.polygon(polygonLatLng);
  return turf.area(polygon);
};

export const isNotValidNumber = (number) => {
  if (number === null || number === "" || isNaN(parseFloat(number))) {
    return true;
  }
  return false;
};

const getUrlVars = () => {
  const vars = {};
  const parts = window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    }
  );
  return vars;
};

export const getUrlParam = (parameter, defaultvalue) => {
  let urlparameter = defaultvalue || "";
  if (window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter];
  }
  return urlparameter;
};

export const isInsideFarm = (farmLoc, deviceLoc) => {
  const pt = turf.point(deviceLoc);
  const poly = turf.polygon([farmLoc]);
  return turf.booleanPointInPolygon(pt, poly);
};

export const getPlantName = async (userFarms, markerLoc, cropTypes) => {  
  const farm = userFarms.find((farm) => isInsideFarm(farm.location, markerLoc));
  if (farm) {    
    const farmId = farm._id;    
    const cropCyles = await axios.get(
      `${process.env.REACT_APP_API_URL}/cropcycle/${farmId}`      
    );
    const data = cropCyles.data;
    if (data[0] && data[0].cropSeeds && data[0].cropSeeds[0]) {
      const cropId = cropCyles.data[0].cropSeeds[0].cropId;    
      const cropType = cropTypes.filter((cropType) => cropType._id === cropId);
      const scientificPlantName = cropType[0].scientificName;    
      return scientificPlantName;
    } else {
      return 'generic';
    }    
  }
  return "";
};