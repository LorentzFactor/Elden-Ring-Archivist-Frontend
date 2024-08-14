import React from 'react';
import { Outlet, MetaFunction } from '@remix-run/react';
import SearchBar from '../components/SearchBar';

export const meta: MetaFunction = () => {
  return [
    { title: "The Silver Tear - Elden Ring Lore Search Engine" },
    { name: "description", content: "A search engine that answers questions about Elden Ring lore (e.g. What is the primeval current) by finding relevant in-game items"}
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
