import type { LoginRequest, SignupRequest } from "@/types/auth";
import axios from "axios";

const authApi = {
  isAuthed: async () => {
    return await axios.get("http://localhost:8800/api/v1/auth/me", {
      withCredentials: true,
    });
  },

  login: async (request: LoginRequest) => {
    return await axios.post(
      "http://localhost:8800/api/v1/auth/login",
      request,
      { withCredentials: true }
    );
  },

  signup: async (request: SignupRequest) => {
    return await axios.post(
      "http://localhost:8800/api/v1/auth/signup",
      request
    );
  },
};

export default authApi;
