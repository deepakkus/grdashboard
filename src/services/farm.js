import axios from "axios";

export const updateUserFarmDevice = async (userId) => {
  const res = await axios.put(
    `${process.env.REACT_APP_USER_FARM_MAPPER_URL}${userId}`
  );
  return res.data;
};

export const updateFarmCrop = async (cropCycleId) => {
  const res = await axios.put(
    `${process.env.REACT_APP_FARM_CROPS_MAPPER_URL}${cropCycleId}`
  );
  return res.data;
};
