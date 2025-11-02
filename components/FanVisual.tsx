import React from 'react';

interface FanVisualProps {
  speed: number; // Speed in RPM
  bladeCount: number; // Number of blades
}

const FanVisual: React.FC<FanVisualProps> = ({ speed, bladeCount }) => {
  // Convert RPM to animation duration. Faster speed = shorter duration.
  // 3000 RPM (max) -> 1s duration
  // 500 RPM (min) -> 6s duration
  const maxSpeed = 3000;
  const minSpeed = 500;
  const minDuration = 1; // in seconds
  const maxDuration = 6; // in seconds

  const duration = maxDuration - ((speed - minSpeed) / (maxSpeed - minSpeed)) * (maxDuration - minDuration);

  return (
    <div className="w-48 h-48 md:w-56 md:h-56 p-4 flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <style>
          {`
            .fan-blades {
              animation: spin ${duration.toFixed(2)}s linear infinite;
              transform-origin: center;
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
        {/* Casing */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="#475569" strokeWidth="3" />
        <circle cx="50" cy="50" r="42" fill="#1e293b" />
        <circle cx="50" cy="50" r="43" fill="none" stroke="#334155" strokeWidth="1" />
        
        {/* Blades group */}
        <g className="fan-blades">
          <circle cx="50" cy="50" r="12" fill="#475569" />
          
          {[...Array(bladeCount)].map((_, i) => (
            <path
              key={i}
              // This path is designed to look like a backward-curved blade
              d="M 50 15 C 30 20, 35 45, 55 48 L 58 43 C 45 40, 40 25, 50 18 Z"
              fill="#64748b"
              transform={`rotate(${i * (360 / bladeCount)} 50 50)`}
            />
          ))}
          
          <circle cx="50" cy="50" r="8" fill="#334155" />
          <circle cx="50" cy="50" r="9" fill="none" stroke="#2563eb" strokeWidth="1" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
};

export default FanVisual;