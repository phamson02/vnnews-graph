import axios from "./axios";

export const getData = async () => {
  const response = await axios.get("/get-data");
  return response.data;
};
