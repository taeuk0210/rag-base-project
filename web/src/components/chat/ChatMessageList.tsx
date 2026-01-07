import type { ChatContent } from "@/types/chat";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatLoading from "@/components/chat/ChatLoading";
import BaseBox from "@/components/common/BaseBox";

type ChatMessageListProps = {
  data: ChatContent[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
  loading: boolean;
};

const ChatMessageList: React.FC<ChatMessageListProps> = ({
  data,
  scrollRef,
  loading,
}) => {
  return (
    <BaseBox ref={scrollRef}>
      {data.map((c, i) => (
        <ChatMessage key={i} content={c.message} roleType={c.roleType} />
      ))}
      {loading && <ChatLoading />}
    </BaseBox>
  );
};

export default ChatMessageList;
