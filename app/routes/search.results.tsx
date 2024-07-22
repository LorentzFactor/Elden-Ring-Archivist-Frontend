import React from 'react';
import { useLoaderData } from '@remix-run/react';
import SearchResultsTable from '../components/SearchResultsTable';

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q');
  
  // simulate waiting for db response
  await new Promise(resolve => setTimeout(resolve, 100));

  const data = [
    {
      "id": "Goods_52",
      "type": "Goods",
      "name": "Silver Serpent Ring",
      "description": "A ring of the silver serpent",
      "img": "https://eldenring.wiki.fextralife.com/file/Elden-Ring/messmer_soldiers_axe_axes_elden_ring_shadow_of_the_erdtree_dlc_wiki_guide_200px.png",
      "external_link": "https://google.com"
    },
    {
      "id": "Goods_53",
      "type": "Goods",
      "name": "Golden Talisman",
      "description": "A talisman of pure gold",
      "img": "https://eldenring.wiki.fextralife.com/file/Elden-Ring/golden_order_talisman_talisman_elden_ring_wiki_guide_200px.png",
      "external_link": "https://google.com"
    },
    {
      "id": "Goods_54",
      "type": "Goods",
      "name": "Dragon Shield",
      "description": "A shield with dragon emblem",
      "img": "https://eldenring.wiki.fextralife.com/file/Elden-Ring/dragoncrest_greatshield_talisman_talisman_elden_ring_wiki_guide_200px.png",
      "external_link": "https://google.com"
    },
    {
      "id": "Goods_55",
      "type": "Goods",
      "name": "Ancient Sword",
      "description": "A sword from ancient times",
      "img": "https://eldenring.wiki.fextralife.com/file/Elden-Ring/ankh_sword_greatsword_elden_ring_wiki_guide_200px.png",
      "external_link": "https://google.com"
    },
    {
      "id": "Goods_56",
      "type": "Goods",
      "name": "Mystic Amulet",
      "description": "An amulet with mystic powers",
      "img": "https://eldenring.wiki.fextralife.com/file/Elden-Ring/mystic_amulet_talisman_elden_ring_wiki_guide_200px.png",
      "external_link": "https://google.com"
    }
  ];

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