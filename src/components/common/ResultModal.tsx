import React from "react";
import { Trophy, Handshake, RotateCcw, Home, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Confetti from "./Confetti";

interface ResultModalProps {
  winner: string | null;
  onRestart: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({ winner, onRestart }) => {
  const navigate = useNavigate();

  if (!winner) return null;

  const isDraw = winner === "DRAW";

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      {!isDraw && <Confetti />}
      
      <div className="glass-card border border-cyanNeon/30 shadow-2xl rounded-3xl p-8 max-w-md w-full text-center flex flex-col items-center transform scale-100 transition-all">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 border-2 shadow-lg ${
          isDraw 
            ? "bg-amberNeon/10 border-amberNeon text-amberNeon shadow-amberNeon/30" 
            : "bg-cyanNeon/10 border-cyanNeon text-cyanNeon shadow-cyanNeon/30"
        }`}>
          {isDraw ? <Handshake size={44} /> : <Trophy size={44} />}
        </div>

        <h2 className="text-3xl font-black text-white tracking-wide mb-2">
          {isDraw ? "IT'S A DRAW!" : `PLAYER ${winner} WINS!`}
        </h2>

        <p className="text-slate-400 text-sm mb-7 leading-relaxed">
          {isDraw
            ? "A hard-fought stalemate! Both players showed formidable tactics."
            : `Phenomenal strategy! Player ${winner} claimed victory this round.`}
        </p>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-cyanNeon to-blue-600 hover:from-cyanNeon/90 hover:to-blue-500 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-cyanGlow flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <RotateCcw size={20} /> Play Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Home size={18} /> Main Menu
          </button>

          <button
            onClick={() => navigate("/history")}
            className="w-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <History size={18} /> View Match History
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
