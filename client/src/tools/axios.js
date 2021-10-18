import axios from "axios";

const authAxios = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    // Authorization: `Bearer ${localStorage.getItem("token")}`,
    Authorization: "",
    
  },
});

export default authAxios;
