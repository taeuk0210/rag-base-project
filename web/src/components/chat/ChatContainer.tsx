import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import type { ChatMessageType } from "@/types/chat";

import ChatMessageList from "@/components/chat/ChatMessageList";
import SendMessage from "@/components/chat/SendMessage";
import chatService from "@/services/chatService";

const StyledBox = styled(Box)(() => ({
  height: "90vh",
  width: "50vh",
  justifySelf: "center",
}));

const ChatContainer: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessageType[]>([
    { roleType: "assistant", text: "안녕하세요 🙂 무엇을 도와드릴까요?" },
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

  const handleSend = (text: string) => {
    const trimemedText = text.trim();
    if (!trimemedText) return;

    setMessages((prev) => [...prev, { roleType: "user", text: trimemedText }]);
    const reply = chatService.sendMessage(trimemedText);
    if (reply) setText("");

    setMessages((prev) => [...prev, { roleType: "assistant", text: reply }]);
  };

  return (
    <StyledBox>
      <ChatMessageList data={messages} scrollRef={scrollRef} />
      <SendMessage text={text} setText={setText} onSend={handleSend} />
    </StyledBox>
  );
};

export default ChatContainer;
