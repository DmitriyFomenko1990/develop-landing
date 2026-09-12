"use client";

import { useReducedMotion } from "motion/react";
import { useId, type CSSProperties } from "react";

type GaugeProps = {
  value: number;
  label: string;
};

export function Gauge({ value, label }: GaugeProps) {
  const reduced = useReducedMotion();
  const face = useId();
  const clamped = Math.min(100, Math.max(0, value));
  const angle = -120 + (clamped / 100) * 240;
  const ticks = Array.from({ length: 13 }, (_, index) => index);

  return (
    <div className="gauge">
      <div className="gauge-bezel">
        <svg viewBox="0 0 100 100" aria-hidden>
          <defs>
            <radialGradient id={face} cx="40%" cy="32%" r="70%">
              <stop offset="0%" stopColor="#3a2a22" />
              <stop offset="100%" stopColor="#161018" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="#2a1810" />
          <circle cx="50" cy="50" r="42" fill={`url(#${face})`} />
          {ticks.map((tick) => {
            const deg = -120 + tick * 20;
            const rad = (deg * Math.PI) / 180;
            const inner = tick % 3 === 0 ? 28 : 31;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            return (
              <line
                key={tick}
                x1={(50 + cos * inner).toFixed(2)}
                y1={(50 + sin * inner).toFixed(2)}
                x2={(50 + cos * 36).toFixed(2)}
                y2={(50 + sin * 36).toFixed(2)}
                stroke="#c6a15b"
                strokeWidth={tick % 3 === 0 ? 1.6 : 0.8}
              />
            );
          })}
          <g
            className={reduced ? undefined : "gauge-needle"}
            style={
              {
                "--needle": `${angle}deg`,
                transform: reduced ? `rotate(${angle}deg)` : undefined,
              } as CSSProperties
            }
          >
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="22"
              stroke="#e8c98a"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
          <circle cx="50" cy="50" r="4.5" fill="#d4a85a" />
          <circle cx="50" cy="50" r="2" fill="#2a1810" />
          <path
            d="M18 28 Q50 8 82 28"
            fill="rgb(255 255 255 / 0.08)"
            stroke="none"
          />
        </svg>
      </div>
      <p className="gauge-label">{label}</p>
    </div>
  );
}
