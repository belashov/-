import React, { useState, useMemo } from 'react';
import SliderControl from './components/SliderControl';
import ResultsDisplay from './components/ResultsDisplay';
import FanVisual from './components/FanVisual';

// Constants for fan performance calculation based on aerodynamic formulas
const PERFORMANCE_COEFFICIENT = 2.8; // Dimensionless flow coefficient
const PRESSURE_COEFFICIENT = 0.7;    // Dimensionless pressure coefficient
const AIR_DENSITY = 1.2;             // kg/m³
const BASE_BLADE_COUNT = 9;          // Reference number of blades for pressure coefficient

const App: React.FC = () => {
  const [diameter, setDiameter] = useState<number>(400); // Impeller diameter in mm
  const [speed, setSpeed] = useState<number>(1500); // Motor speed in RPM
  const [impellerHeight, setImpellerHeight] = useState<number>(100); // Impeller height in mm
  const [bladeCount, setBladeCount] = useState<number>(9); // Number of blades

  const calculatedPerformance = useMemo(() => {
    const diameterInMeters = diameter / 1000;
    const heightInMeters = impellerHeight / 1000;
    const speedInRps = speed / 60;

    // Q (m³/h) = Kq * n_rps * D² * h * 3600
    const performance = PERFORMANCE_COEFFICIENT * speedInRps * Math.pow(diameterInMeters, 2) * heightInMeters * 3600;
    return Math.round(performance);
  }, [diameter, speed, impellerHeight]);

  const calculatedPressure = useMemo(() => {
    const diameterInMeters = diameter / 1000;
    const speedInRps = speed / 60;
    
    // Tip speed u = π * D * n_rps
    const tipSpeed = Math.PI * diameterInMeters * speedInRps;
    
    // P (Pa) ≈ Kp * (ρ/2) * u² * (z / z_base)
    const pressure = PRESSURE_COEFFICIENT * (AIR_DENSITY / 2) * Math.pow(tipSpeed, 2) * (bladeCount / BASE_BLADE_COUNT);
    return Math.round(pressure);
  }, [diameter, speed, bladeCount]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4 font-sans">
      <main className="w-full max-w-4xl bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-cyan-500/10 border border-slate-700">
        <div className="p-6 md:p-8">
          <header className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              Калькулятор производительности вентилятора
            </h1>
            <p className="text-slate-400 mt-2">
              Расчет для крышного радиального вентилятора с горизонтальным выбросом
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left side: Controls */}
            <div className="flex flex-col gap-5">
              <SliderControl
                label="Диаметр рабочего колеса"
                unit="мм"
                value={diameter}
                onChange={setDiameter}
                min={200}
                max={1000}
                step={10}
              />
              <SliderControl
                label="Высота рабочего колеса"
                unit="мм"
                value={impellerHeight}
                onChange={setImpellerHeight}
                min={20}
                max={500}
                step={5}
              />
              <SliderControl
                label="Скорость вращения двигателя"
                unit="об/мин"
                value={speed}
                onChange={setSpeed}
                min={500}
                max={3000}
                step={50}
              />
               <SliderControl
                label="Количество лопаток"
                unit="шт"
                value={bladeCount}
                onChange={setBladeCount}
                min={6}
                max={18}
                step={1}
              />
            </div>

            {/* Right side: Visual and Results */}
            <div className="flex flex-col items-center gap-6">
              <FanVisual speed={speed} bladeCount={bladeCount} />
              <ResultsDisplay
                performance={calculatedPerformance}
                pressure={calculatedPressure}
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center mt-6 text-slate-500 text-sm">
        <p>Все расчеты являются приблизительными и служат для демонстрационных целей.</p>
      </footer>
    </div>
  );
};

export default App;
