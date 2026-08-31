import React from "react";

interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinning?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Square: React.FC<SquareProps> = ({
  value,
  onClick,
  isWinning = false,
  disabled = false,
  size = "md"
}) => {
  const getSymbolStyle = (val: string | null) => {
    switch (val) {
      case "X":
        return "text-cyanNeon drop-shadow-[0_0_10px_rgba(0,243,255,0.6)]";
      case "O":
        return "text-pinkNeon drop-shadow-[0_0_10px_rgba(255,0,127,0.6)]";
      case "Δ":
        return "text-emeraldNeon drop-shadow-[0_0_10px_rgba(0,255,136,0.6)]";
      case "▢":
        return "text-amberNeon drop-shadow-[0_0_10px_rgba(255,183,0,0.6)]";
      default:
        return "text-slate-200";
    }
  };

  const sizeClasses = {
    sm: "h-10 w-10 text-xl rounded-lg",
    md: "h-20 w-20 sm:h-24 sm:w-24 text-4xl sm:text-5xl rounded-2xl",
    lg: "h-24 w-24 sm:h-28 sm:w-28 text-5xl rounded-2xl"
  }[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled || !!value}
      className={`
        ${sizeClasses}
        glass-card flex items-center justify-center font-black transition-all duration-200
        ${
          isWinning
            ? "bg-cyanNeon/20 border-2 border-cyanNeon shadow-cyanGlow scale-105 animate-pulse"
            : "hover:bg-slate-800/80 hover:border-slate-500/50 hover:scale-102 border border-slate-700/60"
        }
        ${disabled ? "cursor-not-allowed opacity-90" : "cursor-pointer active:scale-95"}
      `}
    >
      <span className={`transform transition-transform duration-200 ${value ? "scale-100" : "scale-0"} ${getSymbolStyle(value)}`}>
        {value}
      </span>
    </button>
  );
};

export default Square;
