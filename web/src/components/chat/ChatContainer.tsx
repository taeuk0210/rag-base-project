import { useEffect, useRef, useState } from "react";
import type { ChatContent } from "@/types/chat";
import ChatMessageList from "@/components/chat/ChatMessageList";
import SendMessage from "@/components/chat/SendMessage";
import chatService from "@/services/chatService";
import BaseBox from "@/components/common/BaseBox";
import BaseContainer from "@/components/common/BaseContainer";

const ChatContainer: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatContent[]>([
    { roleType: "assistant", message: "안녕하세요 🙂 무엇을 도와드릴까요?" },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async (message: string) => {
    const newMessage = message.trim();
    if (!newMessage) return;

    setMessages((prev) => [...prev, { roleType: "user", message: newMessage }]);
    setMessage("");
    setLoading(true);

    const reply = await chatService.sendMessage({ message: newMessage });
    setLoading(false);
    setMessages((prev) => [...prev, { roleType: "assistant", message: reply }]);
  };

  return (
    <BaseContainer>
      <BaseBox>
        <ChatMessageList
          data={messages}
          scrollRef={scrollRef}
          loading={loading}
        />
        <SendMessage
          message={message}
          setMessage={setMessage}
          onSend={handleSend}
        />
      </BaseBox>
    </BaseContainer>
  );
};

export default ChatContainer;
