import { SET_LOOKUP_DATA } from "../actions/types";

const initialState = {
  activities: [],
  croptypes: [],
  cultivationtypes: [],
  devicetypes: [
    // {
    //   name: "Soil Sensor",
    //   _id: "5ef45caeea9d8150d06a300f",
    // },
  ],
  seedtypes: [],
  soiltypes: [],
  terraintypes: [],
  watersources: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOOKUP_DATA:
      return {
        ...state,
        activities: payload.activities,
        croptypes: payload.croptypes,
        cultivationtypes: payload.cultivationtypes,
        devicetypes: payload.devicetypes,
        seedtypes: payload.seedtypes,
        soiltypes: payload.soiltypes,
        terraintypes: payload.terraintypes,
        watersources: payload.watersources,
      };

    default:
      return state;
  }
}
