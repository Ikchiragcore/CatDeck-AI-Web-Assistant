import React, { useState, useEffect, useRef } from "react";

const ChatLogo = ({ size = 192 }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const leftEyeSocketRef = useRef(null);
  const rightEyeSocketRef = useRef(null);

  useEffect(() => {
    const updatePos = (e) => {
      // Mobile and Mouse logic
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", updatePos);
    window.addEventListener("touchmove", updatePos);

    return () => {
      window.removeEventListener("mousemove", updatePos);
      window.removeEventListener("touchmove", updatePos);
    };
  }, []);

  const getEyeStyle = (eyeRef) => {
    if (!eyeRef?.current) return {};
    const rect = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(mousePos.y - eyeCenterY, mousePos.x - eyeCenterX);
    const distance = size * 0.05;

    return {
      transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
    };
  };

  return (
    <div
      style={{ width: size, height: size }}
      className="max-w-full max-h-full"
    >
      <div className="relative w-full h-full bg-[#1E293B] rounded-full border-4 border-[#94A3B8] flex items-center justify-center shadow-2xl">
        {/* Ears */}
        <div className="absolute -top-2 left-[15%] w-[25%] h-[25%] bg-[#1E293B] border-t-4 border-l-4 border-[#94A3B8] rotate-[-15deg] rounded-tl-xl"></div>
        <div className="absolute -top-2 right-[15%] w-[25%] h-[25%] bg-[#1E293B] border-t-4 border-r-4 border-[#94A3B8] rotate-15 rounded-tr-xl"></div>

        {/* Eyes Area */}
        <div className="flex justify-center gap-4 w-full px-4">
          <div
            ref={leftEyeSocketRef}
            className="bg-white rounded-full flex items-center justify-center overflow-hidden"
            style={{ width: size * 0.25, height: size * 0.25 }}
          >
            <div
              className="bg-[#0F172A] rounded-full transition-transform duration-75 ease-out"
              style={{
                width: "50%",
                height: "50%",
                ...getEyeStyle(leftEyeSocketRef),
              }}
            />
          </div>

          <div
            ref={rightEyeSocketRef}
            className="bg-white rounded-full flex items-center justify-center overflow-hidden"
            style={{ width: size * 0.25, height: size * 0.25 }}
          >
            <div
              className="bg-[#0F172A] rounded-full transition-transform duration-75 ease-out"
              style={{
                width: "50%",
                height: "50%",
                ...getEyeStyle(rightEyeSocketRef),
              }}
            />
          </div>
        </div>

        {/* Nose */}
        <div className="absolute bottom-[25%] w-[10%] h-[8%] bg-[#FACC15] rounded-full shadow-[0_0_10px_#FACC15]"></div>
      </div>
    </div>
  );
};

export default ChatLogo;
