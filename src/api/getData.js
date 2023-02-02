import axios from "./axios";

export const getData = async () => {
    const response = await axios.get("/");
    return response.data;
}