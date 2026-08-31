import React, { useState } from "react";
import { Layers, RotateCcw } from "lucide-react";
import ScoreBoard from "../common/ScoreBoard";
import ResultModal from "../common/ResultModal";
import { check3DWin } from "../../utils/winConditions";
import { sounds } from "../../utils/sound";
import { saveMatchRecord } from "../../utils/storage";
import { ScoreState } from "../../types/game";

export const ThreeDGame: React.FC = () => {
  // 64 total cells for 4x4x4 cube
  const [board, setBoard] = useState<(string | null)[]>(Array(64).fill(null));
  const [activeLayer, setActiveLayer] = useState<number>(0); // 0, 1, 2, 3
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [scores, setScores] = useState<ScoreState>({ X: 0, O: 0, DRAW: 0 });

  const resetGame = () => {
    setBoard(Array(64).fill(null));
    setActiveLayer(0);
    setTurn("X");
    setWinner(null);
    setWinningLine([]);
  };

  const handleCellClick = (cellIdx: number) => {
    if (board[cellIdx] || winner) return;

    const newBoard = [...board];
    newBoard[cellIdx] = turn;
    setBoard(newBoard);
    sounds.playMove(turn === "O");

    const winResult = check3DWin(newBoard);
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
        variant: "threed",
        variantName: "3D Cube (4x4x4)",
        winner: winResult.winner,
        modeName: "2-Player Pass & Play"
      });
    } else {
      setTurn((prev) => (prev === "X" ? "O" : "X"));
    }
  };

  const getLayerIndices = (layerIdx: number) => {
    const indices: number[] = [];
    for (let i = 0; i < 16; i++) {
      indices.push(layerIdx * 16 + i);
    }
    return indices;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4 py-4 animate-in fade-in duration-300">
      {/* Controls & Layer Tabs */}
      <div className="flex flex-wrap items-center justify-between w-full max-w-2xl mb-4 glass-panel rounded-2xl p-3 gap-2">
        <div className="flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-xl">
          <span className="text-xs font-bold text-slate-400 px-2 flex items-center gap-1">
            <Layers size={14} className="text-cyanNeon" /> View Layer:
          </span>
          {[0, 1, 2, 3].map((layerNum) => (
            <button
              key={layerNum}
              onClick={() => setActiveLayer(layerNum)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeLayer === layerNum
                  ? "bg-cyanNeon text-slate-950 shadow-cyanGlow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Layer #{layerNum + 1}
            </button>
          ))}
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

      {/* Main Focus Layer Grid (4x4) */}
      <div className="w-full max-w-md p-4 glass-panel rounded-3xl border border-slate-700/80 shadow-2xl mb-6">
        <h3 className="text-center font-bold text-sm text-cyanNeon mb-3">
          ACTIVE VIEW: LAYER #{activeLayer + 1} (Z = {activeLayer + 1})
        </h3>
        <div className="grid grid-cols-4 gap-2.5">
          {getLayerIndices(activeLayer).map((cellIdx) => {
            const val = board[cellIdx];
            const isWinning = winningLine.includes(cellIdx);
            return (
              <button
                key={cellIdx}
                onClick={() => handleCellClick(cellIdx)}
                disabled={!!val || !!winner}
                className={`w-full aspect-square rounded-xl font-black text-2xl flex items-center justify-center transition-all ${
                  isWinning
                    ? "bg-cyanNeon/30 border-2 border-cyanNeon shadow-cyanGlow scale-105 animate-pulse"
                    : val
                    ? val === "X"
                      ? "text-cyanNeon bg-slate-800/90 border border-cyanNeon/30"
                      : "text-pinkNeon bg-slate-800/90 border border-pinkNeon/30"
                    : "glass-card hover:bg-slate-800 border border-slate-700/60 cursor-pointer active:scale-95"
                }`}
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>

      {/* Overview 4-Slice Mini Preview Panels */}
      <div className="w-full max-w-3xl">
        <h4 className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Full 3D Cube Overview (4 Layers)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((layerNum) => (
            <div
              key={layerNum}
              onClick={() => setActiveLayer(layerNum)}
              className={`glass-panel p-2.5 rounded-2xl cursor-pointer transition-all ${
                activeLayer === layerNum
                  ? "border-2 border-cyanNeon shadow-cyanGlow/40 bg-slate-800/90"
                  : "border border-slate-800 hover:border-slate-600 opacity-80"
              }`}
            >
              <div className="text-center text-[10px] font-bold text-slate-400 mb-1.5">
                Layer #{layerNum + 1}
              </div>
              <div className="grid grid-cols-4 gap-1">
                {getLayerIndices(layerNum).map((idx) => {
                  const val = board[idx];
                  const isWinning = winningLine.includes(idx);
                  return (
                    <div
                      key={idx}
                      className={`w-full aspect-square rounded-md text-[10px] font-bold flex items-center justify-center ${
                        isWinning
                          ? "bg-cyanNeon text-slate-950"
                          : val === "X"
                          ? "text-cyanNeon bg-slate-800"
                          : val === "O"
                          ? "text-pinkNeon bg-slate-800"
                          : "bg-slate-900/60"
                      }`}
                    >
                      {val}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ResultModal winner={winner} onRestart={resetGame} />
    </div>
  );
};

export default ThreeDGame;
