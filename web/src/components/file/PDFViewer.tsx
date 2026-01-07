import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, IconButton } from "@mui/material";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import BasePaper from "@/components/common/BasePaper";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type PDFViewerProps = {
  file: File | null;
};

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
    <BasePaper>
      <Box>
        <IconButton onClick={handlePagePrev}>
          <ArrowBackIosNewOutlined />
        </IconButton>
        <IconButton onClick={handlePageNext}>
          <ArrowForwardIosOutlined />
        </IconButton>
      </Box>
      {file && (
        <Document file={file} onLoadSuccess={handleLoadSuccess}>
          <BasePaper>
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </BasePaper>
        </Document>
      )}
    </BasePaper>
  );
};

export default PDFViewer;
