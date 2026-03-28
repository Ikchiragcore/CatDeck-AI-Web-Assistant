import ChatScreen from "./ChatScreen";
import ChatLogo from "../../components/layout/ChatLogo";
import Navbar from "../../components/layout/Navbar";

const ChatPage = () => {
  return (
    <div className="relative min-h-screen bg-[#0f172a]">
      {/* Navbar */}
      <Navbar />

      {/* Top-Left Logo*/}
      <div className="hidden md:flex fixed top-8 left-10 z-60 pointer-events-auto">
        <div className="hover:scale-110 transition-transform duration-300">
          <ChatLogo size={100} />
        </div>
      </div>
      <ChatScreen />
    </div>
  );
};

export default ChatPage;
