import axios from "axios";
import { API_URL } from "../constants/apiConstants";

const query = axios.create({
  baseURL: API_URL,
});

export { query };
