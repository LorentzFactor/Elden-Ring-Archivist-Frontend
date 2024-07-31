import React from 'react';
import { Outlet, MetaFunction } from '@remix-run/react';
import SearchBar from '../components/SearchBar';

export const meta: MetaFunction = () => {
  return [
    { title: "The Silver Tear" },
    { name: "description", content: "Find in-game items that answer your Elden Ring lore questions"}
  ]
}

const Search = () => {
  return (
    <div>
      <SearchBar/>
      <Outlet/>
    </div>
  );
};

export default Search;
