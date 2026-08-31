import React, { useState } from "react";
import { Gamepad2, Volume2, VolumeX, History, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { sounds } from "../../utils/sound";

export const HeaderNav: React.FC = () => {
  const location = useLocation();
  const [isMuted, setIsMuted] = useState(sounds.muted);

  const toggleAudio = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="w-full max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 group text-decoration-none">
        <div className="w-10 h-10 rounded-xl bg-cyanNeon/10 border border-cyanNeon/40 flex items-center justify-center text-cyanNeon shadow-cyanGlow group-hover:scale-105 transition-transform">
          <Gamepad2 size={24} />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-wider text-slate-100 flex items-center gap-1.5">
            TIC TAC TOE <span className="bg-gradient-to-r from-cyanNeon to-pinkNeon bg-clip-text text-transparent">SUITE</span>
          </h1>
        </div>
      </Link>

      <div className="flex items-center gap-3">
        {location.pathname !== "/" && (
          <Link
            to="/"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-sm transition-all hover:border-cyanNeon/40 hover:text-cyanNeon"
            title="Return to Main Launcher"
          >
            <Home size={18} />
            <span className="hidden sm:inline">Launcher</span>
          </Link>
        )}

        <button
          onClick={toggleAudio}
          className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 flex items-center justify-center text-slate-200 transition-all hover:border-cyanNeon/40 cursor-pointer"
          title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
        >
          {isMuted ? <VolumeX size={18} className="text-rose-500" /> : <Volume2 size={18} className="text-cyanNeon" />}
        </button>

        {location.pathname !== "/history" && (
          <Link
            to="/history"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-sm transition-all hover:border-cyanNeon/40 hover:text-cyanNeon"
            title="Match History"
          >
            <History size={18} />
            <span className="hidden sm:inline">History</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default HeaderNav;
