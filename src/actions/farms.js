import axios from "axios";
// import { NULL } from "node-sass";

import { ADD_FARM, ADD_FARM_ERROR, SET_FARMS, GET_FARMS_ERROR, SET_APP_LOADING } from "./types";

export const addFarm = (farm, token) => async (dispatch) => {
  try {
    const res = await axios.post(
      ` ${process.env.REACT_APP_API_URL}/farm`,
      farm,
      {
        headers: {
          Authorization: `Bearer ${token} ${farm.userId}`,
        }
      }
    );
    dispatch({
      type: ADD_FARM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_FARM_ERROR,
      payload: err.response,
    });
  }
};

export const editFarm = (farm, token) => async (dispatch) => {
    try {
      const res = await axios.put(
        ` ${process.env.REACT_APP_API_URL}/farm`,
        farm,
        {
          headers: {
            Authorization: `Bearer ${token} ${farm.userId}`,
          }
        }
      );
      dispatch({
        type: ADD_FARM,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ADD_FARM_ERROR,
        payload: err.response,
      });
    }
};

export const getUserFarms = (userId, token) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/farm/all/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token} ${userId}`,
      }
    });
    // console.log(res)
    dispatch({
      type: SET_FARMS,
      payload: res.data,
    });
    dispatch({
      type: SET_APP_LOADING,
      payload: false,
    });
  } catch (err) {
    if(err.response.status === 401)
    {
      window.location.href = process.env.REACT_APP_LOGIN_URL
    } 

    // else
    // {
      dispatch({
        type: GET_FARMS_ERROR,
        payload: { msg: err.response },
      });
    // }
  }
};

