import axios from "axios";

import { SET_LOOKUP_DATA, GET_LOOKUP_DATA_ERROR } from "./types";

export const getLookupData = (userId, token) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/lookup`,
    {
      headers: {
        Authorization: `Bearer ${token} ${userId}`,
      }
    });
    dispatch({
      type: SET_LOOKUP_DATA,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_LOOKUP_DATA_ERROR,
      payload: { msg: err.response },
    });
  }
};
