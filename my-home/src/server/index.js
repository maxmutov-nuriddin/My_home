import axios from "axios";

const request = axios.create({
  baseURL: "https://65020ccf736d26322f5cae42.mockapi.io",
  timeout: 10000,
})

export default request