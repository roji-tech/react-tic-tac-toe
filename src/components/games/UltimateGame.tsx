import React, { useState } from "react";
import { RotateCcw, Target } from "lucide-react";
import ScoreBoard from "../common/ScoreBoard";
import ResultModal from "../common/ResultModal";
import { checkClassicWin } from "../../utils/winConditions";
import { sounds } from "../../utils/sound";
import { saveMatchRecord } from "../../utils/storage";
import { ScoreState } from "../../types/game";

export const UltimateGame: React.FC = () => {
  // 9 sub-boards, each containing 9 cells
  const [boards, setBoards] = useState<(string | null)[][]>(
    Array(9).fill(null).map(() => Array(9).fill(null))
  );
  // Macro board tracking winner of each sub-board (null, "X", "O", or "DRAW")
  const [macroBoard, setMacroBoard] = useState<(string | null)[]>(Array(9).fill(null));
  // Which sub-board must be played in next (0..8 or null for free move)
  const [activeBoard, setActiveBoard] = useState<number | null>(null);
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [macroWinningLine, setMacroWinningLine] = useState<number[]>([]);
  const [scores, setScores] = useState<ScoreState>({ X: 0, O: 0, DRAW: 0 });

  const resetGame = () => {
    setBoards(Array(9).fill(null).map(() => Array(9).fill(null)));
    setMacroBoard(Array(9).fill(null));
    setActiveBoard(null);
    setTurn("X");
    setWinner(null);
    setMacroWinningLine([]);
  };

  const handleCellClick = (boardIdx: number, cellIdx: number) => {
    if (winner) return;
    // Check if player is allowed to play in this sub-board
    if (activeBoard !== null && activeBoard !== boardIdx) return;
    // Check if sub-board is already finished
    if (macroBoard[boardIdx]) return;
    // Check if cell is occupied
    if (boards[boardIdx][cellIdx]) return;

    // Place move
    const newSubBoard = [...boards[boardIdx]];
    newSubBoard[cellIdx] = turn;
    const newBoards = [...boards];
    newBoards[boardIdx] = newSubBoard;
    setBoards(newBoards);

    sounds.playMove(turn === "O");

    // Check if this move wins the sub-board
    const subWin = checkClassicWin(newSubBoard);
    const newMacroBoard = [...macroBoard];

    if (subWin) {
      newMacroBoard[boardIdx] = subWin.winner;
      setMacroBoard(newMacroBoard);

      // Check if macro board is won
      const macroWin = checkClassicWin(newMacroBoard);
      if (macroWin) {
        setWinner(macroWin.winner);
        setMacroWinningLine(macroWin.line);
        setScores((prev) => ({
          ...prev,
          [macroWin.winner]: (prev[macroWin.winner] || 0) + 1
        }));

        if (macroWin.winner === "DRAW") {
          sounds.playDraw();
        } else {
          sounds.playWin();
        }

        saveMatchRecord({
          variant: "ultimate",
          variantName: "Ultimate Tic-Tac-Toe",
          winner: macroWin.winner,
          modeName: "2-Player Pass & Play"
        });
        return;
      }
    }

    // Determine target sub-board for opponent's next move
    const nextTarget = cellIdx;
    if (newMacroBoard[nextTarget] !== null) {
      // Sub-board already finished -> free move anywhere
      setActiveBoard(null);
    } else {
      setActiveBoard(nextTarget);
    }

    setTurn((prev) => (prev === "X" ? "O" : "X"));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 py-4 animate-in fade-in duration-300">
      {/* Header Controls */}
      <div className="flex items-center justify-between w-full max-w-xl mb-4 glass-panel rounded-2xl p-3">
        <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
          <Target size={18} className="text-cyanNeon" />
          <span>
            Target Board:{" "}
            <strong className="text-cyanNeon">
              {activeBoard !== null ? `Sub-Board #${activeBoard + 1}` : "ANY (Free Move!)"}
            </strong>
          </span>
        </div>

        <button
          onClick={resetGame}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
          title="Reset Match"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <ScoreBoard scores={scores} activePlayer={turn} players={["X", "O"]} />

      {/* Turn Banner */}
      <div className="mb-4 text-center">
        <p className="text-sm font-semibold text-slate-400">
          Current Turn:{" "}
          <span className={`font-black text-base ${turn === "X" ? "text-cyanNeon" : "text-pinkNeon"}`}>
            Player {turn}
          </span>
        </p>
      </div>

      {/* 9-in-1 Macro Grid */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-5 glass-panel rounded-3xl border border-slate-700/80 shadow-2xl max-w-2xl w-full">
        {boards.map((subBoard, boardIdx) => {
          const isSubWon = macroBoard[boardIdx] !== null;
          const subWinner = macroBoard[boardIdx];
          const isActive = !winner && !isSubWon && (activeBoard === null || activeBoard === boardIdx);
          const isMacroWinningBoard = macroWinningLine.includes(boardIdx);

          return (
            <div
              key={boardIdx}
              className={`relative p-2 rounded-2xl transition-all duration-200 ${
                isMacroWinningBoard
                  ? "bg-cyanNeon/20 border-2 border-cyanNeon shadow-cyanGlow"
                  : isActive
                  ? "bg-slate-800/90 border-2 border-cyanNeon/80 shadow-cyanGlow/50"
                  : "bg-slate-900/60 border border-slate-800 opacity-80"
              }`}
            >
              {/* Overlay for completed sub-board */}
              {isSubWon && (
                <div className="absolute inset-0 z-10 bg-slate-950/85 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <span
                    className={`text-5xl font-black ${
                      subWinner === "X"
                        ? "text-cyanNeon drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]"
                        : subWinner === "O"
                        ? "text-pinkNeon drop-shadow-[0_0_15px_rgba(255,0,127,0.8)]"
                        : "text-slate-400"
                    }`}
                  >
                    {subWinner}
                  </span>
                </div>
              )}

              {/* Sub-board 3x3 cells */}
              <div className="grid grid-cols-3 gap-1.5">
                {subBoard.map((cell, cellIdx) => (
                  <button
                    key={cellIdx}
                    onClick={() => handleCellClick(boardIdx, cellIdx)}
                    disabled={!isActive || !!cell}
                    className={`w-full aspect-square rounded-lg font-black text-lg sm:text-xl flex items-center justify-center transition-all ${
                      cell
                        ? cell === "X"
                          ? "text-cyanNeon bg-slate-800/90"
                          : "text-pinkNeon bg-slate-800/90"
                        : isActive
                        ? "bg-slate-800/60 hover:bg-slate-700/80 text-white cursor-pointer"
                        : "bg-slate-900/40 text-slate-600 cursor-not-allowed"
                    }`}
                  >
                    {cell}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <ResultModal winner={winner} onRestart={resetGame} />
    </div>
  );
};

export default UltimateGame;
