import { createTheme } from "@mui/material/styles";
import palette from "@/styles/palette";
import typography from "@/styles/typography";

const theme = createTheme({
  palette: palette,
  typography: typography,

  spacing: 8,
  shape: {
    borderRadius: 8,
  },
});

export default theme;
