import { React, Suspense} from 'react';
import { Await, useLoaderData, useNavigation, MetaFunction } from '@remix-run/react';
import default_index from '../utils/pineconeClient';
import openai from '../utils/openAIClient';
import createRedisClient from '../utils/redisClient';
import getIP from '../utils/getRequestIp';
import replaceAll from '../utils/strReplaceAll';
import { redirect, defer, LoaderFunctionArgs } from '@remix-run/node';
import SearchResultsContainer from '../components/SearchResultsTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const preamble_string="Answer the following question about the lore of the game Elden Ring, using information provided from a data dump of the game's item text.\nPay particular attention to the Caption field, if there is one, as this often contains the most lore.\n\nQuestion:\n"

async function recordSearch(request: Request, searchTerm: string) {
  let ip = getIP(request);
  let userAgent = request.headers.get("User-Agent");
  let redisClient = await createRedisClient();

  // record the search term and ip address
  try {
    if (ip === null) {
      ip = "unknown";
    } else {
      await redisClient.SADD("known_ips", ip);
      await redisClient.SADD("searches:by_ip:" + ip, searchTerm);
    }
    if (userAgent === null) {
      userAgent = "unknown";
    }
    await redisClient.xAdd("searches", '*', {
      ip: ip,
      user_agent: userAgent,
      search_term: searchTerm
    })
  }
  catch (error) {
    console.error(error);
  }
  finally {
    await redisClient.disconnect();
  }
};

export const loader = async ({
  request,
  params
}: LoaderFunctionArgs) => {
  const searchTerm = params.search_term!;
  
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

 recordSearch(request, searchTerm);

  return defer({data: data_promise, searchTerm: searchTerm});
};

// Construct the meta title and description from the search term
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `The Silver Tear - ${replaceAll(decodeURIComponent(data!.searchTerm), '+', ' ')}` }
  ]
}

function LoadingResults() {
  return (
    <div className="flex h-screen justify-center">
      <FontAwesomeIcon icon={faSpinner} className="text-center text-zinc-500 h-20 w-20 mx-auto animate-spin object-center"/>
    </div>
  )
}

const SearchResult = () => {
    let { data } = useLoaderData<typeof loader>();
    let nav  = useNavigation();
    
      return (
          <Suspense fallback={<LoadingResults />}>
            <Await resolve={data}>
              {(data)=> (nav.state === "idle") ? <SearchResultsContainer data={data}/> : <LoadingResults />}
            </Await>
          </Suspense>
      ); 
};

export default SearchResult;