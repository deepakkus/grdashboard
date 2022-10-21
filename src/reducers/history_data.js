import {
  GET_HISTORY_DATA_7D_,
  GET_HISTORY_DATA_7D_ERROR,
  GET_HISTORY_DATA_1M_,
  GET_HISTORY_DATA_1M_ERROR,
  GET_HISTORY_DATA_1Y_,
  GET_HISTORY_DATA_1Y_ERROR,
} from "../actions/types";

const initialState = {
  history_data_7d: [],
  history_data_1M: [],
  history_data_1Y: [],
  error: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_HISTORY_DATA_7D_:
      return {
        ...state,
        history_data_7d: payload,
        loading: false,
      };
    case GET_HISTORY_DATA_7D_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_HISTORY_DATA_1M_:
      return {
        ...state,
        history_data_1M: payload,
        loading: false,
      };
    case GET_HISTORY_DATA_1M_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_HISTORY_DATA_1Y_:
      return {
        ...state,
        history_data_1Y: payload,
        loading: false,
      };
    case GET_HISTORY_DATA_1Y_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
