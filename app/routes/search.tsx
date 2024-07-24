import React from 'react';
import { useSearchParams, Outlet } from '@remix-run/react';
import SearchBar from '../components/SearchBar';

const Search = () => {
  return (
    <div>
      <SearchBar className="py-px-10 margin-10"/>
      <Outlet/>
    </div>
  );
};

export default Search;
