import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
    },
    secondary: {
      main: "#64748b",
    },
    background: {
      default: "#FFFFFF",
    },
  },

  typography: {
    fontFamily: `'Pretendard', 'Roboto', sans-serif`,
    h1: { fontSize: "2rem", fontWeight: 700 },
    h2: { fontSize: "1.5rem", fontWeight: 600 },
    body1: { fontSize: "14px", lineHeight: "16px" },
    body2: { fontSize: "13px" },
  },

  spacing: 8,
  shape: {
    borderRadius: 8,
  },
});

export default theme;
