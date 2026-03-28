import React, { useRef, useState } from "react";
import { getGeminiResponse } from "./../../../utils/gemini";

const ChatForm = ({ setChatHistory }) => {
  const inputRef = useRef();
  const [isTyping, setIsTyping] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage || isTyping) return;

    inputRef.current.value = "";
    setIsTyping(true);

    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: userMessage },
      { role: "model", text: "Thinking..." },
    ]);

    try {
      // API Call
      const reply = await getGeminiResponse(userMessage);

      setChatHistory((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { ...msg, text: reply } : msg,
        ),
      );
    } catch (error) {
      let errorMessage = "Error: Deck is offline.";

      //Internet Check
      if (!navigator.onLine) {
        errorMessage = "No internet connection. Check your Wi-Fi!";
      }
      // API Response Check
      else if (error.message && error.message.includes("429")) {
        errorMessage = "Too many requests. Please slow down!";
      }

      setChatHistory((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1
            ? { ...msg, text: errorMessage, isError: true }
            : msg,
        ),
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`chat-form flex items-center gap-2 bg-[#1e293b] border rounded-2xl px-3 md:px-4 py-2 md:py-3 transition-all duration-300 ${
        isTyping
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
        required
      />

      <div className="flex items-center gap-2">
        {/* DELETE BUTTON */}
        {!isTyping && (
          <button
            type="button"
            onClick={() => {
              setChatHistory([]);
              localStorage.removeItem("chat");
              localStorage.removeItem("chatHistory");
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
