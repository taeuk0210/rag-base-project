import type { ChatMessageType } from "@/types/chat";
import { Box } from "@mui/material";
import ChatMessage from "@/components/chat/ChatMessage";
import { styled } from "@mui/material/styles";
import ChatLoading from "./ChatLoading";

type ChatMessageListProps = {
  data: ChatMessageType[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
  loading: boolean;
};

const StyledBox = styled(Box)(({ theme }) => ({
  height: "60%",
  padding: theme.spacing(1),
  overflowY: "auto",
  scrollbarGutter: "stable",
}));

const ChatMessageList: React.FC<ChatMessageListProps> = ({
  data,
  scrollRef,
  loading,
}) => {
  return (
    <StyledBox ref={scrollRef}>
      {data.map((c, i) => (
        <ChatMessage key={i} content={c.text} roleType={c.roleType} />
      ))}
      {loading && <ChatLoading />}
    </StyledBox>
  );
};

export default ChatMessageList;
