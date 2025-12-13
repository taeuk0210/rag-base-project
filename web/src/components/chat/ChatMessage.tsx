import type { ChatMessageType } from "@/types/chat";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

type StyledPaperProps = {
  roleType: "assistant" | "user";
};

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "roleType",
})<StyledPaperProps>(({ theme, roleType }) => ({
  whiteSpace: "pre-wrap",
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor:
    roleType === "assistant"
      ? theme.palette.background.default
      : theme.palette.primary.main,
  color:
    roleType === "assistant"
      ? theme.palette.text.primary
      : theme.palette.background.default,
  width: "70%",
  marginLeft: roleType === "assistant" ? 0 : "auto",
  marginRight: roleType === "assistant" ? "auto" : 0,
  ...theme.typography.body1,
}));

const ChatMessage: React.FC<ChatMessageType> = ({ text, roleType }) => {
  return (
    <StyledPaper elevation={4} roleType={roleType}>
      {text}
    </StyledPaper>
  );
};

export default ChatMessage;
