import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const BasePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

export default BasePaper;
