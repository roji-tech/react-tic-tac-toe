import React, { useState } from "react";
import { Users, Grid, RotateCcw } from "lucide-react";
import ScoreBoard from "../common/ScoreBoard";
import ResultModal from "../common/ResultModal";
import { checkGridWin } from "../../utils/winConditions";
import { sounds } from "../../utils/sound";
import { saveMatchRecord } from "../../utils/storage";
import { ScoreState } from "../../types/game";

const ALL_SYMBOLS = ["X", "O", "Δ", "▢"];

export const MultiplayerGame: React.FC = () => {
  const [gridSize, setGridSize] = useState<number>(4); // 4 or 5
  const [playerCount, setPlayerCount] = useState<number>(3); // 2, 3, or 4
  const [board, setBoard] = useState<(string | null)[]>(Array(16).fill(null));
  const [turnIdx, setTurnIdx] = useState<number>(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [scores, setScores] = useState<ScoreState>({ X: 0, O: 0, "Δ": 0, "▢": 0, DRAW: 0 });

  const activePlayers = ALL_SYMBOLS.slice(0, playerCount);
  const currentSymbol = activePlayers[turnIdx];

  const resetGame = (newSize = gridSize, newCount = playerCount) => {
    setGridSize(newSize);
    setPlayerCount(newCount);
    setBoard(Array(newSize * newSize).fill(null));
    setTurnIdx(0);
    setWinner(null);
    setWinningLine([]);
  };

  const handleSquareClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentSymbol;
    setBoard(newBoard);

    sounds.playMove(currentSymbol !== "X");

    // Win condition check: 4-in-a-row required
    const winResult = checkGridWin(newBoard, gridSize, 4);

    if (winResult) {
      setWinner(winResult.winner);
      setWinningLine(winResult.line);
      setScores((prev) => ({
        ...prev,
        [winResult.winner]: (prev[winResult.winner] || 0) + 1
      }));

      if (winResult.winner === "DRAW") {
        sounds.playDraw();
      } else {
        sounds.playWin();
      }

      saveMatchRecord({
        variant: "multiplayer",
        variantName: `Multiplayer (${gridSize}x${gridSize})`,
        winner: winResult.winner,
        modeName: `${playerCount} Players (4-in-a-row)`
      });
    } else {
      setTurnIdx((prev) => (prev + 1) % playerCount);
    }
  };

  const getSymbolColor = (val: string | null) => {
    switch (val) {
      case "X": return "text-cyanNeon";
      case "O": return "text-pinkNeon";
      case "Δ": return "text-emeraldNeon";
      case "▢": return "text-amberNeon";
      default: return "text-white";
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 py-4 animate-in fade-in duration-300">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between w-full max-w-xl mb-4 glass-panel rounded-2xl p-3 gap-2">
        {/* Player Count Switcher */}
        <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl">
          <span className="text-xs font-bold text-slate-400 px-1.5 flex items-center gap-1">
            <Users size={14} className="text-cyanNeon" /> Players:
          </span>
          {[2, 3, 4].map((count) => (
            <button
              key={count}
              onClick={() => resetGame(gridSize, count)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                playerCount === count
                  ? "bg-cyanNeon text-slate-950 shadow-cyanGlow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {count}P
            </button>
          ))}
        </div>

        {/* Grid Size Switcher */}
        <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl">
          <span className="text-xs font-bold text-slate-400 px-1.5 flex items-center gap-1">
            <Grid size={14} className="text-pinkNeon" /> Grid:
          </span>
          {[4, 5].map((size) => (
            <button
              key={size}
              onClick={() => resetGame(size, playerCount)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                gridSize === size
                  ? "bg-pinkNeon text-slate-950 shadow-pinkGlow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {size}x{size}
            </button>
          ))}
        </div>

        <button
          onClick={() => resetGame(gridSize, playerCount)}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
          title="Reset Match"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <ScoreBoard scores={scores} activePlayer={currentSymbol} players={activePlayers} />

      {/* Turn Banner */}
      <div className="mb-4 text-center">
        <p className="text-sm font-semibold text-slate-400">
          Current Turn:{" "}
          <span className={`font-black text-base ${getSymbolColor(currentSymbol)}`}>
            Player {currentSymbol}
          </span>
          <span className="text-xs text-slate-500 block mt-0.5">(Goal: 4 in a row)</span>
        </p>
      </div>

      {/* NxN Grid Board */}
      <div className="w-full max-w-md p-4 glass-panel rounded-3xl border border-slate-700/80 shadow-2xl">
        <div
          className="grid gap-2.5"
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {board.map((cell, idx) => {
            const isWinning = winningLine.includes(idx);
            return (
              <button
                key={idx}
                onClick={() => handleSquareClick(idx)}
                disabled={!!cell || !!winner}
                className={`w-full aspect-square rounded-xl font-black ${
                  gridSize === 5 ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
                } flex items-center justify-center transition-all ${
                  isWinning
                    ? "bg-cyanNeon/30 border-2 border-cyanNeon shadow-cyanGlow scale-105 animate-pulse"
                    : cell
                    ? `bg-slate-800/90 border border-slate-700 ${getSymbolColor(cell)}`
                    : "glass-card hover:bg-slate-800 border border-slate-700/60 cursor-pointer active:scale-95"
                }`}
              >
                {cell}
              </button>
            );
          })}
        </div>
      </div>

      <ResultModal winner={winner} onRestart={() => resetGame()} />
    </div>
  );
};

export default MultiplayerGame;
