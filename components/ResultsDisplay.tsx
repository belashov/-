
import React from 'react';

interface ResultsDisplayProps {
  performance: number;
  pressure: number;
}

const WindIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 7A2.5 2.5 0 016 4.5h12A2.5 2.5 0 0120.5 7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 12A2.5 2.5 0 016 9.5h6A2.5 2.5 0 0114.5 12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 17A2.5 2.5 0 016 14.5h2A2.5 2.5 0 0110.5 17" />
    </svg>
);


const PressureIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);


const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ performance, pressure }) => {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-700 text-center">
        <div className="flex justify-center items-center mb-2">
            <WindIcon className="h-6 w-6 text-sky-400 mr-2" />
            <h3 className="text-sm font-semibold text-slate-400">Производительность</h3>
        </div>
        <p className="text-2xl font-bold text-sky-300">
          {performance.toLocaleString('ru-RU')}
        </p>
        <p className="text-xs text-slate-500">м³/ч</p>
      </div>
      <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-700 text-center">
        <div className="flex justify-center items-center mb-2">
            <PressureIcon className="h-6 w-6 text-sky-400 mr-2" />
            <h3 className="text-sm font-semibold text-slate-400">Давление</h3>
        </div>
        <p className="text-2xl font-bold text-sky-300">
          {pressure.toLocaleString('ru-RU')}
        </p>
        <p className="text-xs text-slate-500">Па</p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
