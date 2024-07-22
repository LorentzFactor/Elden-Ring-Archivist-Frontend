// app/components/SearchBar.jsx
import React, { useState } from 'react';
import { Form } from "@remix-run/react";
import "./SearchBar.css";
import { useLoaderData, Link, useSearchParams } from '@remix-run/react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /*const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };*/

  return (
    <div className="search-container">
      <Form method="get" action="/search/results">
        <input 
          type="text" 
          name="q"
          placeholder="Search..."
          value={searchTerm} 
          onChange={handleChange} 
        />
        <button type="submit">
          Search
        </button>
      </Form>
    </div>
  );
};

export default SearchBar;
