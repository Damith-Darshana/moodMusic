// import useSWR from 'swr';
// import { compactNumber } from '@/utils/formatters';
// import LinkCardItem from '@/components/list-items/LinkCardItem';

// const ArtistsTabContent = ({ artists }) => {
//     const { data } = useSWR({ entitiesIds: artists, endpoint: '/api/artist' });

//     return (
//         <ul>
//         {
//             data.map((artist => {
//                 const { id, name, image_url } = artist;
                

//                 return (
//                     <LinkCardItem
//                         key={ id }
//                         title={ name }
//                         imgSrc= { image_url }
//                         href={ `/artist/${ id }` }
//                         description={ `0 Fans | 0 Albums` }
//                     />
//                 );
//             }))
//         }
//         </ul>
//     );
// };

// export default ArtistsTabContent;










import { useContext, useEffect, useState } from "react";
import useSWR from 'swr';
import { compactNumber } from '@/utils/formatters';
import LinkCardItem from '@/components/list-items/LinkCardItem';
import TokenContext from "@/app/context/TokenContext";
import { fetchAllArtistIDs } from "@/utils/fetchers"; // Assuming you have this function

const ArtistsTabContent = () => {
    const { token } = useContext(TokenContext); 
    const [favoriteArtistIDs, setFavoriteArtistIDs] = useState([]);
    const [filteredArtists, setFilteredArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadFavoritesAndArtists = async () => {
            if (!token) return; // Exit if there's no token

            setIsLoading(true); // Reset loading state
            
            try {
                // Fetch favorite artist IDs
                const favoriteIDs = await fetchAllArtistIDs(token); // Implement this function
                setFavoriteArtistIDs(favoriteIDs);

                // Fetch artist details for each favorite ID using the proxy
                const fetchedArtists = await Promise.all(
                    favoriteIDs.map(id => fetch(`/api/artist/${id}`).then(res => res.json()))
                );

                setFilteredArtists(fetchedArtists.filter(Boolean)); // Filter out any null results
            } catch (error) {
                console.error('Error loading favorite artists:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFavoritesAndArtists();
    }, [token]); // Runs on every render if token changes

    if (isLoading) {
        return <div>Loading...</div>;  // Optionally display a loading state
    }

    return (
        <ul>
            {filteredArtists.map((artist) => {
                const { id, name, image_url } = artist;

                return (
                    <LinkCardItem
                        key={id}
                        title={name}
                        imgSrc={image_url}
                        href={`/artist/${id}`}
                        description={`0 Fans | 0 Albums`} // Adjust this if you have real data
                    />
                );
            })}
        </ul>
    );
};

export default ArtistsTabContent;

