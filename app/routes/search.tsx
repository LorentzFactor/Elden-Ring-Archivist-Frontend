import React from 'react';
import { Outlet } from '@remix-run/react';
import SearchBar from '../components/SearchBar';

const Search = () => {
  return (
    <div>
      <SearchBar/>
      <Outlet/>
    </div>
  );
};

export default Search;
