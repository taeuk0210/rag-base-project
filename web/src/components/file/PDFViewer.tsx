import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, IconButton, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type PDFViewerProps = {
  file: File | null;
};

const StyledPaper = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "60vh",
  width: "50vh",
  alignItems: "center",
}));

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const handleLoadSuccess = ({ numPages }: pdfjs.PDFDocumentProxy) => {
    setNumPages(numPages);
  };
  const handlePageNext = () => {
    setPageNumber(Math.min(numPages, pageNumber + 1));
  };
  const handlePagePrev = () => {
    setPageNumber(Math.max(1, pageNumber - 1));
  };
  return (
    <StyledPaper>
      {file && (
        <>
          <Box>
            <IconButton onClick={handlePagePrev}>
              <ArrowBackIosNewOutlined />
            </IconButton>
            <IconButton onClick={handlePageNext}>
              <ArrowForwardIosOutlined />
            </IconButton>
          </Box>
          <Document file={file} onLoadSuccess={handleLoadSuccess}>
            <Page
              pageNumber={pageNumber}
              width={290}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </>
      )}
    </StyledPaper>
  );
};

export default PDFViewer;
