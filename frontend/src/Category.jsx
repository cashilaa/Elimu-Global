import React, { useState } from "react";

const Category = () => {
  const [categories] = useState(["Technology", "Health", "Education", "Sports"]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    alert(`You selected ${category}`);
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-svh justify-center">
      <h2 className="text-2xl font-bold mb-4">Select a Category</h2>
      <ul className="w-64">
        {categories.map((category, index) => (
          <li
            key={index}
            className={`p-3 mb-2 text-center cursor-pointer rounded ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
      {selectedCategory && (
        <div className="mt-4 text-lg">
          Selected Category:{" "}
          <span className="font-semibold">{selectedCategory}</span>
        </div>
      )}
    </div>
  );
};

export default Category;
