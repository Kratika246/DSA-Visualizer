"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, History, ArrowRight, Search, Edit } from 'lucide-react';

interface Node {
  value: number;
  id: string;
}

const LinkedList = () => {
  const [list, setList] = useState<Node[]>([]);
  const [elem, setElem] = useState('');
  const [position, setPosition] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Insert at head
  const insertAtHead = (val: string) => {
    if (!val || val === '') {
      setError('Please enter a value');
      return;
    }
    const numVal = Number(val);
    if (isNaN(numVal)) {
      setError('Please enter a valid number');
      return;
    }
    const newNode: Node = { value: numVal, id: Date.now().toString() };
    setList([newNode, ...list]);
    setHistory([...history, `Inserted ${numVal} at head`]);
    setElem('');
    setError('');
  };

  // Insert at tail
  const insertAtTail = (val: string) => {
    if (!val || val === '') {
      setError('Please enter a value');
      return;
    }
    const numVal = Number(val);
    if (isNaN(numVal)) {
      setError('Please enter a valid number');
      return;
    }
    const newNode: Node = { value: numVal, id: Date.now().toString() };
    setList([...list, newNode]);
    setHistory([...history, `Inserted ${numVal} at tail`]);
    setElem('');
    setError('');
  };

  // Insert at position
  const insertAtPosition = (val: string, pos: string) => {
    if (!val || val === '') {
      setError('Please enter a value');
      return;
    }
    if (!pos || pos === '') {
      setError('Please enter a position');
      return;
    }
    const numVal = Number(val);
    const numPos = Number(pos);
    if (isNaN(numVal) || isNaN(numPos)) {
      setError('Please enter valid numbers');
      return;
    }
    if (numPos < 0 || numPos > list.length) {
      setError(`Position must be between 0 and ${list.length}`);
      return;
    }
    const newNode: Node = { value: numVal, id: Date.now().toString() };
    const newList = [...list];
    newList.splice(numPos, 0, newNode);
    setList(newList);
    setHistory([...history, `Inserted ${numVal} at position ${numPos}`]);
    setElem('');
    setPosition('');
    setError('');
  };

  // Delete at head
  const deleteAtHead = () => {
    if (list.length === 0) {
      setError('List is empty');
      return;
    }
    const deletedValue = list[0].value;
    setList(list.slice(1));
    setHistory([...history, `Deleted ${deletedValue} from head`]);
    setError('');
  };

  // Delete at tail
  const deleteAtTail = () => {
    if (list.length === 0) {
      setError('List is empty');
      return;
    }
    const deletedValue = list[list.length - 1].value;
    setList(list.slice(0, -1));
    setHistory([...history, `Deleted ${deletedValue} from tail`]);
    setError('');
  };

  // Delete at position
  const deleteAtPosition = (pos: string) => {
    if (!pos || pos === '') {
      setError('Please enter a position');
      return;
    }
    const numPos = Number(pos);
    if (isNaN(numPos)) {
      setError('Please enter a valid position');
      return;
    }
    if (numPos < 0 || numPos >= list.length) {
      setError(`Position must be between 0 and ${list.length - 1}`);
      return;
    }
    const deletedValue = list[numPos].value;
    const newList = [...list];
    newList.splice(numPos, 1);
    setList(newList);
    setHistory([...history, `Deleted ${deletedValue} from position ${numPos}`]);
    setPosition('');
    setError('');
  };

  // Search
  const search = (val: string) => {
    if (!val || val === '') {
      setError('Please enter a value to search');
      return;
    }
    const numVal = Number(val);
    if (isNaN(numVal)) {
      setError('Please enter a valid number');
      return;
    }
    const index = list.findIndex(node => node.value === numVal);
    setFoundIndex(index);
    if (index !== -1) {
      setHistory([...history, `Found ${numVal} at position ${index}`]);
    } else {
      setHistory([...history, `${numVal} not found in list`]);
    }
    setError('');
    
    // Clear highlight after 2 seconds
    setTimeout(() => setFoundIndex(null), 2000);
  };

  // Clear list
  const clear = () => {
    if (list.length === 0) {
      setError('List is already empty');
      return;
    }
    setList([]);
    setHistory([...history, 'Cleared list']);
    setError('');
  };

  return (
    <div className="w-full min-h-screen bg-[#1b1b1b] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Linked List Visualization</h1>
          <p className="text-gray-400">
            Linear data structure with dynamic node allocation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Insert Section */}
            <div
              className="p-6 rounded-xl border"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <h3 className="text-white text-lg font-semibold mb-4">Insert</h3>
              
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Enter value..."
                  value={elem}
                  onChange={(e) => setElem(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border bg-transparent text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                />

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => insertAtHead(elem)}
                    className="px-3 py-2 rounded-lg text-white text-sm font-medium transition-all hover:scale-[1.02]"
                    style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', borderWidth: '1px', borderColor: 'rgba(59, 130, 246, 0.3)' }}
                  >
                    At Head
                  </button>
                  <button
                    onClick={() => insertAtTail(elem)}
                    className="px-3 py-2 rounded-lg text-white text-sm font-medium transition-all hover:scale-[1.02]"
                    style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', borderWidth: '1px', borderColor: 'rgba(59, 130, 246, 0.3)' }}
                  >
                    At Tail
                  </button>
                </div>

                <div className="flex flex-row items-center gap-2 w-full">
                    <input
                        type="number"
                        placeholder="Position..."
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="w-full flex-1 px-3 py-2 rounded-lg border bg-transparent text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                    />
                    <button
                        onClick={() => insertAtPosition(elem, position)}
                        className="shrink-0 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all hover:scale-[1.02]"
                        style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', borderWidth: '1px', borderColor: 'rgba(59, 130, 246, 0.3)' }}
                    >
                        Insert
                    </button>
                </div>
              </div>
            </div>

            {/* Delete Section */}
            <div
              className="p-6 rounded-xl border"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <h3 className="text-white text-lg font-semibold mb-4">Delete</h3>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={deleteAtHead}
                    disabled={list.length === 0}
                    className="px-3 py-2 rounded-lg text-white text-sm font-medium transition-all hover:scale-[1.02] disabled:opacity-50"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', borderWidth: '1px', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                  >
                    From Head
                  </button>
                  <button
                    onClick={deleteAtTail}
                    disabled={list.length === 0}
                    className="px-3 py-2 rounded-lg text-white text-sm font-medium transition-all hover:scale-[1.02] disabled:opacity-50"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', borderWidth: '1px', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                  >
                    From Tail
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Position..."
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full flex-1 px-3 py-2 rounded-lg border bg-transparent text-white text-sm outline-none focus:ring-2 focus:ring-red-500"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  />
                  <button
                    onClick={() => deleteAtPosition(position)}
                    disabled={list.length === 0}
                    className="shrink-0 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all hover:scale-[1.02] disabled:opacity-50"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', borderWidth: '1px', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

           
            

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-sm px-4 py-3 rounded-lg"
                  style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            
          </div>

          {/* Center Panel - List Visualization */}
          <div className="lg:col-span-2">
            <div
              className="p-6 rounded-xl border min-h-50"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold">Linked List</h3>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-gray-400">Head</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-400">Found</span>
                  </div>
                </div>
              </div>

              {/* List Container with horizontal scroll */}
              <div className="overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin' }}>
                <div className="flex items-center gap-0 min-w-max py-8">
                  <AnimatePresence initial={false}>
                    {list.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center w-full py-20"
                      >
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        >
                          <Plus className="w-8 h-8 text-gray-500" />
                        </div>
                        <p className="text-gray-500 text-sm">List is empty</p>
                        <p className="text-gray-600 text-xs mt-1">Insert nodes to visualize</p>
                      </motion.div>
                    ) : (
                      <>
                        {/* HEAD label */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex flex-col items-center mr-4"
                        >
                          <div className="px-3 py-1 rounded-full text-xs font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            HEAD
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-600 mt-2" />
                        </motion.div>

                        {list.map((node, index) => (
                          <React.Fragment key={node.id}>
                            {/* Node */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ 
                                opacity: 1, 
                                scale: 1,
                                transition: {
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 30
                                }
                              }}
                              exit={{ 
                                opacity: 0, 
                                scale: 0.8,
                                transition: { duration: 0.2 }
                              }}
                              className="relative"
                            >
                              <div
                                className="w-24 h-24 rounded-lg border flex flex-col items-center justify-center relative overflow-hidden"
                                style={{
                                  borderColor: foundIndex === index 
                                    ? 'rgba(34, 197, 94, 0.5)' 
                                    : index === 0
                                    ? 'rgba(59, 130, 246, 0.5)'
                                    : 'rgba(255, 255, 255, 0.1)',
                                  backgroundColor: foundIndex === index
                                    ? 'rgba(34, 197, 94, 0.1)'
                                    : index === 0
                                    ? 'rgba(59, 130, 246, 0.1)'
                                    : 'rgba(255, 255, 255, 0.03)',
                                }}
                              >
                                {/* Highlight animation for found node */}
                                {foundIndex === index && (
                                  <motion.div
                                    className="absolute inset-0"
                                    animate={{
                                      opacity: [0.5, 0.1, 0.5],
                                    }}
                                    transition={{
                                      duration: 1,
                                      repeat: 2,
                                      ease: "easeInOut"
                                    }}
                                    style={{
                                      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3), transparent)',
                                    }}
                                  />
                                )}

                                <span className="text-white text-2xl font-mono font-bold z-10">
                                  {node.value}
                                </span>
                                <span className="text-xs text-gray-500 font-mono mt-1 z-10">
                                  [{index}]
                                </span>

                                {/* Next pointer indicator */}
                                <div className="absolute bottom-2 right-2 text-xs text-gray-600 font-mono">
                                  next →
                                </div>
                              </div>
                            </motion.div>

                            {/* Arrow */}
                            {index < list.length - 1 && (
                              <motion.div
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                exit={{ opacity: 0, scaleX: 0 }}
                                className="flex items-center px-2"
                              >
                                <ArrowRight className="w-6 h-6 text-gray-600" />
                              </motion.div>
                            )}
                          </React.Fragment>
                        ))}

                        {/* NULL indicator */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center ml-4"
                        >
                          <ArrowRight className="w-4 h-4 text-gray-600 mr-2" />
                          <div className="px-3 py-1 rounded-full text-xs font-mono bg-gray-700/20 text-gray-500 border border-gray-700/30">
                            NULL
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            {/* search & stats section */}
            <div className='flex gap-4 py-4'>
                <div className='flex-1'>
                    <div
                    className=" p-6 rounded-xl border mb-4"
                    style={{
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    }}
                    >
                    <h3 className="text-white text-lg font-semibold mb-4">Search</h3>
                    
                    <div className="flex gap-2">
                        <input
                        type="number"
                        placeholder="Search value..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') search(searchValue);
                        }}
                        className="w-full flex-1 px-3 py-2 rounded-lg border bg-transparent text-white text-sm outline-none focus:ring-2 focus:ring-green-500"
                        style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                        />
                        <button
                        onClick={() => search(searchValue)}
                        className="shrink-0 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all hover:scale-[1.02]"
                        style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', borderWidth: '1px', borderColor: 'rgba(34, 197, 94, 0.3)' }}
                        >
                        <Search className="w-4 h-4" />
                        </button>
                    </div>
                    </div>
                    {/* Clear Button */}
                        <button
                        onClick={clear}
                        disabled={list.length === 0}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all hover:scale-[1.02] disabled:opacity-50"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderWidth: '1px',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                        }}
                        >
                        <Trash2 className="w-4 h-4" />
                        Clear List
                        </button>
                </div>
                <div
              className="flex-1 p-6 rounded-xl border"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <h3 className="text-white text-lg font-semibold mb-4">Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Length:</span>
                  <span className="text-white font-mono font-semibold text-lg">
                    {list.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Head:</span>
                  <span className="text-white font-mono font-semibold text-lg">
                    {list.length > 0 ? list[0].value : '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Tail:</span>
                  <span className="text-white font-mono font-semibold text-lg">
                    {list.length > 0 ? list[list.length - 1].value : '-'}
                  </span>
                </div>
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
                <h3 className="text-white text-lg font-semibold">History</h3>
              </div>

              <div className="space-y-2 max-h-150 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
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
                          color: action.includes('Inserted') 
                            ? 'rgb(134, 239, 172)' 
                            : action.includes('Deleted')
                            ? 'rgb(252, 165, 165)'
                            : action.includes('Found')
                            ? 'rgb(147, 197, 253)'
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

export default LinkedList;