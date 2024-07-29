// app/components/SearchBar.jsx
import React, { useState } from 'react';
import { Form, useLoaderData, useActionData } from "@remix-run/react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-2.5">
      <Form method="get" action="/search/results">
        <input 
          type="text" 
          name="q"
          className="w-full p-2.5 pr-20 px-5 text-lg border-2 border-gray-300 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500 focus:shadow-md"
          placeholder="Ask your Elden Ring lore question..."
          autoComplete="off"
          value={searchTerm} 
          onChange={handleChange}
        />
        <button type="submit" className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-blue-500 border-none text-white p-2.5 pl-4 pr-5 text-lg rounded-r-full rounded-l-none cursor-pointer transition-colors duration-300 ease-in-out hover:bg-sky-800 focus:outline-none">
          Search
        </button>
      </Form>
    </div>
  );
};

export default SearchBar;
