
import React from 'react';

interface SliderControlProps {
  label: string;
  unit: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

const SliderControl: React.FC<SliderControlProps> = ({
  label,
  unit,
  value,
  onChange,
  min,
  max,
  step,
}) => {
  return (
    <div className="w-full bg-slate-900/70 p-4 rounded-lg border border-slate-700">
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-base font-medium text-slate-300">{label}</label>
        <span className="text-xl font-bold text-cyan-400">
          {value} <span className="text-sm font-normal text-slate-400">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
      />
    </div>
  );
};

export default SliderControl;
