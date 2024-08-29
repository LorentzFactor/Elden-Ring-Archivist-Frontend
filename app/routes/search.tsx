import React from 'react';
import { Outlet, MetaFunction, useMatches } from '@remix-run/react';
import { redirect, ActionFunctionArgs } from '@remix-run/node';
import SearchBar from '../components/SearchBar';

export const meta: MetaFunction = () => {
  return [
    { title: "The Silver Tear - Elden Ring Lore Search Engine" },
    { name: "description", content: "A search engine that answers questions about Elden Ring lore (e.g. What is the primeval current) by finding relevant in-game items"}
  ]
}

export async function action({
  request,
}: ActionFunctionArgs) {
  const body = await request.formData();
  const query = body.get('q') as string;
    return redirect(`/search/${query}`);
}

const Search = () => {
  const matches = useMatches();
  const search_url_param = matches.find(match => match.id === 'routes/search.$search_term')?.params.search_term || '';
  return (
    <div>
      <SearchBar textInput={search_url_param}/>
      <Outlet/>
    </div>
  );
};

export default Search;
