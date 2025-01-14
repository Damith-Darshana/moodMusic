// 'use client';
// import useSWR from 'swr';
// import SearchResultItem from './SearchResultItem';

// const SearchResults = ({ query }) => {
//     const { data: resultsObj = {}, error, isLoading } = useSWR(query, async () => {
//         const response = await fetch(`http://127.0.0.1:8000/api/search/?search=${ query }`);
//         console.log('search is',response.json)
//         return await response.json();
//     });

//     return (
//         <>
//         {
//             query &&
//             <div className='search-results-container'>
//                 { isLoading && <strong>Loading...</strong>}

//                 { error && <strong>Something went wrong...</strong>}

//                 {
//                     Object.keys(resultsObj).map(type => {
//                         return (
//                             <div key={ type }>
//                                 <strong>{ type + 's' }</strong>

//                                 <ul>
//                                     {
//                                         ! resultsObj[type].length ?
//                                             <span className='not-found-error'>Item not found. Please try a different search term.</span>
//                                         :
//                                             resultsObj[type].map(result =>
//                                                 <SearchResultItem
//                                                     key={ result.id }
//                                                     type={ type }
//                                                     result={ result }
//                                                 />
//                                             )
//                                     }
//                                 </ul>
//                             </div>
//                         );
//                     })
//                 }
//             </div>
//         }
//         </>
//     );
// };

// export default SearchResults;



// 'use client';
// import useSWR from 'swr';
// import SearchResultItem from './SearchResultItem';

// const fetcher = async (url) => {
//     const response = await fetch(url);
//     if (!response.ok) {
//         throw new Error('Failed to fetch');
//     }
//     return await response.json();
// };

// const SearchResults = ({ query }) => {
//     const { data: results = [], error, isLoading } = useSWR(
//         query ? `http://127.0.0.1:8000/api/search/?search=${query}` : null,
//         fetcher
//     );

//     return (
//         <>
//         {query && (
//             <div className='search-results-container'>
//                 {isLoading && <strong>Loading...</strong>}
//                 {error && <strong>Something went wrong...</strong>}

//                 {results.length > 0 ? (
//                     <ul>
//                         {results.map(result => (
//                             <SearchResultItem
//                                 key={result.trackid || result.id}
//                                 type="track"
//                                 result={result}
//                             />
//                         ))}
//                     </ul>
//                 ) : (
//                     <span className='not-found-error'>Item not found. Please try a different search term.</span>
//                 )}
//             </div>
//         )}
//     </>




//     );
// };

// export default SearchResults;




'use client';
import useSWR from 'swr';
import SearchResultItem from './SearchResultItem';

const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return await response.json();
};

const SearchResults = ({ query }) => {
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






