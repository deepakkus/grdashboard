import axios from "axios";

import { ADD_ACTIVITY, ADD_ACTIVITY_ERROR, SET_ACTIVITIES, GET_ACTIVITIES_ERROR, SET_APP_LOADING } from "../actions/types";

export const addActivity = (activity, userId, token) => async (dispatch) => {
  try {
    const res = await axios.post(
      ` ${process.env.REACT_APP_API_URL}/cropcycleactivity`,
      activity,
      {
        headers: {
          Authorization: `Bearer ${token} ${userId}`,
        }
      }
    );
    console.log(res.data)
    dispatch({
      type: ADD_ACTIVITY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_ACTIVITY_ERROR,
      payload: err.response,
    });
  }
};

//Not Working To be checked
export const getUserActivities = (currentCropCycles, userId, token) => async (dispatch) => {
    const currentCropCyclesIds = [];
    currentCropCycles.map(cc => {
     cc ? (currentCropCyclesIds.find((c) => c === cc._id) ? (console.log("duplicate")) : 
     (cc._id ? (currentCropCyclesIds.push(cc._id))
     : (console.log("_id not defined", cc)))
     )
      : (console.log("fromaction", cc))   
    }); 
    if(currentCropCyclesIds.length >0){
        try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/cropcycleactivity/all`,
        currentCropCyclesIds,
        {
            headers: {
            Authorization: `Bearer ${token} ${userId}`,
            }
        });
        dispatch({
            type: SET_ACTIVITIES,
            payload: res.data,
        });
        dispatch({
            type: SET_APP_LOADING,
            payload: false,
        });
        } catch (err) {
        dispatch({
            type: GET_ACTIVITIES_ERROR,
            payload: { msg: err.response },
        });
        }
    }
}
