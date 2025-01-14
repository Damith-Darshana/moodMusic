// import useSWR from 'swr';
// import PlaylistListItem from '@/components/list-items/PlaylistListItem';

// const PlaylistsTabContent = ({ playlists }) => {
//     const { data } = useSWR({ entitiesIds: playlists, endpoint: '/api/playlist' });

//     return (
//         <ul>
//         {
//             data.map(playlist => {
//                 // const { id, title, picture_medium } = playlist;
//                 const { id, title } = playlist;

//                 return (
//                     <PlaylistListItem
//                         id={ id }
//                         key={ id }
//                         title={ title }
//                         // imgSrc={ picture_medium }
//                         // creationDate={ creation_date }
//                     />
//                 );
//             })
//         }
//         </ul>
//     );
// };

// export default PlaylistsTabContent;















// import PlaylistListItem from '@/components/list-items/PlaylistListItem';

// import { fetchPlaylistById, fetchAllPlaylistIDs } from "@/utils/fetchers"; 
// import TokenContext from "@/app/context/TokenContext";
// import { useContext, useEffect, useState } from "react";

// const PlaylistsTabContent = ({ playlists }) => {
//     const { token } = useContext(TokenContext); 
//     const [filteredTracks, setFilteredTracks] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);




//     useEffect(() => {
//         const loadFavoritesAndTracks = async () => {
//             if (!token) return; // Exit if there's no token
//             // console.log('Fetched playlists:', favoriteTrackIDs);
//             setIsLoading(true); // Reset loading state
            
//             try {
//                 // Fetch favorite track IDs
//                 const favoriteTrackIDs = await fetchAllPlaylistIDs(token);
//                 console.log('Fetched playlists:', favoriteTrackIDs);

//                 // Fetch favorite tracks based on favorite track IDs
//                 const favoriteTracksPromises = favoriteTrackIDs.map(id => fetchPlaylistById(id));
//                 const favoriteTracks = await Promise.all(favoriteTracksPromises);
//                 console.log('Fetched favorite tracks:', favoriteTracks);

//                 setFilteredTracks(favoriteTracks);
//             } catch (error) {
//                 console.error('Error loading favorite tracks:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         loadFavoritesAndTracks();
//     }, [ token]); // Runs on every render if tracks or token changes

//     if (isLoading) {
//         return <div>Loading...</div>;  // Optionally display a loading state
//     }


//     return (
//         <ul>
//         {
//             filteredTracks.map(playlist => {
//                 // const { id, title, picture_medium } = playlist;
//                 const { id, title } = playlist;

//                 return (
//                     <PlaylistListItem
//                         id={ id }
//                         key={ id }
//                         title={ title }
//                         // imgSrc={ picture_medium }
//                         // creationDate={ creation_date }
//                     />
//                 );
//             })
//         }
//         </ul>
//     );
// };

// export default PlaylistsTabContent;










import { useContext, useEffect, useState } from "react";
import PlaylistListItem from '@/components/list-items/PlaylistListItem';
import TokenContext from "@/app/context/TokenContext";
import { fetchAllPlaylistIDs } from "@/utils/fetchers"; 

const PlaylistsTabContent = () => {
    const { token } = useContext(TokenContext); 
    const [favoritePlaylistIDs, setFavoritePlaylistIDs] = useState([]);
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadFavoritesAndPlaylists = async () => {
            if (!token) return; // Exit if there's no token

            setIsLoading(true); // Reset loading state
            
            try {
                // Fetch favorite playlist IDs
                const favoriteIDs = await fetchAllPlaylistIDs(token);
                setFavoritePlaylistIDs(favoriteIDs);

                // Fetch playlist details for each favorite ID using the proxy
                const fetchedPlaylists = await Promise.all(
                    favoriteIDs.map(id => fetch(`/api/playlist/${id}`).then(res => res.json()))
                );
                console.log('playlsts',favoriteIDs)
                setFilteredPlaylists(fetchedPlaylists.filter(Boolean)); // Filter out any null results
            } catch (error) {
                console.error('Error loading favorite playlists:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFavoritesAndPlaylists();
    }, [token]); // Runs on every render if token changes

    if (isLoading) {
        return <div>Loading...</div>;  // Optionally display a loading state
    }

    return (
        <ul>
            {
            
            filteredPlaylists.map(playlist => {
                                const { id, name, playlist_image_url } = playlist;
                                // const { id, title } = playlist;
                                const imgSrc = playlist_image_url || '/images/image1.jpg';
                                return (
                                    <PlaylistListItem
                                        id={ id }
                                        key={ id }
                                        title={ name }
                                        imgSrc={ playlist_image_url }
                                        // creationDate={ creation_date }
                                    />
                                );
                            })
            
            }
        </ul>
    );
};

export default PlaylistsTabContent;
