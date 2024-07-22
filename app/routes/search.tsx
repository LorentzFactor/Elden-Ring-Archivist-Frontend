import React from 'react';
import { redirect, json } from '@remix-run/node';
import { useLoaderData, Link, useSearchParams, Outlet } from '@remix-run/react';
import SearchBar from '../components/SearchBar';

/*export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q') || '';
  // If the search param has been specified, go to results page
  if (searchTerm) {return redirect('/search/results?q=' + searchTerm)};
  return null;
};*/

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <SearchBar/>
      <Outlet/>
    </div>
  );
};

export default Search;
