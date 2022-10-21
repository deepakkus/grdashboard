import { SET_USER_ID, SET_USER_TOKEN, LOGOUT } from "./types";
import { getUrlParam } from "../utils/utilsFunctions";
export const setUserIdToken = () => async (dispatch) => {
  const userID = getUrlParam("userId");
  const token = getUrlParam("token");
  dispatch({
    type: SET_USER_ID,
    payload: userID,
  });
  dispatch({
    type: SET_USER_TOKEN,
    payload: token,
  });
};
export const logout = () => async (dispatch) => {
  dispatch({
    // type: LOGOUT,
    // payload: userID,
  });
};
