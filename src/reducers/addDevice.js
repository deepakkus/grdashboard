import { ADD_DEVICE, ADD_DEVICE_ERROR } from "../actions/types";

const initialState = {
  device: {},
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_DEVICE:
      return {
        ...state,
        device: payload,
        loading: false,
      };
    case ADD_DEVICE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
