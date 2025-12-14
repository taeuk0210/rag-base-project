import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  height: "90vh",
  width: "50vh",
  justifySelf: "center",
  backgroundColor: theme.palette.primary.main,
}));

const FileContainer: React.FC = () => {
  return <StyledBox></StyledBox>;
};

export default FileContainer;
