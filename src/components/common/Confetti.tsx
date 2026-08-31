import React, { useEffect } from "react";
import confetti from "canvas-confetti";

export const Confetti: React.FC = () => {
  useEffect(() => {
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#00f3ff", "#ff007f", "#00ff88", "#ffb700"]
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#00f3ff", "#ff007f", "#00ff88", "#ffb700"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return null;
};

export default Confetti;
