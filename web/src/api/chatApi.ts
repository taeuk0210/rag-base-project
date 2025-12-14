import axios from "axios";

const chatApi = {
  sendMessage: (text: string) => {
    return axios.post("http://localhost:8802/v1/chat/completions", {
      model: "Qwen/Qwen2.5-0.5B-Instruct",
      messages: [
        { role: "system", content: "너는 도움이 되는 AI야." },
        { role: "user", content: text },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });
  },
};

export default chatApi;
