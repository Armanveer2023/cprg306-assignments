// /app/week-8/new-item.js
'use client';

import { useState } from 'react';

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('produce');

  const handleSubmit = (event) => {
    event.preventDefault();
    const item = { name, quantity, category };
    alert(`Item added: \nName: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);
    onAddItem(item);
    setName('');
    setQuantity(1);
    setCategory('produce');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Item Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          style={{ color: 'black' }}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          max="20"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          style={{ color: 'black' }}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="text-black mt-1 p-2 block w-full border border-gray-300 rounded-md"
        >
          {[
            'produce', 'dairy', 'bakery', 'meat', 'frozen', 
            'canned', 'dry', 'beverages', 'snacks', 'household', 
            'other'
          ].map((option) => (
            <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
      >
        Add Item
      </button>
    </form>
  );
}
