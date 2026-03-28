import ChatPawIcon from "../../../components/ui/ChatPawIcon";
import ReactMarkdown from "react-markdown";

const ChatMessage = ({ chat }) => {
  if (!chat) return null;

  const isBot = chat.role === "model";
  const messageContent = chat.text || "";

  return (
    <div
      className={`flex w-full px-2 md:px-4 py-2 ${isBot ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${isBot ? "flex-row" : "flex-row-reverse"}`}
      >
        {isBot && (
          <div className="w-8 h-8 shrink-0 bg-accent rounded-full grid place-items-center shadow-md">
            <ChatPawIcon className="text-[18px] text-[#0f172a] block" />
          </div>
        )}

        <div
          className={`px-4 py-2.5 text-sm md:text-base shadow-lg ${
            chat.isError
              ? "bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl"
              : isBot
                ? "bg-white/5 text-gray-200 rounded-2xl rounded-bl-none border border-white/5"
                : "bg-accent text-[#0f172a] font-semibold rounded-2xl rounded-br-none shadow-amber-900/10"
          }`}
        >
          {messageContent === "Thinking..." ? (
            <span className="flex gap-1.5 py-1.5">
              <span className="w-1.5 h-1.5 bg-[#FACC15] rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-[#FACC15] rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-[#FACC15] rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </span>
          ) : isBot ? (
            <div className="ai-markdown prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{messageContent}</ReactMarkdown>
            </div>
          ) : (
            <p className="whitespace-pre-line leading-relaxed">
              {messageContent}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
