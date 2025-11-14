import React from 'react';
import { Camera, Play, Menu } from 'lucide-react';

export default function GamificationDashboard() {
  return (
    <div className="w-screen h-screen bg-gray-700 flex items-center justify-center overflow-hidden">
      <div className="w-[90vw] h-[80vh] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 px-6 py-3 flex items-center justify-between border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white rounded transform rotate-45"></div>
            </div>
            <h1 className="text-white text-xl font-medium">要務ゲーミシィチョン | ホーム</h1>
          </div>
          <button className="text-white hover:text-gray-300 transition">
            <Menu size={28} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 flex gap-6 overflow-hidden">
          {/* Left Panel - Progress */}
          <div className="flex-1 bg-gray-800 rounded-xl p-6 flex flex-col">
            <h2 className="text-gray-300 text-center text-lg mb-6">僅たな進捗</h2>
            
            <div className="flex-1 flex items-center justify-center gap-12">
              {/* Circular Progress */}
              <div className="relative">
                <svg className="w-64 h-64 transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="100"
                    stroke="#374151"
                    strokeWidth="16"
                    fill="none"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="100"
                    stroke="#10b981"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 100 * 0.75} ${2 * Math.PI * 100}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl font-bold text-green-500">75%</span>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="flex flex-col gap-3">
                <div className="text-gray-400 text-sm mb-2">前第7月間バラチンエース</div>
                <div className="flex items-end gap-3 h-48">
                  {[30, 45, 40, 55, 70, 85, 100].map((height, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div 
                        className="w-8 bg-green-500 rounded-t transition-all"
                        style={{ height: `${height}%` }}
                      ></div>
                      {i === 6 && (
                        <svg className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="none">
                          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center text-gray-400 mt-6">
              時貫成就速逹: 1.8x / 2.0x
            </div>
          </div>

          {/* Right Panel - Actions */}
          <div className="w-80 flex flex-col gap-4">
            {/* Deadline Timer */}
            <div className="bg-gray-800 rounded-xl p-5 text-center">
              <div className="text-gray-300 text-base mb-2">直行のデッドライン</div>
              <div className="text-white text-3xl font-mono">
                締り <span className="text-green-400">0:45:22</span>
              </div>
            </div>

            {/* Action Buttons */}
            <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-3 text-base font-medium transition">
              <Camera size={22} />
              スソップチット作市
            </button>

            <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-3 text-base font-medium transition">
              停覚ブレイ発台
              <Play size={22} fill="white" />
            </button>

            <button className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-xl text-base font-medium transition">
              走信
            </button>

            <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-3 text-base font-medium transition">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
              </div>
              デゲックモード
            </button>
          </div>
        </div>
      </div>

      {/* Decorative sparkle */}
      <div className="fixed bottom-8 right-8 text-gray-600 pointer-events-none">
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
    </div>
  );
}