import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

type FileViewerProps = {
  file: File;
};

const StyledPaper = styled(Paper)(() => ({
  height: "60vh",
  width: "50vh",
  overflowY: "auto",
  scrollbarGutter: "stable",
}));

const FileViewer: React.FC<FileViewerProps> = ({ file }) => {
  return <StyledPaper></StyledPaper>;
};

export default FileViewer;
