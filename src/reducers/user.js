import {
  SET_USER_ID,
  SET_USER_TOKEN,
  SET_APP_LOADING,
  LOGOUT,
} from "../actions/types";
// TODO add userid and token to browser storage so the browser refresh has it and set as initial state

const initialState = {
  userId: window.localStorage.getItem("userId"),
  token: window.localStorage.getItem("token"),
  // userId : window.localStorage.setItem("userId", "5f40f65221a63e0008d84ef5"),
  // token : window.localStorage.setItem("token", "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI1ZjQwZjY1MjIxYTYzZTAwMDhkODRlZjUiLCJpYXQiOjE2MTg2ODkzMzEsImV4cCI6MTYxODc3NTczMX0.CzcjkXaa6yuHFA-Gk07HEaVZiW5lr8FSeJ9N__z5ETIHrVVi5XWG27YJ0Zs72ZcZvAgs4oeRfRrtXG6Q1_cLrF5fH4VgbMGK_5h75rUiuwL9-tQ9ag4c1vqSH8SxRTj8F2xD-FW0ofCtP_HobNRgDsaMBGiye3J9uYlpVAxvng-4JbM5HeSbJ88lu8kHEzp0WuHAOnxRlrKA5eaKDx0XJVpSkGW6LP2XhVn-YQwAwfqSOyIh9O8LOcK-1HiOnHfl-VtNwYJlBqi06p4I36aKzMNz4u1p5ToK5anqzs0xvPWSkJ-ktDKPx9htXvkNtdUnVn1jmEbHYbZCiqnt01Xncw"),
  appLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_ID:
      window.localStorage.setItem("userId", payload);
      return {
        ...state,
        userId: payload,
        // appLoading: false
      };
    case SET_USER_TOKEN:
      window.localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload,
      };
    case LOGOUT:
      window.localStorage.clear();
      return {
        ...state,
        userId: "",
        token: "",
      };
    case SET_APP_LOADING:
      return {
        ...state,
        appLoading: payload,
      };
    default:
      return state;
  }
}
