import axios from "axios";

const instance = axios.create({
  baseURL: "http://18.222.94.236:2000/api/v1",
  // baseURL: "http://192.168.29.60:2000/api/v1", 
  // local api
});

export default instance;