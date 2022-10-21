import axios from "axios";

export const getIdealRanges = async (plant) => {
  const res = await axios.get(
    `https://api.sensegrass.com/plant-card/ranges?plant=${plant}`
  );
  return res.data;
};
