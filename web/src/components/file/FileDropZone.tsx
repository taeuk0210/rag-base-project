import React from "react";
import { useDropzone } from "react-dropzone";
import { Typography, Paper, Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

type StyledPaperProps = {
  isDragActive: boolean;
};

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isDragActive",
})<StyledPaperProps>(({ theme, isDragActive }) => ({
  height: "20vh",
  width: "50vh",
  paddingY: theme.spacing(2),
  justifySelf: "center",
  alignContent: "center",
  textAlign: "center",
  cursor: "pointer",
  border: "2px dashed #cccccc",
  borderRadius: "16px",
  borderColor: isDragActive
    ? theme.palette.primary.main
    : theme.palette.secondary.main,
  backgroundColor: isDragActive ? "#fafafa" : "#ffffff",
}));

const StlyedIcon = styled(CloudUpload)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: "30px",
}));

type FileDropZoneProps = {
  onDrop: (accptedFiles: File[]) => void;
};

const FileDropZone: React.FC<FileDropZoneProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    multiple: true,
    accept: {
      "application/pdf": [],
    },
  });

  return (
    <StyledPaper
      variant="outlined"
      {...getRootProps()}
      isDragActive={isDragActive}
    >
      <input {...getInputProps()} />
      <StlyedIcon />
      <Typography>PDF 파일을 업로드 해주세요.</Typography>
    </StyledPaper>
  );
};

export default FileDropZone;
