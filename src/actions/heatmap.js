import axios from "axios";

import { SET_HEAT_FARM, GET_HEAT_FARM_ERROR, GET_IMAGE_LINK, GET_IMAGE_LINK_ERROR} from "./types";
// import { Result } from "antd";

export const getHeatMapData = (aoi, indices, farmId, farm, token) => async (dispatch) => {
    try{
      const res = await axios.post(`${process.env.REACT_APP_GIS_URL}/gis/images`,{
        "aoi": aoi,
        "indices": indices,
        "farmId": farmId
      },
      // {
      //   headers: {
      //     Authorization: `Bearer ${token} ${farm.userId}`,
      //   }
      // }
      );
      // console.log("Here on api heatmap-- ",aoi,indices,farmId);
      dispatch({
        type: SET_HEAT_FARM,
        payload: {
          data: res.data,
          farmId: farmId
        }
      });
      return res.data;
    }
    catch (err) {
      dispatch({
        type: GET_HEAT_FARM_ERROR,
        payload:  {msg: err.response}
      });
      return err;
    }
  };
  
export const getLinkForImage = (image, userId, token) => async (dispatch) => {
    try{
      const res = await axios.post(`${process.env.REACT_APP_GIS_URL}/gis/image`,{
        "image": image
      },
      // {
      //   headers: {
      //     Authorization: `Bearer ${token} ${farm.userId}`,
      //   }
      // }
      );
      dispatch({
        type: GET_IMAGE_LINK,
        payload: res.data
      });
      return res.data;
    }
    catch (err) {
      dispatch({
        type: GET_IMAGE_LINK_ERROR,
        payload:  {msg: err.response}
      });
      return err;
    }
  };