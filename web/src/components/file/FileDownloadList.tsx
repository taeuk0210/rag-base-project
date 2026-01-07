import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button, Chip } from "@mui/material";
import { handleFileSize } from "@/utils/handlers";
import type { DocResponse } from "@/types/doc";
import docService from "@/services/docService";
import BasePaper from "@/components/common/BasePaper";

type FileDownlaodListProps = {
  files: DocResponse[];
  setFile: (f: File) => void;
  onDownload: (f: File) => void;
};

const FileDownlaodList: React.FC<FileDownlaodListProps> = ({
  files,
  setFile,
  onDownload,
}) => {
  const handleClick = async (documentId: number) => {
    setFile(await docService.getDocumentFile(documentId));
  };
  return (
    <BasePaper>
      <List>
        {files.map((f, i) => (
          <ListItem key={i}>
            <ListItemButton
              role={undefined}
              onClick={() => handleClick(f.id)}
              dense
            >
              <ListItemText id={`${i}`} primary={f.title} />
              <Chip label={handleFileSize(f.size)} />
            </ListItemButton>
            <Button variant="outlined" onClick={() => {}}>
              DOWNLOAD
            </Button>
          </ListItem>
        ))}
      </List>
    </BasePaper>
  );
};

export default FileDownlaodList;
