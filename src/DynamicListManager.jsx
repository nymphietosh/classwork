import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export default function DynamicListManager() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // code to Load items from localStorage
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('items'));
    if (savedItems) {
      setItems(savedItems);
    }
  }, []);

  // code Save items to localStorage
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDeleteItem = (indexToDelete) => {
    const updatedItems = items.filter((_, index) => index !== indexToDelete);
    setItems(updatedItems);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-teal-600">Dynamic List Manager</h1>
      <div className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter an item"
          className="flex-grow border border-teal-400 rounded-l px-4 py-2 focus:outline-none"
        />
        <button
          onClick={handleAddItem}
          className="bg-teal-500 text-white px-4 py-2 rounded-r hover:bg-teal-600"
        >
          Add Item
        </button>
      </div>
      <div className="bg-teal-50 p-4 border border-teal-200 rounded">
        <ul className="space-y-2">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.li
                key={item + index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center bg-white rounded p-2 shadow-sm"
              >
                <span className="text-teal-700">{item}</span>
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
