import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

type optional_string = string | undefined | null;

type ItemData = {
    ID: string,
    Name: string,
    item_type: string,
    Caption: optional_string,
    Info: optional_string,
    Info2: optional_string,
    Effect: optional_string,
    Dialog: optional_string,
};

const SearchResult = ({ item_data }: { item_data: ItemData }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div onClick={toggleExpand}
        className={`border border-zinc-300 shadow-lg rounded-lg px-2 py-0 my-0
        transition-transform transform hover:scale-y-105 overflow-hidden text-ellipsis whitespace-wrap ${expanded ? '' : 'line-clamp-2'}`}>
          <div className="justify-self-auto items-center py-0 pl-0 pr-2 inline-flex">
            <FontAwesomeIcon
                icon={expanded ? faMinus : faPlus}
                className="cursor-pointer text-zinc-600 px-1"
            />
            <span className="font-bold text-xl text-zinc-800">{item_data.Name}</span>
            <span className="text-lg text-zinc-500 ml-2">{item_data.item_type}</span>
          </div>
          <span className={`text-gray-600`}>
            {item_data.Caption}
          </span>
              <div className="mt-2 text-gray-700">
                  {item_data.Info && <div className="mt-1">Info: {item_data.Info}</div>}
                  {item_data.Info2 && <div className="mt-1">Info2: {item_data.Info2}</div>}
                  {item_data.Effect && <div className="mt-1">Effect: {item_data.Effect}</div>}
                  {item_data.Dialog && <div className="mt-1">Dialog: {item_data.Dialog}</div>}
              </div>
        </div>
    );
};

type SearchResultsContainerProps = {
    data: ItemData[];
};

const SearchResultsContainer = ({ data }: SearchResultsContainerProps) => {
    if (!data || data.length === 0) {
        return <div className="text-center text-gray-500">No data available</div>;
    }

    return (
        <div className="container mx-auto grid grid-cols-1 gap-4 w-3/4 bg-gray-100 px-4 m-1 rounded-lg">
            {data.map((row: ItemData, index: number) => (
                <SearchResult key={index} item_data={row} />
            ))}
        </div>
    );
};

export default SearchResultsContainer;
