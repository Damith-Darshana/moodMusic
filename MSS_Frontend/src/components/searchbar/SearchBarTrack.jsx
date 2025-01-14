'use client';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import SearchResults from './searchTrack';

const SearchBar = ({ onSelectTrack }) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className='searchbar'>
            <AiOutlineSearch />
            <input
            className='searchbarx'
                type="text"
                placeholder='Search for songs, artists...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {/* Pass onSelectTrack to SearchResults */}
            <SearchResults query={searchQuery} onSelectTrack={onSelectTrack} />
        </div>
    );
};

export default SearchBar;
