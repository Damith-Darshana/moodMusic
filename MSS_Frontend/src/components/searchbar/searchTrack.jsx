'use client';
import useSWR from 'swr';
import SearchResultItem from './SearchResultItemTrack';

const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return await response.json();
};

const SearchResults = ({ query, onSelectTrack }) => {
    const { data: results = [], error, isLoading } = useSWR(
        query ? `http://127.0.0.1:8000/api/search/?search=${query}` : null,
        fetcher
    );

    return (
        <>
        {query && (
            <div className='search-results-container'>
                {isLoading && <strong>Loading...</strong>}
                {error && <strong>Something went wrong...</strong>}

                {results.length > 0 ? (
                    <ul>
                        {results.map(result => (
                            <SearchResultItem
                                key={result.trackid || result.id}
                                type="track"
                                result={result}
                                onSelect={() => onSelectTrack(result.sptfy_id)}  // Pass track ID when selected
                            />
                        ))}
                    </ul>
                ) : (
                    <span className='not-found-error'>Item not found. Please try a different search term.</span>
                )}
            </div>
        )}
        </>
    );
};

export default SearchResults;
