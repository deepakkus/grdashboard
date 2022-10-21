import { ADD_FARM, ADD_FARM_ERROR, SET_FARMS, GET_FARMS_ERROR } from "../actions/types";

const initialState = {
  userFarms: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_FARM:
      return {
        ...state,
        userFarms: state.userFarms.find((f) => f._id === payload._id)
          ? state.userFarms.map((f) => (f._id === payload._id ? payload : f))
          : [...state.userFarms, payload],
        loading: false,
      };
    case ADD_FARM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SET_FARMS:
      return {
        ...state,
        userFarms: payload,

      };
    case GET_FARMS_ERROR:
      return{
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
