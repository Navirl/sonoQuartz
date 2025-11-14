import React, { useState } from 'react';
import { X, ChevronDown, Camera } from 'lucide-react';

export default function StepChatInterface() {
  const [selectedSnapshot, setSelectedSnapshot] = useState(0);
  const [timelineValue, setTimelineValue] = useState(3);
  const [speedValue, setSpeedValue] = useState(3);

  const snapshots = [
    { id: 1, type: 'code' },
    { id: 2, type: 'code' },
    { id: 3, type: 'image' },
    { id: 4, type: 'split' },
    { id: 5, type: 'split' },
    { id: 6, type: 'code' },
  ];

  return (
    <div className="w-screen h-screen bg-gray-700 flex items-center justify-center overflow-hidden">
      <div className="w-[95vw] h-[90vh] bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-900 px-6 py-3 flex items-center justify-between border-b border-gray-700 flex-shrink-0">
          <h1 className="text-white text-lg font-medium">要集ゲーミフチョン | ステプチット持能</h1>
          <button className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 flex gap-4 p-4 overflow-hidden">
          {/* Left Section - Code Editor Placeholder */}
          <div className="flex-1 flex flex-col gap-3 min-w-0">
            {/* Main Preview Area */}
            <div className="flex-1 bg-gray-900 rounded-lg p-3 relative overflow-hidden flex items-center justify-center">
              {/* Display preview based on selected snapshot */}
              {snapshots[selectedSnapshot].type === 'code' && (
                <div className="w-full h-full flex">
                  {/* File Tree Simulation */}
                  <div className="w-44 bg-black bg-opacity-40 p-3 text-xs text-gray-400 space-y-1 flex-shrink-0">
                    <div className="flex items-center gap-2 text-green-400">
                      <span>📁</span>
                      <span>Leaning Lander</span>
                    </div>
                    <div className="ml-4 space-y-1">
                      <div>📄 pilot.txt</div>
                      <div>📁 src</div>
                      <div className="ml-4 space-y-1">
                        <div>📄 index.html GFX</div>
                        <div>📁 app</div>
                        <div>📄 video.bot.py</div>
                        <div>📄 ui.html.py</div>
                        <div>📁 screen.py</div>
                        <div>📁 scene</div>
                      </div>
                    </div>
                  </div>

                  {/* Code Content Area */}
                  <div className="flex-1 bg-gray-950 rounded p-4 font-mono text-xs overflow-auto ml-2">
                    <div className="text-gray-500 mb-2">// main.js</div>
                    <div className="space-y-1">
                      <div className="text-gray-400">
                        <span className="text-purple-400">import</span> <span className="text-green-400">{'{'}</span> <span className="text-blue-300">Game</span> <span className="text-green-400">{'}'}</span> <span className="text-purple-400">from</span> <span className="text-yellow-300">'./game'</span>
                      </div>
                      <div className="text-gray-400">
                        <span className="text-purple-400">import</span> <span className="text-green-400">{'{'}</span> <span className="text-blue-300">render</span> <span className="text-green-400">{'}'}</span> <span className="text-purple-400">from</span> <span className="text-yellow-300">'./renderer'</span>
                      </div>
                      <div className="h-4"></div>
                      <div className="text-gray-400">
                        <span className="text-purple-400">const</span> <span className="text-blue-300">game</span> <span className="text-white">=</span> <span className="text-purple-400">new</span> <span className="text-blue-300">Game</span><span className="text-yellow-300">()</span>
                      </div>
                      <div className="text-gray-400">
                        <span className="text-blue-300">game</span>.<span className="text-blue-300">init</span><span className="text-yellow-300">()</span>
                      </div>
                      <div className="h-4"></div>
                      <div className="text-gray-400">
                        <span className="text-purple-400">function</span> <span className="text-blue-300">gameLoop</span><span className="text-yellow-300">()</span> <span className="text-green-400">{'{'}</span>
                      </div>
                      <div className="text-gray-400 ml-4">
                        <span className="text-blue-300">game</span>.<span className="text-blue-300">update</span><span className="text-yellow-300">()</span>
                      </div>
                      <div className="text-gray-400 ml-4">
                        <span className="text-blue-300">render</span><span className="text-yellow-300">(</span><span className="text-blue-300">game</span><span className="text-yellow-300">)</span>
                      </div>
                      <div className="text-gray-400 ml-4">
                        <span className="text-blue-300">requestAnimationFrame</span><span className="text-yellow-300">(</span><span className="text-blue-300">gameLoop</span><span className="text-yellow-300">)</span>
                      </div>
                      <div className="text-gray-400">
                        <span className="text-green-400">{'}'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {snapshots[selectedSnapshot].type === 'image' && (
                <div className="w-full h-full bg-yellow-600 rounded flex items-center justify-center text-white text-2xl font-bold">
                  画像プレビュー
                </div>
              )}
              
              {snapshots[selectedSnapshot].type === 'split' && (
                <div className="w-full h-full flex gap-2">
                  <div className="flex-1 bg-gray-950 rounded flex items-center justify-center text-gray-400">
                    コードビュー
                  </div>
                  <div className="flex-1 bg-gray-700 rounded flex items-center justify-center text-white">
                    プレビュー
                  </div>
                </div>
              )}
            </div>

            {/* Timeline/Snapshot Navigation */}
            <div className="bg-gray-900 rounded-lg p-2 flex items-center gap-3 flex-shrink-0">
              <button className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center transition flex-shrink-0">
                <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent"></div>
              </button>
              
              <div className="flex-1 flex gap-2 overflow-x-auto py-1">
                {snapshots.map((snapshot, idx) => (
                  <div
                    key={snapshot.id}
                    onClick={() => setSelectedSnapshot(idx)}
                    className={`w-20 h-12 rounded cursor-pointer transition flex-shrink-0 ${
                      selectedSnapshot === idx ? 'ring-2 ring-green-500' : ''
                    }`}
                  >
                    {snapshot.type === 'code' && (
                      <div className="w-full h-full bg-gray-950 rounded p-1">
                        <div className="space-y-1">
                          <div className="h-0.5 bg-green-500 w-3/4"></div>
                          <div className="h-0.5 bg-blue-400 w-1/2"></div>
                          <div className="h-0.5 bg-purple-400 w-2/3"></div>
                          <div className="h-0.5 bg-green-500 w-1/3"></div>
                        </div>
                      </div>
                    )}
                    {snapshot.type === 'image' && (
                      <div className="w-full h-full bg-yellow-600 rounded"></div>
                    )}
                    {snapshot.type === 'split' && (
                      <div className="w-full h-full flex gap-0.5">
                        <div className="flex-1 bg-gray-950 rounded"></div>
                        <div className="flex-1 bg-gray-700 rounded"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition">
                  進む
                </button>
                <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition">
                  次の停
                </button>
              </div>
            </div>

            {/* Add Snapshot Button */}
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition flex-shrink-0">
              <Camera size={20} />
              スソブチットを追相
            </button>
          </div>

          {/* Right Sidebar */}
          <div className="w-72 flex flex-col gap-3 overflow-y-auto flex-shrink-0">
            {/* 返信 Dropdown */}
            <div className="bg-gray-900 rounded-lg flex-shrink-0">
              <button className="w-full px-4 py-2 flex items-center justify-between text-white hover:bg-gray-800 transition rounded-lg">
                <span className="text-sm">返讓</span>
                <ChevronDown size={18} />
              </button>
            </div>

            {/* 保存済みスナップチャット */}
            <div className="bg-gray-900 rounded-lg flex-shrink-0">
              <button className="w-full px-4 py-2 flex items-center justify-between text-white hover:bg-gray-800 transition rounded-t-lg">
                <span className="text-sm">保選系じスソップチット</span>
                <ChevronDown size={18} />
              </button>
              
              <div className="p-3 grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="aspect-square bg-gray-950 rounded cursor-pointer hover:ring-2 hover:ring-green-500 transition">
                    {item <= 2 ? (
                      <div className="w-full h-full p-1">
                        <div className="space-y-1">
                          <div className="h-0.5 bg-green-500 w-3/4"></div>
                          <div className="h-0.5 bg-blue-400 w-1/2"></div>
                          <div className="h-0.5 bg-purple-400 w-2/3"></div>
                        </div>
                      </div>
                    ) : item === 3 ? (
                      <div className="w-full h-full bg-yellow-600 rounded"></div>
                    ) : (
                      <div className="w-full h-full flex gap-0.5 p-0.5">
                        <div className="flex-1 bg-white rounded"></div>
                        <div className="flex-1 bg-gray-700 rounded"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 詳細 Dropdown */}
            <div className="bg-gray-900 rounded-lg flex-shrink-0">
              <button className="w-full px-4 py-2 flex items-center justify-between text-white hover:bg-gray-800 transition rounded-lg">
                <span className="text-sm">詳範</span>
                <ChevronDown size={18} />
              </button>
            </div>

            {/* 再現タイムライン速度 */}
            <div className="bg-gray-900 rounded-lg p-3 flex-shrink-0">
              <div className="text-white text-xs mb-2">再現ライムラ衣速むx12</div>
              <div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={timelineValue}
                  onChange={(e) => setTimelineValue(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* 仕続量度の定定 */}
            <div className="bg-gray-900 rounded-lg p-3 flex-shrink-0">
              <div className="text-white text-xs mb-2">仕続置度の定定</div>
              <div className="mb-2">
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={speedValue}
                  onChange={(e) => setSpeedValue(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mb-3">
                <span>0</span>
                <span>1</span>
                <span>全∂</span>
              </div>
              
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition">
                ホームに戾つ
              </button>
            </div>
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