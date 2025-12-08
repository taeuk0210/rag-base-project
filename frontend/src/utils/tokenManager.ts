let accessToken: string | null = null;

export const tokenManager = {
  setAccessToken: (token: string | null) => {
    accessToken = token;
  },

  getAccessToken: () => accessToken,

  clear: () => {
    accessToken = null;
  },
};
