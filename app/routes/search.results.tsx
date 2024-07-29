import { React, Suspense} from 'react';
import { Await, useLoaderData } from '@remix-run/react';
import default_index from '../utils/pineconeClient';
import openai from '../utils/openAIClient';
import { redirect, defer } from '@remix-run/node';
import SearchResultsContainer from '../components/SearchResultsTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

type SearchResult = {
  id: string,
  name: string|null
}

const preamble_string="Answer the following question about the lore of the game Elden Ring, using information provided from a data dump of the game's item text.\nPay particular attention to the Caption field, if there is one, as this often contains the most lore.\n\nQuestion:\n"

export const loader = async ({ params }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q');
  console.log(searchTerm);
  if (!searchTerm) {
    throw redirect('/search')
  }
  
  const embedding_response_promise = openai.embeddings.create({
    model: "text-embedding-3-large",
    input: preamble_string + searchTerm,
    encoding_format: "float",
  });

  const query_vec_promise = embedding_response_promise.then((embedding_response) => {return embedding_response.data[0].embedding});
  
  const data_matches_promise = query_vec_promise.then((query_vec)=> {return default_index.query({
    vector: query_vec, 
    topK: 10,
    filter: { $and:[{"Name": {$exists: true}}, {"Caption": {$exists: true}}] },
    includeMetadata: true
  })});

  const data_promise = data_matches_promise.then((data_matches) => {
    let data: any[] = [];
    for (let match of data_matches.matches) {
      let item_data = match.metadata!;
      item_data.id = match.id;
      data.push(item_data);
    };
    return data;
  });

  return defer({'data': data_promise});
};

function LoadingResults() {
  return (
    <FontAwesomeIcon icon={faSpinner} className="text-center text-zinc-500 h-20 w-20 mx-auto animate-spin"/>
  )
}

const SearchResult = () => {
    const { data } = useLoaderData<typeof loader>();
    console.log("loading new data")
    
      return (
        <div className="container mx-auto">
          <Suspense fallback={<LoadingResults />}>
            <Await resolve={data}>
              {(data)=> <SearchResultsContainer data={data}/>}
            </Await>
          </Suspense>
        </div>
      ); 
};

export default SearchResult;