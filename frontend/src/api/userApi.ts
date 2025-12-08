import axios from "axios";

const USER_URL = `http://localhost:7700/api/v1/users`;

export const userApi = {
  refresh: () =>
    axios.post(`${USER_URL}/refresh`, {}, { withCredentials: true }),
};
