import React from "react";
import { ScoreState } from "../../types/game";

interface ScoreBoardProps {
  scores: ScoreState;
  activePlayer: string;
  players?: string[];
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  scores,
  activePlayer,
  players = ["X", "O"]
}) => {
  const playerColors: Record<string, { text: string; border: string; glow: string }> = {
    X: { text: "text-cyanNeon", border: "border-cyanNeon", glow: "shadow-cyanGlow" },
    O: { text: "text-pinkNeon", border: "border-pinkNeon", glow: "shadow-pinkGlow" },
    "Δ": { text: "text-emeraldNeon", border: "border-emeraldNeon", glow: "shadow-emeraldGlow" },
    "▢": { text: "text-amberNeon", border: "border-amberNeon", glow: "shadow-amberGlow" }
  };

  return (
    <div className="flex items-center justify-center gap-3 w-full max-w-xl mb-6 flex-wrap">
      {players.map((p) => {
        const style = playerColors[p] || { text: "text-cyanNeon", border: "border-cyanNeon", glow: "" };
        const isActive = activePlayer === p;

        return (
          <div
            key={p}
            className={`flex-1 min-w-[90px] glass-panel rounded-2xl p-3 flex flex-col items-center gap-1 transition-all duration-200 ${
              isActive
                ? `border-2 ${style.border} ${style.glow} scale-105 bg-slate-800/90`
                : "border border-slate-700/60 opacity-80"
            }`}
          >
            <span className={`text-xs font-bold uppercase tracking-wider ${style.text}`}>
              Player {p}
            </span>
            <span className="text-2xl font-black text-white">{scores[p] || 0}</span>
          </div>
        );
      })}

      <div
        className="flex-1 min-w-[90px] glass-panel rounded-2xl p-3 flex flex-col items-center gap-1 border border-slate-700/60 opacity-80"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Draws
        </span>
        <span className="text-2xl font-black text-white">{scores.DRAW || 0}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
