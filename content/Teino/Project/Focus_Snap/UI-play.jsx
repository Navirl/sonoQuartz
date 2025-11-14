import React, { useState } from 'react';

// スコア表示コンポーネント
const ScoreDisplay = ({ score, accuracy, feedback }) => (
  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
    <div className="flex items-center justify-between mb-2">
      <div className="text-gray-400 text-sm">全体群落 75%</div>
      <div className="text-cyan-400 text-3xl font-bold">{score}</div>
    </div>
    <div className="text-xs text-gray-500">SCORE</div>
    {feedback && (
      <div className="mt-3 flex items-center gap-2">
        <span className="bg-orange-600 text-white px-3 py-1 rounded text-sm font-bold">
          {feedback}
        </span>
        <span className="text-gray-400 text-xs">
          判定精度：+{accuracy}
        </span>
      </div>
    )}
  </div>
);

// 次のボードプレビューコンポーネント
const BoardPreview = ({ boards }) => (
  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
    <div className="text-gray-400 text-sm mb-3">次ボードプレビュー</div>
    <div className="grid grid-cols-2 gap-2">
      {boards.map((board, i) => (
        <div key={i} className="relative">
          <div className="aspect-video bg-gray-800 rounded overflow-hidden">
            <div 
              className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800"
              style={{
                backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1)), linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))`,
                backgroundSize: '10px 10px',
                backgroundPosition: '0 0, 5px 5px'
              }}
            ></div>
          </div>
          <div className="text-center text-gray-500 text-xs mt-1">
            Pattern {i + 1}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 速度スライダーコンポーネント
const SpeedSlider = ({ currentSpeed, onChange }) => {
  const [speed, setSpeed] = useState(currentSpeed);

  const handleChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
    onChange?.(newSpeed);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
      <div className="text-gray-400 text-sm mb-3">背年速度 vs 前期速度</div>
      <div className="relative h-48">
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <div 
            className="absolute bottom-0 left-0 right-0 rounded-lg"
            style={{
              height: `${(speed / 2.0) * 100}%`,
              background: 'linear-gradient(to top, #7c3aed, #ec4899)',
            }}
          ></div>
        </div>
        <input
          type="range"
          min="1.0"
          max="2.0"
          step="0.1"
          value={speed}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
        />
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-8 bg-white rounded-full border-4 border-gray-900 shadow-lg"></div>
        </div>
      </div>
      <div className="text-center mt-3">
        <span className="text-gray-400 text-sm">速度 </span>
        <span className="text-white font-bold text-lg">{speed.toFixed(1)}x</span>
        <span className="text-gray-400 text-sm"> / 2.0x</span>
      </div>
    </div>
  );
};