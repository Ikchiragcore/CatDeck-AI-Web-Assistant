import React, { useState, useEffect, useRef } from "react";

const CentreLogo = ({ size = 192 }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const leftEyeSocketRef = useRef(null);
  const rightEyeSocketRef = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      if (requestRef.current) cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        setMousePos({ x: clientX, y: clientY });
      });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const getEyeStyle = (eyeRef) => {
    if (!eyeRef.current) return {};
    const rect = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(mousePos.y - eyeCenterY, mousePos.x - eyeCenterX);
    const maxDistance = size * 0.06;

    return {
      transform: `translate(${Math.cos(angle) * maxDistance}px, ${Math.sin(angle) * maxDistance}px)`,
    };
  };

  return (
    <div
      style={{ width: size, height: size }}
      className="relative select-none group"
    >
      {/* Outer Glow Effect */}
      <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-700" />

      <div className="relative w-full h-full bg-slate-800 rounded-full border-4 border-slate-600 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:scale-105">
        {/* Ears */}
        <div className="absolute -top-1 left-[12%] w-[28%] h-[28%] bg-slate-800 border-t-4 border-l-4 border-slate-600 -rotate-12 rounded-tl-2xl shadow-inner" />
        <div className="absolute -top-1 right-[12%] w-[28%] h-[28%] bg-slate-800 border-t-4 border-r-4 border-slate-600 rotate-12 rounded-tr-2xl shadow-inner" />

        {/* Eyes Area */}
        <div className="flex justify-center gap-5 w-full px-4">
          <div
            ref={leftEyeSocketRef}
            className="bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner"
            style={{ width: size * 0.24, height: size * 0.24 }}
          >
            <div
              className="bg-slate-950 rounded-full transition-transform duration-75 ease-out"
              style={{
                width: "55%",
                height: "55%",
                ...getEyeStyle(leftEyeSocketRef),
              }}
            />
          </div>

          <div
            ref={rightEyeSocketRef}
            className="bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner"
            style={{ width: size * 0.24, height: size * 0.24 }}
          >
            <div
              className="bg-slate-950 rounded-full transition-transform duration-75 ease-out"
              style={{
                width: "55%",
                height: "55%",
                ...getEyeStyle(rightEyeSocketRef),
              }}
            />
          </div>
        </div>

        {/* Glowing Nose */}
        <div className="absolute bottom-[22%] w-[14%] h-[10%] bg-amber-400 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.8)] border border-amber-300/50" />
      </div>
    </div>
  );
};

export default CentreLogo;
