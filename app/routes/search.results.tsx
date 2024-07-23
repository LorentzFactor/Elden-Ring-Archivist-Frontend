import React from 'react';
import { useLoaderData } from '@remix-run/react';
import default_index from '../utils/pineconeClient';
import openai from '../utils/openAIClient';
import { redirect } from '@remix-run/node';

type SearchResult = {
  id: string,
  name: string|null
}

const preamble_string="Answer the following question about the lore of the game Elden Ring, using information provided from a data dump of the game's item text.\nPay particular attention to the Caption field, if there is one, as this often contains the most lore.\n\nQuestion:\n"

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q');
  if (!searchTerm) {
    throw redirect('/search')
  }
  
  const embedding_response = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: preamble_string + searchTerm,
    encoding_format: "float",
  });

  const query_vec = embedding_response.data[0].embedding;
  
  const data_matches = await default_index.query({
    vector: query_vec,
    topK: 10,
    includeMetadata: true
  })

  const data: any[] = []
  for (let match of data_matches.matches) {
    let item_data = match.metadata!
    item_data.id = match.id
    data.push(item_data)
  }

  return { data };
};

const SearchResult = () => {
    const { data } = useLoaderData<typeof loader>();
    if (!data || data.length === 0) {
        return <div>No data available</div>;
      }
    
      // Get table headers
      const headers = Object.keys(data[0]);
    
      return (
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ); 
};

export default SearchResult;