import React, { useState, useEffect } from 'react';
import { Check, X, TrendingUp, Shield } from 'lucide-react';

export default function GameEvaluationScreen() {
  const [completionRate, setCompletionRate] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(0);
  
  useEffect(() => {
    // Animate values on mount
    const timer1 = setTimeout(() => setCompletionRate(92), 500);
    const timer2 = setTimeout(() => setSpeedMultiplier(2.1), 800);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="bg-gray-800 rounded-xl p-8 w-full max-w-3xl shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="border-b border-gray-700 pb-4 mb-6">
          <h1 className="text-gray-300 text-lg">要撃ゲーミィチェション｜評価終了</h1>
        </div>

        {/* Session Info */}
        <div className="bg-gray-750 rounded-lg p-4 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-gray-300">セッション総合評価</span>
        </div>

        {/* Main Stats */}
        <div className="flex items-center justify-between mb-8">
          {/* Completion Rate */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgb(55, 65, 81)"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgb(34, 197, 94)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - completionRate / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-gray-400 text-sm">完成率</span>
                <span className="text-white text-3xl font-bold">{completionRate}%</span>
              </div>
            </div>
            <Check className="text-green-500 w-6 h-6 mt-2" />
          </div>

          {/* Speed Metrics */}
          <div className="flex-1 px-12">
            <div className="text-center mb-4">
              <div className="text-gray-400 text-sm mb-2">速度倍率</div>
              <div className="text-5xl font-bold text-cyan-400 mb-1">
                {speedMultiplier.toFixed(1)}x
              </div>
              <TrendingUp className="text-cyan-400 w-6 h-6 mx-auto" />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>前回 2.0x</span>
              <span>目標 2.0x</span>
            </div>
          </div>

          {/* Badge */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-lg p-4 shadow-lg">
              <Shield className="text-white w-8 h-8" />
            </div>
            <span className="text-white font-bold mt-2">GREAT</span>
            <span className="text-gray-400 text-sm">JOB</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="text-gray-400 text-sm mb-2">デッドライン達成／未達履歴</div>
          <div className="relative h-12 bg-gray-700 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex">
              <div className="bg-green-500 flex-1" style={{ width: '70%' }}></div>
              <div className="bg-red-500" style={{ width: '30%' }}></div>
            </div>
            {/* Markers */}
            <div className="absolute inset-0 flex items-center justify-around">
              <X className="text-white w-4 h-4" style={{ marginLeft: '75%' }} />
              <X className="text-white w-4 h-4" style={{ marginLeft: '85%' }} />
              <X className="text-white w-4 h-4" style={{ marginLeft: '95%' }} />
            </div>
          </div>
        </div>

        {/* Warnings */}
        <div className="space-y-2 mb-6">
          <div className="text-gray-400 text-sm">次々の懸念</div>
          <div className="flex items-start gap-2">
            <span className="text-red-400">1.</span>
            <span className="text-gray-300 text-sm">ノード構成を動止（早局構定操業を攻置）</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400">2.</span>
            <span className="text-gray-300 text-sm">ノードライン機符（未達成イークの制限）</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium">
            ホームを戻うる
          </button>
        </div>
      </div>
    </div>
  );
}