import React, { useEffect, useRef, useState } from "react";
import { Workflow } from "lucide-react";

// ---------------------------------------------------------------------------
// IntroLoader — boot-sequence style splash that reveals "Welcome to my Portfolio"
// Matches the black/blue automation-pipeline theme of Portfolio.jsx.
//
// Usage in App.jsx:
//
//   import { useState } from "react";
//   import IntroLoader from "./IntroLoader";
//   import Portfolio from "./Portfolio";
//
//   function App() {
//     const [loading, setLoading] = useState(true);
//     return (
//       <>
//         {loading && <IntroLoader onComplete={() => setLoading(false)} />}
//         <Portfolio />
//       </>
//     );
//   }
//
// The Portfolio can mount underneath immediately — the loader sits on top
// with a solid background and fades itself out, so there's no flash.
// ---------------------------------------------------------------------------

const BOOT_LINES = [
  "loading experience.json",
  "connecting pipeline nodes",
  "compiling portfolio",
];

export default function IntroLoader({ onComplete }) {
  const [lineCount, setLineCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("boot"); // boot -> welcome -> exit
  const reducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reducedMotion.current) {
      // Skip straight to a short welcome + exit for reduced-motion users.
      setPhase("welcome");
      const t = setTimeout(() => setPhase("exit"), 900);
      const t2 = setTimeout(() => onComplete && onComplete(), 1400);
      return () => {
        clearTimeout(t);
        clearTimeout(t2);
      };
    }

    const lineTimers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setLineCount(i + 1), 600 + i * 900)
    );

    const progressStart = 600;
    const progressDuration = 3800;
    const startTime = Date.now() + progressStart;
    const progressTimer = setTimeout(() => {
      const tick = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, Math.round((elapsed / progressDuration) * 100));
        setProgress(pct);
        if (pct >= 100) {
          clearInterval(tick);
          setTimeout(() => setPhase("welcome"), 500);
        }
      }, 30);
      return () => clearInterval(tick);
    }, progressStart);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(progressTimer);
    };
  }, []);

  useEffect(() => {
    if (phase === "welcome") {
      const t = setTimeout(() => setPhase("exit"), 2800);
      return () => clearTimeout(t);
    }
    if (phase === "exit") {
      const t = setTimeout(() => onComplete && onComplete(), 1000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const skip = () => {
    setPhase("exit");
  };

  return (
    <div className={`il-root ${phase === "exit" ? "il-exit" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .il-root {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: #080b11;
          color: #e8edf6;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          transition: opacity 1s ease;
          opacity: 1;
        }
        .il-root.il-exit { opacity: 0; pointer-events: none; }
        .il-root * { box-sizing: border-box; }

        .il-skip {
          position: absolute;
          top: 22px;
          right: 24px;
          background: none;
          border: 1px solid #1c2635;
          color: #8a97ac;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11.5px;
          letter-spacing: 0.06em;
          padding: 6px 12px;
          border-radius: 3px;
          cursor: pointer;
          transition: border-color .2s, color .2s;
        }
        .il-skip:hover { border-color: #3d7cf5; color: #8ec1ff; }

        .il-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, #1c2635 1px, transparent 1px),
            linear-gradient(to bottom, #1c2635 1px, transparent 1px);
          background-size: 56px 56px;
          opacity: 0.3;
          mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 75%);
        }

        .il-mark {
          position: relative;
          width: 52px;
          height: 52px;
          border: 1px solid #3d7cf5;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8ec1ff;
          margin-bottom: 28px;
        }
        .il-mark::after {
          content: '';
          position: absolute;
          inset: -6px;
          border: 1px solid #17223a;
          border-radius: 12px;
          animation: il-ring 2.2s ease-out infinite;
        }
        @keyframes il-ring {
          0% { transform: scale(0.85); opacity: 0.9; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        .il-boot {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: opacity .4s ease, transform .4s ease;
        }
        .il-boot.hidden { opacity: 0; transform: translateY(-8px); pointer-events: none; position: absolute; }

        .il-line {
          font-size: 12.5px;
          color: #566078;
          height: 20px;
          opacity: 0;
          transform: translateY(4px);
          animation: il-fade-in .4s ease forwards;
          margin-bottom: 2px;
        }
        .il-line span { color: #3d7cf5; margin-right: 8px; }
        @keyframes il-fade-in { to { opacity: 1; transform: translateY(0); } }

        .il-bar-wrap {
          width: 220px;
          margin-top: 18px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .il-bar-track { flex: 1; height: 2px; background: #1c2635; border-radius: 2px; overflow: hidden; }
        .il-bar-fill { height: 100%; background: #3d7cf5; border-radius: 2px; transition: width .1s linear; }
        .il-bar-pct { font-size: 11px; color: #8a97ac; min-width: 32px; text-align: right; }

        .il-welcome {
          position: relative;
          text-align: center;
          opacity: 0;
          transform: translateY(10px) scale(0.98);
          animation: il-welcome-in .7s cubic-bezier(.16,1,.3,1) forwards;
        }
        @keyframes il-welcome-in { to { opacity: 1; transform: translateY(0) scale(1); } }

        .il-welcome-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: #8ec1ff;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .il-welcome-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(30px, 6vw, 48px);
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1.1;
        }
        .il-welcome-title em {
          font-style: normal;
          color: #8ec1ff;
        }
        .il-underline {
          width: 64px;
          height: 2px;
          background: #3d7cf5;
          margin: 22px auto 0;
          transform: scaleX(0);
          transform-origin: center;
          animation: il-underline .6s ease .3s forwards;
        }
        @keyframes il-underline { to { transform: scaleX(1); } }

        @media (prefers-reduced-motion: reduce) {
          .il-mark::after { animation: none; }
          .il-welcome, .il-underline, .il-line { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      <div className="il-bg-grid" />
      <button className="il-skip" onClick={skip}>skip</button>

      <div className="il-mark">
        <Workflow size={22} />
      </div>

      <div className={`il-boot ${phase !== "boot" ? "hidden" : ""}`}>
        {BOOT_LINES.slice(0, lineCount).map((line, i) => (
          <div className="il-line" key={line} style={{ animationDelay: `${i * 0.05}s` }}>
            <span>›</span>{line}
          </div>
        ))}
        <div className="il-bar-wrap">
          <div className="il-bar-track">
            <div className="il-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="il-bar-pct">{progress}%</span>
        </div>
      </div>

      {phase !== "boot" && (
        <div className="il-welcome">
          <div className="il-welcome-sub">Deniel Dela Cruz</div>
          <h1 className="il-welcome-title">
            Welcome to <em>my Portfolio</em>
          </h1>
          <div className="il-underline" />
        </div>
      )}
    </div>
  );
}