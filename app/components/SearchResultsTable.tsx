import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

type optional_string = string | undefined | null;

interface ItemData {
    ID: string;
    Name: string;
    item_type: string;
    Caption: optional_string;
    Info: optional_string;
    Info2: optional_string;
    Effect: optional_string;
    Dialog: optional_string;
};

const SearchResult = ({ item_data }: { item_data: ItemData }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div onClick={toggleExpand}
        className={`border-2 border-zinc-300 hover:border-sky-500 rounded-lg px-2 py-0 my-0 bg-white text-zinc-800 text-lg
        transition-transform transform overflow-hidden text-ellipsis whitespace-wrap ${expanded ? '' : 'line-clamp-3 hover:scale-y-105'}`}>
          <div className="justify-self-auto items-center py-0 pl-0 pr-2 inline-flex">
            <span>
                <FontAwesomeIcon
                    icon={expanded ? faMinus : faPlus}
                    className="cursor-pointer text-2xl text-sky-800 px-1"
                />
            </span>
            <span className="font-bold text-2xl text-sky-800">{item_data.Name}</span>
            <span className="text-xl text-sky-500 ml-2">{item_data.item_type}</span>
          </div>
          <span className={`text-zinc-800`}>
            {item_data.Caption}
          </span>
              <div className="mt-2">
                  {item_data.Info && <div className="mt-1">Info: {item_data.Info}</div>}
                  {item_data.Info2 && <div className="mt-1">Secondary Info: {item_data.Info2}</div>}
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
        <div className="container drop-shadow-xl mx-auto grid grid-cols-1 gap-y-1.5 w-3/4 bg-zinc-300 p-3 rounded-lg">
            {data.map((row: ItemData) => (
                <SearchResult item_data={row} />
            ))}
        </div>
    );
};

export default SearchResultsContainer;
