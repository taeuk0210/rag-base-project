import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import FileDropZone from "./FileDropZone";
import { useState } from "react";
import FileList from "./FileList";
import FileViewer from "./FileViewer";

const StyledBox = styled(Box)(() => ({
  height: "90vh",
  width: "50vh",
  justifySelf: "center",
}));

const FileContainer: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  return (
    <StyledBox>
      <FileViewer file={files[0]} />
      <FileDropZone onDrop={handleDrop} />
      <FileList files={files} />
    </StyledBox>
  );
};

export default FileContainer;
