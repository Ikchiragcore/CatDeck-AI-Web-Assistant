import React, { useRef, useState } from "react";
import { groqResponse } from "./../../../utils/groq";

const ChatForm = ({ setChatHistory }) => {
  const inputRef = useRef();
  const [isTyping, setIsTyping] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();

    if (!userMessage || isTyping) {
      if (!userMessage) {
        setIsError(true);
        setTimeout(() => setIsError(false), 600);
      }
      return;
    }

    inputRef.current.value = "";
    setIsTyping(true);

    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: userMessage },
      { role: "model", text: "Thinking..." },
    ]);

    try {
      const reply = await groqResponse(userMessage);

      setChatHistory((prev) => {
        const newHistory = [...prev];
        if (newHistory.length > 0) {
          newHistory[newHistory.length - 1] = {
            ...newHistory[newHistory.length - 1],
            text: reply,
          };
        }
        return newHistory;
      });
    } catch (error) {
      let errorMessage = "Error: Deck is offline.";

      if (!navigator.onLine) {
        errorMessage = "No internet connection. Check your Wi-Fi!";
      } else if (error.message && error.message.includes("429")) {
        errorMessage = "Too many requests. Please slow down!";
      }

      setChatHistory((prev) => {
        const newHistory = [...prev];
        if (newHistory.length > 0) {
          newHistory[newHistory.length - 1] = {
            ...newHistory[newHistory.length - 1],
            text: errorMessage,
            isError: true,
          };
        }
        return newHistory;
      });
    } finally {
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`chat-form flex items-center gap-2 bg-[#1e293b] border rounded-2xl px-3 md:px-4 py-2 md:py-3 transition-all duration-300 ${
        isError
          ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
          : isTyping
            ? "border-white/5 opacity-80 cursor-not-allowed"
            : "border-white/10 focus-within:border-amber-400"
      }`}
    >
      <input
        ref={inputRef}
        type="text"
        disabled={isTyping}
        placeholder={
          isTyping ? "Deck is processing..." : "Ask CatDeck anything..."
        }
        className="message-input bg-transparent flex-1 outline-none text-white placeholder-gray-500 text-sm disabled:cursor-not-allowed"
      />

      <div className="flex items-center gap-2">
        {!isTyping && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Clear all chat history?")) {
                setChatHistory([]);
                localStorage.removeItem("chatHistory");
              }
            }}
            className="material-symbols-rounded h-8 w-8 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-full transition cursor-pointer"
          >
            delete
          </button>
        )}

        <button
          type="submit"
          disabled={isTyping}
          className={`h-9 w-9 flex items-center justify-center rounded-xl transition-all duration-300 ${
            isTyping
              ? "bg-slate-700 text-amber-400 animate-pulse shadow-none"
              : "bg-amber-400 text-[#0f172a] hover:bg-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
          }`}
        >
          {isTyping ? (
            <div
              className="w-3 h-3 bg-amber-400 rounded-sm animate-spin"
              style={{ animationDuration: "3s" }}
            ></div>
          ) : (
            <span className="material-symbols-rounded text-[20px] font-bold">
              arrow_upward
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatForm;
