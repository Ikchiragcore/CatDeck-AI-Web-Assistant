import React from "react";
import CentreLogo from "../../components/ui/CentreLogo";
import GetStarted from "./components/GetStartedBtn";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-slate-950 flex flex-col justify-center items-center overflow-hidden selection:bg-amber-400/30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[10%] right-[10%] w-75 h-75 bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center text-center px-4 space-y-12">
        <div className="transform hover:scale-105 transition-transform duration-700 ease-out cursor-none filter drop-shadow-[0_0_30px_rgba(251,191,36,0.1)]">
          <CentreLogo size={220} />
        </div>
        <div className="space-y-4 mt-2">
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white uppercase">
            Cat<span className="text-amber-400">Deck</span>
          </h1>
          <div className="pt-2">
            <p className="max-w-md mx-auto text-slate-400 text-xs md:text-sm font-medium leading-relaxed tracking-[0.4em] uppercase opacity-60">
              The AI Assistant <br />
              <span className="tracking-[0.2em]">
                Exclusively for Web Developers
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <GetStarted />
        </div>
      </div>
      <div className="absolute bottom-6 text-slate-800 text-[9px] font-bold tracking-[0.3em] uppercase pointer-events-none opacity-50">
        2026 CatDeck AI • v1.0
      </div>
    </div>
  );
};

export default LandingPage;
