import { styled, keyframes } from "@mui/system";
import ChatMessage from "./ChatMessage";

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`;

const Dots = styled("div")({
  display: "flex",
  gap: "6px",
  alignItems: "center",
  height: "20px",
});

const Dot = styled("span")<{ delay: string }>(({ delay }) => ({
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  backgroundColor: "#666",
  animation: `${bounce} 1.4s infinite ease-in-out`,
  animationDelay: delay,
}));

const ChatLoading: React.FC = () => {
  return (
    <ChatMessage
      roleType="assistant"
      content={
        <Dots>
          <Dot delay="0s" />
          <Dot delay="0.2s" />
          <Dot delay="0.4s" />
        </Dots>
      }
    />
  );
};

export default ChatLoading;
