import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button, Chip } from "@mui/material";
import { handleFileSize } from "@/utils/handlers";
import BasePaper from "@/components/common/BasePaper";

type FileUploadListProps = {
  files: File[];
  setFile: (f: File) => void;
  onUpload: (f: File) => void;
};

const FileUploadList: React.FC<FileUploadListProps> = ({
  files,
  setFile,
  onUpload,
}) => {
  return (
    <BasePaper>
      <List>
        {files.map((f, i) => (
          <ListItem key={i}>
            <ListItemButton role={undefined} onClick={() => setFile(f)} dense>
              <ListItemText id={`${i}`} primary={f.name} />
              <Chip label={handleFileSize(f.size)} />
            </ListItemButton>
            <Button variant="outlined" onClick={() => onUpload(f)}>
              UPLOAD
            </Button>
          </ListItem>
        ))}
      </List>
    </BasePaper>
  );
};

export default FileUploadList;
