import React from "react";
import { Link } from "react-router-dom";
import { Zap, Target, Layers, Users, Trophy, Play, ArrowRight } from "lucide-react";
import HeaderNav from "../components/common/HeaderNav";
import { getStoredHistory } from "../utils/storage";

export const Home: React.FC = () => {
  const history = getStoredHistory();

  const gameModes = [
    {
      id: "classic",
      path: "/play/classic",
      title: "Classic Tic-Tac-Toe",
      badge: "3x3 Grid",
      badgeColor: "bg-cyanNeon/10 text-cyanNeon border-cyanNeon/30",
      icon: Zap,
      iconColor: "text-cyanNeon",
      glowColor: "group-hover:border-cyanNeon/60 group-hover:shadow-cyanGlow",
      description: "Standard 3x3 gameplay. Play 1v1 with a friend locally or challenge our Unbeatable Minimax AI bot.",
      players: "1 - 2 Players",
      features: ["Pass & Play", "Unbeatable Minimax AI", "Easy Bot Mode"]
    },
    {
      id: "ultimate",
      path: "/play/ultimate",
      title: "Ultimate Tic-Tac-Toe",
      badge: "9-in-1 Board",
      badgeColor: "bg-pinkNeon/10 text-pinkNeon border-pinkNeon/30",
      icon: Target,
      iconColor: "text-pinkNeon",
      glowColor: "group-hover:border-pinkNeon/60 group-hover:shadow-pinkGlow",
      description: "9 sub-boards in 1 main grid! Every move dictates where your opponent must play next. High strategic depth.",
      players: "2 Players",
      features: ["Turn Routing", "Sub-board Overlays", "Free Move Powerups"]
    },
    {
      id: "threed",
      path: "/play/3d",
      title: "3D Cube Tic-Tac-Toe",
      badge: "4x4x4 Cube",
      badgeColor: "bg-purpleNeon/10 text-purpleNeon border-purpleNeon/30",
      icon: Layers,
      iconColor: "text-purpleNeon",
      glowColor: "group-hover:border-purpleNeon/60 group-hover:shadow-purpleGlow",
      description: "Tactical spatial grid across 4 stackable layers (64 cells). Evaluates 76 possible 3D winning lines.",
      players: "2 Players",
      features: ["4-Layer Switcher", "76 Winning Lines", "3D Slice Previews"]
    },
    {
      id: "multiplayer",
      path: "/play/multiplayer",
      title: "Multiplayer Custom Grid",
      badge: "4x4 / 5x5 Grid",
      badgeColor: "bg-emeraldNeon/10 text-emeraldNeon border-emeraldNeon/30",
      icon: Users,
      iconColor: "text-emeraldNeon",
      glowColor: "group-hover:border-emeraldNeon/60 group-hover:shadow-emeraldGlow",
      description: "Expand the board to 4x4 or 5x5 and invite up to 4 players (X, O, Δ, ▢). Need 4-in-a-row to conquer!",
      players: "2 - 4 Players",
      features: ["2, 3, or 4 Players", "Custom Symbols", "4-in-a-row Goal"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col pb-12">
      <HeaderNav />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-6">
        {/* Hero Banner */}
        <section className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 mb-5">
            <Trophy size={16} className="text-amberNeon" />
            <span className="text-xs font-bold text-slate-300 tracking-wide uppercase">
              Multi-Variant Tic-Tac-Toe Platform
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
            Choose Your <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyanNeon via-pinkNeon to-amberNeon bg-clip-text text-transparent">
              Battleground
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            From classic $3 \times 3$ with Unbeatable AI to 9-in-1 Ultimate grid and 3D Cubes. Select a mode to begin.
          </p>
        </section>

        {/* Game Mode Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {gameModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <Link
                key={mode.id}
                to={mode.path}
                className={`group glass-card rounded-3xl p-6 border border-slate-700/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer ${mode.glowColor}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-slate-900/80 border border-slate-700 flex items-center justify-center ${mode.iconColor}`}>
                      <Icon size={26} />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${mode.badgeColor}`}>
                      {mode.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyanNeon transition-colors flex items-center gap-2">
                    {mode.title}
                  </h3>

                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {mode.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {mode.features.map((feat, idx) => (
                      <span key={idx} className="text-[11px] font-semibold text-slate-300 bg-slate-800/80 border border-slate-700/50 px-2.5 py-1 rounded-lg">
                        • {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <span className="text-xs font-semibold text-slate-400">
                    {mode.players}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-cyanNeon group-hover:translate-x-1 transition-transform">
                    PLAY NOW <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            );
          })}
        </section>

        {/* Quick Stats Footer Bar */}
        <section className="glass-panel rounded-2xl p-5 flex items-center justify-between max-w-2xl mx-auto flex-wrap gap-4 border border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amberNeon">
              <Trophy size={20} />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Matches Saved</div>
              <div className="text-xl font-black text-white">{history.length} Matches</div>
            </div>
          </div>

          <Link
            to="/history"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all hover:text-cyanNeon"
          >
            View History Logs
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Home;
