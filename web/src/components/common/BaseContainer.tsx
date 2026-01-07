import { Paper, type PaperProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type BaseContainerProps = PaperProps & {
  height?: string;
  width?: string;
};

const BaseContainer = styled(Paper)<BaseContainerProps>(
  ({ theme, height = "50%", width = "100%" }) => ({
    height: height,
    width: width,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
  })
);

export default BaseContainer;
