import token from "./token";
import axios from "axios";

const baseURL = "https://the-one-api.herokuapp.com/v1";

const instance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token}` }
});

export default instance;
