// import useSWR from 'swr';
// import { getYearFromDate } from '@/utils/formatters';
// import LinkCardItem from '@/components/list-items/LinkCardItem';

// const AlbumsTabContent = ({ albums }) => {
//     console.log('Initial albums:', albums);
//     const { data } = useSWR({ entitiesIds: albums, endpoint: '/api/album' });
//     // let datas= data?.[0]
//     // let ids = albums
//     console.log('Initial data:', data);
//     return (
//         <ul>
//         {/* {
//             data.map((album) => {
//                 const { id, title, image_url, release_date } = album;
//                 const releaseYear = getYearFromDate(release_date);
                
//                 return (
//                     <LinkCardItem
//                         key={ id }
//                         title={ title }
//                         imgSrc={ image_url }
//                         href={ `/album/${ id }` }
//                         description={ `Album  | ${ releaseYear }` }
//                     />
//                 );
//             })
//         } */}

// {
//     data.map((albumArray) => {
//         // Access the zeroth element from each album array
//         const album = albumArray[0]; // Zeroth element of the nested array

//         if (album) {
//             const { id, title, image_url, release_date } = album;
//             const releaseYear = getYearFromDate(release_date);
        
//             return (
//                 <LinkCardItem
//                     key={id}
//                     title={title}
//                     imgSrc={image_url}
//                     href={`/album/${id}`}
//                     description={`Album | ${releaseYear}`}
//                 />
//             );
//         } else {
//             return null; // If the zeroth element is not available, return null
//         }
//     })
// }

//         </ul>
//     );
// };

// export default AlbumsTabContent;








import LinkCardItem from '@/components/list-items/LinkCardItem';
import { useContext, useEffect, useState } from "react";
import PlaylistListItem from '@/components/list-items/PlaylistListItem';
import TokenContext from "@/app/context/TokenContext";
import { fetchAllAlbumIDs } from "@/utils/fetchers"; 

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
                const favoriteIDs = await fetchAllAlbumIDs(token);
                setFavoritePlaylistIDs(favoriteIDs);

                // Fetch playlist details for each favorite ID using the proxy
                const fetchedPlaylists = await Promise.all(
                    favoriteIDs.map(id => fetch(`/api/album/${id}`).then(res => res.json()))
                );
                
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
    console.log('albums',filteredPlaylists)
    return (
        <ul>
            {
            
            filteredPlaylists.map(playlist => {
                                const album = playlist[0];
                                const { id, title, image_url } = album;
                                // const { id, title } = playlist;
                                const imgSrc = image_url || '/images/image1.jpg';
                                return (
                                    // <PlaylistListItem
                                    //     id={ id }
                                    //     key={ id }
                                    //     title={ title }
                                    //     imgSrc={ image_url }
                                    //     // creationDate={ creation_date }
                                    // />

                                    <LinkCardItem
                                                key={id}
                                                title={title}
                                                imgSrc={image_url}
                                                href={`/album/${id}`}
                                                // description={`Album | ${releaseYear}`}
                                            />
                                );
                            })
            
            }
        </ul>
    );
};

export default PlaylistsTabContent;
