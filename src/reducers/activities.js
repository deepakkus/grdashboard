import { ADD_ACTIVITY, ADD_ACTIVITY_ERROR, SET_ACTIVITIES, GET_ACTIVITIES_ERROR } from "../actions/types";

const initialState = {
  userActivities: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_ACTIVITY:
      return {
        ...state,
        userActivities: state.userActivities.find((f) => f._id === payload._id)
          ? state.userActivities.map((f) => (f._id === payload._id ? payload : f))
          : [...state.userActivities, payload],
        loading: false,
      };
    case ADD_ACTIVITY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SET_ACTIVITIES:
      return {
        ...state,
        userActivities: payload[0],
      };
    case GET_ACTIVITIES_ERROR:
      return{
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
