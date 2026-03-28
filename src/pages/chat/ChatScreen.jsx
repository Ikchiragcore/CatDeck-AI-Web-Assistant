import { useState, useEffect, useRef } from "react";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import ChatPawIcon from "../../components/ui/ChatPawIcon";

const ChatScreen = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef();

  useEffect(() => {
    const saved = localStorage.getItem("chat");
    if (saved) {
      setChatHistory(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem("chat", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  return (
    <div className="m-0 p-0 box-border bg-[#0f172a] h-screen flex flex-col w-screen pt-28 md:pt-24 overflow-hidden">
      {/* Chat Area */}
      <div
        ref={chatBodyRef}
        className="chat-body flex-1 overflow-y-auto w-full scroll-smooth"
      >
        {/*Inner Container */}
        <div className="max-w-3xl mx-auto w-full px-4 py-6 md:py-10 space-y-6">
          <div className="message bot-message flex items-start gap-4 mb-8">
            <div className="w-8 h-8 shrink-0 bg-accent rounded-full grid place-items-center shadow-md">
              <ChatPawIcon className="text-[18px] text-[#0f172a] block" />
            </div>
            <p className="message-text px-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl rounded-tl-none text-sm text-gray-200 leading-relaxed shadow-sm">
              Hey Catdeck here! <br /> How can I help you today?
            </p>
          </div>

          {/* Chat History */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-[#0f172a] pb-4 md:pb-8 pt-2">
        <div className="max-w-3xl mx-auto px-4 w-full">
          <ChatForm setChatHistory={setChatHistory} />
          <p className="hidden md:block text-[10px] text-center text-gray-500 mt-3 tracking-widest uppercase opacity-50">
            2026 CatDeck AI • v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
