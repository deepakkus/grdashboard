import axios from "axios";

import {
  ADD_CROPCYCLE,
  ADD_CROPCYCLE_ERROR,
  // SET_CROPCYCLES,
  SET_SORTEDCROPCYCLES,
  GET_CROPCYCLES_ERROR,
  SET_APP_LOADING,
  GET_USER_FARM_CROPCYCLES,
  GET_USER_FARM_CROPCYCLES_ERROR,
  UPDATE_CROPCYCLE, UPDATE_CROPCYCLE_ERROR,
} from "./types";
import { updateFarmCrop } from "../services/farm";

export const addCropCycle = (cropCycle, userId, token) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/cropcycle`,
      // `http://localhost:4000/cropcycle/`,
      cropCycle,
      {
        headers: {
          Authorization: `Bearer ${token} ${userId}`,
        },
      }
    );
    if (res && res.data && res.data._id){
      updateFarmCrop(res.data._id);
    }
    dispatch({
      type: ADD_CROPCYCLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_CROPCYCLE_ERROR,
      payload: err.response,
    });
  }
};

export const editCropCycle = (cropCycle, userId, token) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/cropcycle`,
      cropCycle,
      {
        headers: {
          Authorization: `Bearer ${token} ${userId}`,
        },
      }
    );
    if (res && res.data && res.data._id){
      updateFarmCrop(res.data._id);
    }
    dispatch({
      type: UPDATE_CROPCYCLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_CROPCYCLE_ERROR,
      payload: err.response,
    });
  }
};

// export const getUserCropCycles = (userFarms, token, userId) => async (dispatch) => {
//     const farmsIds = [];
//     userFarms.map(uFarm => {
//      uFarm ? (farmsIds.find((farmId) => farmId === uFarm) ? (console.log("duplicate")) : 
//      (uFarm._id ? (farmsIds.push(uFarm._id))
//      : (console.log("_id not defined", uFarm)))
//      )
//       : (console.log("fromaction", uFarm))   
//     })
//     try {
//     // const res = await axios.post(`${process.env.API_LOCAL_DB}/cropcycle/all`, farmsIds);
//     const res = await axios.post(`http://localhost:4000/cropcycle/all`, farmsIds, 
//     {
//       headers: {
//         Authorization: `Bearer ${token} ${userId}`,
//       }
//     });
//     dispatch({
//       type: SET_CROPCYCLES,
//       payload: res.data,
//     });
//     dispatch({
//       type: SET_APP_LOADING,
//       payload: false,
//     });
//   } catch (err) {
//     dispatch({
//       type: GET_CROPCYCLES_ERROR,
//       payload: { msg: err.response },
//     });
//   }
// };

export const getUserSortedCropCycles = (userFarms, userId, token) => async (dispatch) => {
  const farmsIds = [];
    userFarms.map(uFarm => {
     uFarm ? (farmsIds.find((farmId) => farmId === uFarm) ? (console.log("duplicate")) : 
     (uFarm._id ? (farmsIds.push(uFarm._id))
     : (console.log("_id not defined", uFarm)))
     )
      : (console.log("fromaction", uFarm))   
    })    
    try {
      if (farmsIds.length) {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/cropcycle/all`,
        // const res = await axios.post(`http://localhost:4000/cropcycle/all`,
        farmsIds,
        {
          headers: {
            Authorization: `Bearer ${token} ${userId}`,
          }
        });
        dispatch({
          type: SET_SORTEDCROPCYCLES,
          // payload: res,
          payload: res.data,
        });
        dispatch({
          type: SET_APP_LOADING,
          payload: false,
        });
      }    
  } catch (err) {
    dispatch({
      type: GET_CROPCYCLES_ERROR,
      payload: { msg: err.response },
    });
  }
};
export const getUserFarmCropCycles = (farmID, userId, token) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      `https://7exe1aor1a.execute-api.us-east-1.amazonaws.com/dev/cropcycle/${farmID}`,
      {
        headers: {
          Authorization: `Bearer ${token} ${userId}`,
        },
      }
    );
    dispatch({
      type: GET_USER_FARM_CROPCYCLES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_FARM_CROPCYCLES_ERROR,
      payload: { msg: err.response },
    });
  }
};
