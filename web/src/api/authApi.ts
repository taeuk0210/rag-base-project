import type { LoginRequest } from "@/types/auth";
import axios from "axios";

const authApi = {
  isAuthed: async () => {
    return await axios.get("http://localhost:8800/api/v1/auth/me", {
      withCredentials: true,
    });
  },

  login: async (request: LoginRequest) => {
    return await axios.post("http://localhost:8800/api/v1/auth/login", request);
  },
};

export default authApi;
