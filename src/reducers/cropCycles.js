import {
  ADD_CROPCYCLE,
  ADD_CROPCYCLE_ERROR,
  SET_CROPCYCLES,
  SET_SORTEDCROPCYCLES,
  GET_CROPCYCLES_ERROR,
  GET_USER_FARM_CROPCYCLES,
  GET_USER_FARM_CROPCYCLES_ERROR,
  UPDATE_CROPCYCLE,
  UPDATE_CROPCYCLE_ERROR
} from "../actions/types";

const initialState = {
  userCropCycles: [],
  userCurrentCropCycles: [],
  userPastCropCycles: [],
  userFarmCropCycle: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_CROPCYCLE:
      return {
        ...state,
        userCurrentCropCycles: state.userCurrentCropCycles.find((f) => f._id === payload._id)
          ? state.userCurrentCropCycles.map((f) => (f._id === payload._id ? payload : f))
          : [...state.userCurrentCropCycles, payload],
        loading: false,
      };
    case ADD_CROPCYCLE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SET_SORTEDCROPCYCLES: {
      const past = [];
      const current = [];
      payload.map((listOfFarms) => {
        listOfFarms.map((cropCycle) => {
          cropCycle.isPast ? past.push(cropCycle) : current.push(cropCycle);
        });
      });
      return {
        ...state,
        userCurrentCropCycles: current,
        userPastCropCycles: past,
      };
    }
    case SET_CROPCYCLES:
      return {
        ...state,
        userCropCycles: payload,
      };
    case GET_CROPCYCLES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_USER_FARM_CROPCYCLES:
      return {
        ...state,
        userFarmCropCycle: payload,
      };
    case GET_USER_FARM_CROPCYCLES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
      case UPDATE_CROPCYCLE:
        {
          const cropToMove = state.userCurrentCropCycles.find(item => item._id === payload._id);
          cropToMove.isPast = payload.isPast;
          // const cropRemoved = state.userCurrentCropCycles.filter(crop => {
          //     return crop._id !== presentCropId
          // })
          // const cropAdded = [...state.userPastCropCycles, cropToMove]
          // if(cropToMove){
          //     this.setState({userCropCurrentList: cropRemoved})
          //     this.setState({userCropPastList: cropAdded})
          // }
          // else{
          //     console.log(presentCropId)
          // } 
          return {
            ...state,
            userCurrentCropCycles: state.userCurrentCropCycles.filter(crop => {
              return crop._id !== payload._id
          }),
            userPastCropCycles: [...state.userPastCropCycles, cropToMove],
          };  
        };
        case UPDATE_CROPCYCLE_ERROR:
          return {
            ...state,
            error: payload,
            loading: false,
          };  
  
    default:
      return state;
  }
}
