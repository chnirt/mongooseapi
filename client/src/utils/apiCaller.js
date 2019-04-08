import axios from "axios";
import * as Config from "./Config";

export default function callApi(method, endpoint, data, token) {
  return axios({
    method: method,
    url: `${Config.API_URI}/${endpoint}`,
    data: data,
    headers: { Authorization: `Bearer ${token}` }
  });
}
