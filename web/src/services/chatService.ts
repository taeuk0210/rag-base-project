import chatApi from "@/api/chatApi";

const chatService = {
  sendMessage: async (text: string) => {
    const response = await chatApi.sendMessage(text);
    const reply = response.data.choices[0].message.content;

    return reply;
  },
};

export default chatService;
