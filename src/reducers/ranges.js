import { GET_IDEAL_RANGES, GET_IDEAL_RANGES_ERROR } from "../actions/types";

const initialState = {
  ranges: [],
  error: {},
  loading: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_IDEAL_RANGES:
      return {
        ...state,
        ranges: payload,
        loading: false,
      };
    case GET_IDEAL_RANGES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
