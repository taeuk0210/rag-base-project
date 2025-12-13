import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChatContainer from "@/components/chat/ChatContainer";
import FileContainer from "@/components/file/FileContainer";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: "100vh",
  width: "100vh",
  justifySelf: "center",
  gap: theme.spacing(1),
}));

const MainPage: React.FC = () => {
  return (
    <>
      <StyledBox>
        <ChatContainer />
        <FileContainer />
      </StyledBox>
    </>
  );
};

export default MainPage;
