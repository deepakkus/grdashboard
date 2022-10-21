import { SET_HEAT_FARM, GET_HEAT_FARM_ERROR } from "../actions/types";

const initialState = {
    heatMap: [],
    error: {},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
    case SET_HEAT_FARM:
      return {
        ...state,
        heatMap: [
          payload
        ],
        loading: false,
      };
    case GET_HEAT_FARM_ERROR:
      return{
        ...state,
        error: payload,
        loading: false,
      }
    default:
      return state;
  }
}
