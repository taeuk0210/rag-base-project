import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import FileList from "@/components/file/FileList";
import PDFViewer from "@/components/file/PDFViewer";
import FileDropZone from "@/components/file/FileDropZone";

const StyledBox = styled(Box)(() => ({
  height: "90vh",
  width: "50vh",
  justifySelf: "center",
}));

const FileContainer: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  return (
    <StyledBox>
      <FileDropZone onDrop={handleDrop} />
      <PDFViewer file={file} />
      <FileList files={files} setFile={setFile} />
    </StyledBox>
  );
};

export default FileContainer;
