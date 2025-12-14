import authApi from "@/api/authApi";
import type { LoginRequest } from "@/types/auth";
import { AxiosError } from "axios";

const authService = {
  login: async (request: LoginRequest) => {
    const response = await authApi.login(request);
    return response;
  },
  signup: async (request: LoginRequest) => {
    const response = await authApi.signup(request);
    return response;
  },
  isAuthed: async (
    setAuthed: (v: boolean) => void,
    setLoading: (v: boolean) => void
  ) => {
    try {
      const res = await authApi.isAuthed();
      if (res.status === 200) {
        setAuthed(true);
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setAuthed(false);
      }
    } finally {
      setLoading(false);
    }
  },
};

export default authService;
