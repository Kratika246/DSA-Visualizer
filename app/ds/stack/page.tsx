"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, History } from 'lucide-react';

const Stack = () => {
  const [stack, setStack] = useState<number[]>([]);
  const [elem, setElem] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [error, setError] = useState('');

  const push = (val: string) => {
    if (!val || val === '') {
      setError('Please enter a value');
      return;
    }
    const numVal = Number(val);
    if (isNaN(numVal)) {
      setError('Please enter a valid number');
      return;
    }
    setStack([...stack, numVal]);
    setHistory([...history, `Pushed ${numVal}`]);
    setElem('');
    setError('');
  };

  const pop = () => {
    if (stack.length === 0) {
      setError('Stack is empty');
      return;
    }
    const poppedValue = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    setHistory([...history, `Popped ${poppedValue}`]);
    setError('');
  };

  const clr = () => {
    if (stack.length === 0) {
      setError('Stack is already empty');
      return;
    }
    setStack([]);
    setHistory([...history, 'Cleared stack']);
    setError('');
  };

  const peek = () => {
    return stack.length > 0 ? stack[stack.length - 1] : null;
  };

  return (
    <div className="w-full min-h-screen bg-[#1b1b1b] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Stack Visualization</h1>
          <p className="text-gray-400">
            Last In, First Out (LIFO) data structure
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
                      if (e.key === 'Enter') push(elem);
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
                    onClick={() => push(elem)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(37, 99, 235))',
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Push
                  </button>
                  
                  <button
                    onClick={pop}
                    disabled={stack.length === 0}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, rgb(239, 68, 68), rgb(220, 38, 38))',
                    }}
                  >
                    <Minus className="w-4 h-4" />
                    Pop
                  </button>
                </div>

                <button
                  onClick={clr}
                  disabled={stack.length === 0}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderWidth: '1px',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Stack
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
                    {stack.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Top Element:</span>
                  <span className="text-white font-mono font-semibold text-lg">
                    {peek() !== null ? peek() : '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status:</span>
                  <span
                    className={`font-medium ${
                      stack.length === 0 ? 'text-yellow-400' : 'text-green-400'
                    }`}
                  >
                    {stack.length === 0 ? 'Empty' : 'Active'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - Stack Visualization */}
          <div className="lg:col-span-1 flex flex-col items-center">
            <div
              className="w-full max-w-[280px] min-h-[500px] p-6 rounded-xl border relative"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              {/* Stack Label */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-mono tracking-wider"
                style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  color: 'rgb(147, 197, 253)',
                  borderWidth: '1px',
                  borderColor: 'rgba(59, 130, 246, 0.3)',
                }}
              >
                TOP
              </div>

              {/* Stack Container */}
              <div className="flex flex-col-reverse gap-2 mt-8">
                <AnimatePresence initial={false}>
                  {stack.map((item, index) => (
                    <motion.div
                      key={`${item}-${index}`}
                      initial={{ opacity: 0, y: -20, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 500,
                          damping: 30
                        }
                      }}
                      exit={{ 
                        opacity: 0, 
                        y: -20, 
                        scale: 0.8,
                        transition: { duration: 0.2 }
                      }}
                      className="relative h-14 rounded-lg border flex items-center justify-center overflow-hidden"
                      style={{
                        borderColor: index === stack.length - 1 
                          ? 'rgba(59, 130, 246, 0.5)' 
                          : 'rgba(255, 255, 255, 0.1)',
                        backgroundColor: index === stack.length - 1
                          ? 'rgba(59, 130, 246, 0.1)'
                          : 'rgba(255, 255, 255, 0.03)',
                      }}
                    >
                      {/* Highlight for top element */}
                      {index === stack.length - 1 && (
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
                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), transparent)',
                          }}
                        />
                      )}
                      
                      <span className="relative z-10 text-white text-2xl font-mono font-bold">
                        {item}
                      </span>

                      {/* Index label */}
                      <span
                        className="absolute top-1 right-2 text-xs font-mono"
                        style={{ color: 'rgba(156, 163, 175, 0.5)' }}
                      >
                        [{index}]
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Empty state */}
                {stack.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    >
                      <Plus className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-gray-500 text-sm">Stack is empty</p>
                    <p className="text-gray-600 text-xs mt-1">Push elements to visualize</p>
                  </div>
                )}
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

              <div className="space-y-2 max-h-150 overflow-y-auto pr-2"
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
                          color: action.includes('Pushed') 
                            ? 'rgb(134, 239, 172)' 
                            : action.includes('Popped')
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

export default Stack;