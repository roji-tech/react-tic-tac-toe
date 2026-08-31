import React, { useState } from "react";
import { Link } from "react-router-dom";
import { History, Trash2, ArrowLeft, Trophy, Calendar, Gamepad2 } from "lucide-react";
import HeaderNav from "../components/common/HeaderNav";
import { getStoredHistory, clearStoredHistory } from "../utils/storage";
import { MatchRecord } from "../types/game";

export const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<MatchRecord[]>(getStoredHistory());
  const [filter, setFilter] = useState<string>("all");

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all saved match records?")) {
      const updated = clearStoredHistory();
      setHistory(updated);
    }
  };

  const filteredHistory = filter === "all"
    ? history
    : history.filter((item) => item.variant === filter);

  return (
    <div className="min-h-screen flex flex-col pb-12">
      <HeaderNav />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 pt-4">
        {/* Top Header & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 glass-panel p-5 rounded-2xl border border-slate-700/60">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
              title="Back to Launcher"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <History className="text-cyanNeon" size={24} /> Match History
              </h2>
              <p className="text-xs text-slate-400 font-semibold">
                Saved match logs and victory records
              </p>
            </div>
          </div>

          {history.length > 0 && (
            <button
              onClick={handleClear}
              className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Trash2 size={16} /> Clear History
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: "all", label: "All Matches" },
            { id: "classic", label: "Classic 3x3" },
            { id: "ultimate", label: "Ultimate" },
            { id: "threed", label: "3D Cube" },
            { id: "multiplayer", label: "Multiplayer" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filter === tab.id
                  ? "bg-cyanNeon text-slate-950 shadow-cyanGlow"
                  : "bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Matches List */}
        {filteredHistory.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto my-8 border border-slate-700/60">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-4">
              <Gamepad2 size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">No Matches Found</h3>
            <p className="text-xs text-slate-400 mb-6">
              Play a match in any mode to record your victory logs here!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyanNeon text-slate-950 font-bold text-sm shadow-cyanGlow"
            >
              Start Playing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHistory.map((item) => {
              const isDraw = item.winner === "DRAW";
              return (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl p-5 border border-slate-700/60 flex items-center justify-between transition-all hover:border-slate-600"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl border ${
                        isDraw
                          ? "bg-amberNeon/10 border-amberNeon text-amberNeon"
                          : "bg-cyanNeon/10 border-cyanNeon text-cyanNeon shadow-cyanGlow/30"
                      }`}
                    >
                      {isDraw ? "=" : item.winner}
                    </div>

                    <div>
                      <div className="text-base font-bold text-white">
                        {item.variantName}
                      </div>
                      <div className="text-xs text-slate-400 font-semibold mb-1">
                        {item.modeName}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Calendar size={12} /> {item.date}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                        isDraw
                          ? "bg-amberNeon/10 text-amberNeon border-amberNeon/30"
                          : "bg-cyanNeon/10 text-cyanNeon border-cyanNeon/30"
                      }`}
                    >
                      {isDraw ? "DRAW" : `WON BY ${item.winner}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;
