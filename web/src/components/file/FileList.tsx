import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(() => ({
  height: "15vh",
  width: "50vh",
  overflowY: "auto",
  scrollbarGutter: "stable",
}));

type FileListProps = {
  files: File[];
  setFile: (f: File) => void;
};

const FileList: React.FC<FileListProps> = ({ files, setFile }) => {
  return (
    <StyledPaper>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {files.map((f, i) => (
          <ListItem key={i}>
            <Checkbox
              edge="start"
              tabIndex={-1}
              disableRipple
              onClick={() => {}}
            />
            <ListItemButton role={undefined} onClick={() => setFile(f)} dense>
              <ListItemText id={`${i}`} primary={f.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledPaper>
  );
};

export default FileList;
