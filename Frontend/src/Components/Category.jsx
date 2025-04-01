// src/Components/CategoryDropdown.jsx
import React from 'react';

const Category = ({ onSelectCategory }) => {
  const categories = ['Sports', 'Tech', 'AI', 'Blockchain'];

  return (
    <select
      onChange={(e) => onSelectCategory(e.target.value)}
      className="p-4 rounded-md bg-[#1E1E1E] text-[#FFFFFF] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#1976D2] transition-all duration-300 min-w-[200px]"
    >
      <option value="">All Categories</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default Category;