import { React, Suspense} from 'react';
import { Await, useLoaderData, useNavigation } from '@remix-run/react';
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

export const loader = async ({ request }) => {
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

  return defer({data: data_promise});
};

function LoadingResults() {
  return (
    <div class="flex h-screen justify-center">
      <FontAwesomeIcon icon={faSpinner} className="text-center text-zinc-500 h-20 w-20 mx-auto animate-spin object-center"/>
    </div>
  )
}

const SearchResult = () => {
    let { data } = useLoaderData<typeof loader>();
    let nav  = useNavigation();
    console.log("loading new data")
    
      return (
          <Suspense fallback={<LoadingResults />}>
            <Await resolve={data}>
              {(data)=> (nav.state === "idle") ? <SearchResultsContainer data={data}/> : <LoadingResults />}
            </Await>
          </Suspense>
      ); 
};

export default SearchResult;