import React, { Suspense } from 'react';
import { Await, useLoaderData, useNavigation, MetaFunction } from '@remix-run/react';
import default_index from '../utils/pineconeClient';
import openai from '../utils/openAIClient';
import createRedisClient from '../utils/redisClient';
import getIP from '../utils/getRequestIp';
import replaceAll from '../utils/strReplaceAll';
import { defer, LoaderFunctionArgs } from '@remix-run/node';
import SearchResultsContainer from '../components/SearchResultsTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const preamble_string='';
const namespace = 'raw_text';

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

async function getRelevantLoreItems(searchTerm: string) {
  const embedding_response = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: preamble_string + searchTerm,
    encoding_format: "float",
  });

  const query_vec = embedding_response.data[0].embedding;

  const data_matches = await default_index.namespace(namespace).query({
    vector: query_vec, 
    topK: 50,
    filter: { $and:[{"Name": {$exists: true}}, {"Caption": {$exists: true}}] },
    includeMetadata: true,
    includeValues: false,
  });

  const data: RecordMetadata[] = [];
  for (const match of data_matches.matches) {
    const item_data = match.metadata!;
    item_data.id = match.id;
    data.push(item_data);
  };

  return data;
}

export const loader = async ({
  request,
  params
}: LoaderFunctionArgs) => {
  const searchTerm = params.search_term!;
  const data_promise = getRelevantLoreItems(searchTerm);
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
    const { data } = useLoaderData<typeof loader>();
    const nav  = useNavigation();
    
      return (
          <div>
            <Suspense fallback={<LoadingResults />}>
              <Await resolve={data}>
                {(data)=> (nav.state === "idle") ? <SearchResultsContainer data={data}/> : <LoadingResults />}
              </Await>
            </Suspense>
          </div>
      ); 
};

export default SearchResult;