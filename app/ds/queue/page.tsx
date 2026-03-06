"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, History, ArrowRight } from 'lucide-react';

interface QueueElement {
  value: number;
  id: string;
}

const Queue = () => {
  const [queue, setQueue] = useState<QueueElement[]>([]);
  const [elem, setElem] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Enqueue (add to rear)
  const enqueue = (val: string) => {
    if (!val || val === '') {
      setError('Please enter a value');
      return;
    }
    const numVal = Number(val);
    if (isNaN(numVal)) {
      setError('Please enter a valid number');
      return;
    }
    const newElement: QueueElement = { value: numVal, id: Date.now().toString() };
    setQueue([...queue, newElement]);
    setHistory([...history, `Enqueued ${numVal}`]);
    setElem('');
    setError('');
  };

  // Dequeue (remove from front)
  const dequeue = () => {
    if (queue.length === 0) {
      setError('Queue is empty');
      return;
    }
    const dequeuedValue = queue[0].value;
    setQueue(queue.slice(1));
    setHistory([...history, `Dequeued ${dequeuedValue}`]);
    setError('');
  };

  // Clear queue
  const clear = () => {
    if (queue.length === 0) {
      setError('Queue is already empty');
      return;
    }
    setQueue([]);
    setHistory([...history, 'Cleared queue']);
    setError('');
  };

  // Peek (view front element)
  const peek = () => {
    return queue.length > 0 ? queue[0].value : null;
  };

  return (
    <div className="w-full min-h-screen bg-[#1b1b1b] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Queue Visualization</h1>
          <p className="text-gray-400">
            First In, First Out (FIFO) data structure
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Input Section */}
            <div
              className="p-6 rounded-xl border"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <h3 className="text-white text-lg font-semibold mb-4">Controls</h3>
              
              <div className="space-y-4">
                {/* Input */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Enter Value
                  </label>
                  <input
                    type="number"
                    placeholder="Enter number..."
                    value={elem}
                    onChange={(e) => setElem(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') enqueue(elem);
                    }}
                    className="w-full px-4 py-3 rounded-lg border bg-transparent text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  />
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm px-3 py-2 rounded-lg"
                      style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => enqueue(elem)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(37, 99, 235))',
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Enqueue
                  </button>
                  
                  <button
                    onClick={dequeue}
                    disabled={queue.length === 0}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, rgb(239, 68, 68), rgb(220, 38, 38))',
                    }}
                  >
                    <Minus className="w-4 h-4" />
                    Dequeue
                  </button>
                </div>

                <button
                  onClick={clear}
                  disabled={queue.length === 0}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderWidth: '1px',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Queue
                </button>
              </div>
            </div>

            {/* Stats */}
            <div
              className="p-6 rounded-xl border"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <h3 className="text-white text-lg font-semibold mb-4">Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Size:</span>
                  <span className="text-white font-mono font-semibold text-lg">
                    {queue.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Front:</span>
                  <span className="text-white font-mono font-semibold text-lg">
                    {peek() !== null ? peek() : '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Rear:</span>
                  <span className="text-white font-mono font-semibold text-lg">
                    {queue.length > 0 ? queue[queue.length - 1].value : '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status:</span>
                  <span
                    className={`font-medium ${
                      queue.length === 0 ? 'text-yellow-400' : 'text-green-400'
                    }`}
                  >
                    {queue.length === 0 ? 'Empty' : 'Active'}
                  </span>
                </div>
              </div>
            </div>

            {/* Queue Info */}
            <div
              className="p-6 rounded-xl border"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <h3 className="text-white text-lg font-semibold mb-4">Operations</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start gap-2">
                  <Plus className="w-4 h-4 text-blue-400 mt-0.5" />
                  <div>
                    <span className="text-blue-400 font-semibold">Enqueue:</span> Add element to rear
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Minus className="w-4 h-4 text-red-400 mt-0.5" />
                  <div>
                    <span className="text-red-400 font-semibold">Dequeue:</span> Remove element from front
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-gray-300 font-semibold">FIFO:</span> First in, first out
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - Queue Visualization */}
          <div className="lg:col-span-1">
            <div
              className="p-6 rounded-xl border min-h-[600px]"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold">Queue</h3>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-gray-400">Front</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-gray-400">Rear</span>
                  </div>
                </div>
              </div>

              {/* Direction Indicators */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full text-xs font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    FRONT
                  </div>
                  <span className="text-gray-600 text-xs">(Dequeue)</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-600" />
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-xs">(Enqueue)</span>
                  <div className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    REAR
                  </div>
                </div>
              </div>

              {/* Queue Container */}
              <div className="relative">
                <div className="flex flex-col gap-2">
                  <AnimatePresence initial={false}>
                    {queue.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20"
                      >
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        >
                          <Plus className="w-8 h-8 text-gray-500" />
                        </div>
                        <p className="text-gray-500 text-sm">Queue is empty</p>
                        <p className="text-gray-600 text-xs mt-1">Enqueue elements to visualize</p>
                      </motion.div>
                    ) : (
                      queue.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 100, scale: 0.8 }}
                          animate={{ 
                            opacity: 1, 
                            x: 0, 
                            scale: 1,
                            transition: {
                              type: "spring",
                              stiffness: 500,
                              damping: 30
                            }
                          }}
                          exit={{ 
                            opacity: 0, 
                            x: -100, 
                            scale: 0.8,
                            transition: { duration: 0.3 }
                          }}
                          className="relative"
                        >
                          <div
                            className="h-16 rounded-lg border flex items-center justify-between px-6 overflow-hidden"
                            style={{
                              borderColor: index === 0 
                                ? 'rgba(59, 130, 246, 0.5)' 
                                : index === queue.length - 1
                                ? 'rgba(168, 85, 247, 0.5)'
                                : 'rgba(255, 255, 255, 0.1)',
                              backgroundColor: index === 0
                                ? 'rgba(59, 130, 246, 0.1)'
                                : index === queue.length - 1
                                ? 'rgba(168, 85, 247, 0.1)'
                                : 'rgba(255, 255, 255, 0.03)',
                            }}
                          >
                            {/* Highlight for front/rear elements */}
                            {(index === 0 || index === queue.length - 1) && (
                              <motion.div
                                className="absolute inset-0"
                                animate={{
                                  opacity: [0.3, 0.1, 0.3],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                                style={{
                                  background: index === 0 
                                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), transparent)'
                                    : 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), transparent)',
                                }}
                              />
                            )}

                            {/* Value */}
                            <span className="relative z-10 text-white text-2xl font-mono font-bold">
                              {item.value}
                            </span>

                            {/* Position indicator */}
                            <div className="relative z-10 flex items-center gap-2">
                              <span className="text-xs text-gray-500 font-mono">
                                [{index}]
                              </span>
                              {index === 0 && (
                                <span className="text-xs text-blue-400 font-semibold">FRONT</span>
                              )}
                              {index === queue.length - 1 && (
                                <span className="text-xs text-purple-400 font-semibold">REAR</span>
                              )}
                            </div>
                          </div>

                          {/* Arrow to next element */}
                          {index < queue.length - 1 && (
                            <div className="flex justify-center py-1">
                              <ArrowRight className="w-5 h-5 text-gray-600 rotate-90" />
                            </div>
                          )}
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - History */}
          <div className="lg:col-span-1">
            <div
              className="p-6 rounded-xl border h-full"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-gray-400" />
                <h3 className="text-white text-lg font-semibold">Operation History</h3>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2"
                style={{ scrollbarWidth: 'thin' }}
              >
                <AnimatePresence initial={false}>
                  {history.length === 0 ? (
                    <p className="text-gray-500 text-sm py-4">No operations yet</p>
                  ) : (
                    history.slice().reverse().map((action, index) => (
                      <motion.div
                        key={history.length - index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="px-4 py-2 rounded-lg border text-sm font-mono"
                        style={{
                          borderColor: 'rgba(255, 255, 255, 0.05)',
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          color: action.includes('Enqueued') 
                            ? 'rgb(134, 239, 172)' 
                            : action.includes('Dequeued')
                            ? 'rgb(252, 165, 165)'
                            : 'rgb(253, 224, 71)',
                        }}
                      >
                        <span className="text-gray-500 mr-2">#{history.length - index}</span>
                        {action}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;