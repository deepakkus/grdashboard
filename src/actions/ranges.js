import axios from "axios";

import { GET_IDEAL_RANGES, GET_IDEAL_RANGES_ERROR } from "./types";

export const getIdealRange = (plant) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://api.sensegrass.com/plant-card/ranges?plant=${plant}`
    );
    dispatch({
      type: GET_IDEAL_RANGES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_IDEAL_RANGES_ERROR,
      payload: { msg: err.response },
    });
  }
};
