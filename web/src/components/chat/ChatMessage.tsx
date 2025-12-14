import Paper from "@mui/material/Paper";
import { keyframes, styled } from "@mui/material/styles";

type StyledPaperProps = {
  roleType: "assistant" | "user";
};

const animation = keyframes`
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    `;

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "roleType",
})<StyledPaperProps>(({ theme, roleType }) => ({
  whiteSpace: "pre-wrap",
  animation: `${animation} 0.25s ease-out`,
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

type ChatMessageProps = {
  roleType: "assistant" | "user";
  content: React.ReactNode;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ content, roleType }) => {
  return (
    <StyledPaper elevation={4} roleType={roleType}>
      {content}
    </StyledPaper>
  );
};

export default ChatMessage;
