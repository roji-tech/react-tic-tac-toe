import React, { useState, useEffect, useCallback } from "react";
import { Bot, Users, RotateCcw, Sparkles } from "lucide-react";
import Square from "../ui/Square";
import ScoreBoard from "../common/ScoreBoard";
import ResultModal from "../common/ResultModal";
import { checkClassicWin } from "../../utils/winConditions";
import { getBestMove, getRandomMove } from "../../utils/minimax";
import { sounds } from "../../utils/sound";
import { saveMatchRecord } from "../../utils/storage";
import { AIMode, ScoreState } from "../../types/game";

export const ClassicGame: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [aiMode, setAiMode] = useState<AIMode>("pvp");
  const [scores, setScores] = useState<ScoreState>({ X: 0, O: 0, DRAW: 0 });

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setWinner(null);
    setWinningLine([]);
  };

  const handleSquareClick = useCallback(
    (index: number) => {
      if (board[index] || winner) return;

      const newBoard = [...board];
      newBoard[index] = turn;
      setBoard(newBoard);
      sounds.playMove(turn === "O");

      const result = checkClassicWin(newBoard);
      if (result) {
        setWinner(result.winner);
        setWinningLine(result.line);
        setScores((prev) => ({
          ...prev,
          [result.winner]: (prev[result.winner] || 0) + 1
        }));

        if (result.winner === "DRAW") {
          sounds.playDraw();
        } else {
          sounds.playWin();
        }

        saveMatchRecord({
          variant: "classic",
          variantName: "Classic 3x3",
          winner: result.winner,
          modeName: aiMode === "pvp" ? "2-Player Pass & Play" : `vs AI (${aiMode})`
        });
      } else {
        setTurn((prev) => (prev === "X" ? "O" : "X"));
      }
    },
    [board, winner, turn, aiMode]
  );

  // Trigger AI move when it's O's turn in AI mode
  useEffect(() => {
    if (turn === "O" && !winner && aiMode !== "pvp") {
      const timer = setTimeout(() => {
        let aiMove: number | null = null;
        if (aiMode === "ai-unbeatable") {
          aiMove = getBestMove(board, "O", "X");
        } else {
          aiMove = getRandomMove(board);
        }

        if (aiMove !== null && aiMove >= 0) {
          handleSquareClick(aiMove);
        }
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [turn, winner, aiMode, board, handleSquareClick]);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 py-4 animate-in fade-in duration-300">
      {/* Mode Selector & Controls */}
      <div className="flex items-center justify-between w-full max-w-lg mb-6 glass-panel rounded-2xl p-2 gap-2">
        <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl">
          <button
            onClick={() => { setAiMode("pvp"); resetGame(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              aiMode === "pvp" ? "bg-cyanNeon text-slate-950 shadow-cyanGlow" : "text-slate-400 hover:text-white"
            }`}
          >
            <Users size={14} /> 2 Player
          </button>

          <button
            onClick={() => { setAiMode("ai-unbeatable"); resetGame(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              aiMode === "ai-unbeatable" ? "bg-cyanNeon text-slate-950 shadow-cyanGlow" : "text-slate-400 hover:text-white"
            }`}
          >
            <Bot size={14} /> Unbeatable AI
          </button>

          <button
            onClick={() => { setAiMode("ai-easy"); resetGame(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              aiMode === "ai-easy" ? "bg-cyanNeon text-slate-950 shadow-cyanGlow" : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles size={14} /> Easy AI
          </button>
        </div>

        <button
          onClick={resetGame}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
          title="Reset Match"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <ScoreBoard scores={scores} activePlayer={turn} players={["X", "O"]} />

      {/* Turn Banner */}
      <div className="mb-6 text-center">
        <p className="text-sm font-semibold text-slate-400">
          Current Turn:{" "}
          <span className={`font-black text-base ${turn === "X" ? "text-cyanNeon" : "text-pinkNeon"}`}>
            Player {turn} {aiMode !== "pvp" && turn === "O" ? "(Computer)" : ""}
          </span>
        </p>
      </div>

      {/* 3x3 Grid Board */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 glass-panel rounded-3xl border border-slate-700/80 shadow-2xl">
        {board.map((cell, idx) => (
          <Square
            key={idx}
            value={cell}
            onClick={() => handleSquareClick(idx)}
            isWinning={winningLine.includes(idx)}
            disabled={!!winner || (turn === "O" && aiMode !== "pvp")}
            size="lg"
          />
        ))}
      </div>

      <ResultModal winner={winner} onRestart={resetGame} />
    </div>
  );
};

export default ClassicGame;
