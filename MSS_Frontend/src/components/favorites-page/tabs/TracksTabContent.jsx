// import useSWR from "swr";
// import TrackListContainer from "@/components/others/TrackListContainer";

// =================================V0

// const TracksTabContent = ({ tracks }) => {
//     // console.log('TracksTabContent Component Rendered');
//     // console.log('Initial tracks:', tracks);

//     const { data } = useSWR({ entitiesIds: tracks, endpoint: '/api/track' })
//     let datas= data?.[0]
//     let ids = tracks
    
//     const filteredTracks = datas.filter(track => ids.includes(track.id));

//     console.log('Filtered Tracks for favourite page:', filteredTracks);
//     return (
//         <TrackListContainer tracks={ filteredTracks } />
//     );
// }

// export default TracksTabContent;



// =================================V1

// import useSWR from "swr";
// import TrackListContainer from "@/components/others/TrackListContainer";

// const TracksTabContent = ({ tracks }) => {
//     const { data, error } = useSWR({ entitiesIds: tracks, endpoint: '/api/track' });

//     // Log initial data and error for debugging
//     console.log('Initial tracks:', tracks);
//     if (error) {
//         console.error('Error fetching tracks:', error);
//         return <div>Error loading tracks</div>;
//     }

//     const filteredTracks = data?.[0] ? data[0].filter(track => tracks.includes(track.id)) : [];

//     // Log each track's id
//     filteredTracks.forEach(track => {
//         console.log('filteredTracks sptfy_id ID:', track.sptfy_id);
//     });

//     console.log('Filtered Tracks for favourite page:', filteredTracks);
    
//     return <TrackListContainer tracks={filteredTracks} />;
// };

// export default TracksTabContent;






// =================================V2


// import useSWR from "swr";
// import TrackListContainer from "@/components/others/TrackListContainer";
// import axios from "axios";

// const TracksTabContent = ({ tracks }) => {
//     const { data, error } = useSWR({ entitiesIds: tracks, endpoint: '/api/track' });

//     // Log initial data and error for debugging
//     console.log('Initial tracks:', tracks);
//     if (error) {
//         console.error('Error fetching tracks:', error);
//         return <div>Error loading tracks</div>;
//     }

//     const filteredTracks = data?.[0] ? data[0].filter(track => tracks.includes(track.id)) : [];

//     // Log each track's sptfy_id
//     filteredTracks.forEach(track => {
//         console.log('Filtered Track sptfy_id:', track.sptfy_id);
//     });

//     const token = '52ad9eecf35b396a32c44b6b8da4b843cdbb6e84'; // Replace with your actual token

//     const createFavourite = async (track) => {
//         try {
//             const response = await axios.post('http://localhost:8000/api/favourites/', {
//                 track: { trackid: track.sptfy_id }, // Use the sptfy_id here
//                 album: { albumid: "album_123" },   // Update these as needed
//                 artist: { artistid: "artist_123" }, // Update these as needed
//                 playlist: { playlistid: "playlist_123" } // Update these as needed
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Token ${token}`
//                 }
//             });

//             console.log('Favourite added:', response.data);
//         } catch (error) {
//             console.error('Error adding favourite:', error);
//         }
//     };

//     // Function to check if sptfy_id exists in the database
//     const checkAndCreateFavourites = async () => {
//         for (const track of filteredTracks) {
//             // Assume we have a function to check if the sptfy_id exists
//             const exists = await checkIfExistsInDatabase(track.sptfy_id);
//             if (!exists) {
//                 await createFavourite(track);
//             } else {
//                 console.log(`Track with sptfy_id ${ exists } already exists in the database.`);
//             }
//         }
//     };

//     // Function to check if sptfy_id exists in the database
//     const checkIfExistsInDatabase = async (sptfy_id) => {
//         try {
//             const response = await axios.get(`http://localhost:8000/api/favourites/`, {
//                 headers: {
//                     'Authorization': `Token ${token}`
//                 }
//             });

//             // Check if any trackid in the response matches the sptfy_id
//             const exists = response.data.some(favourite => favourite.track.trackid === sptfy_id);
//             return exists;
//         } catch (error) {
//             console.error('Error checking existence:', error);
//             return false; // Return false if there's an error
//         }
//     };


//     // Call the function to check and create favourites when needed
//     checkAndCreateFavourites();

//     console.log('Filtered Tracks for favourite page:', filteredTracks);
    
//     return <TrackListContainer tracks={filteredTracks} />;
// };

// export default TracksTabContent;





// =================================V3


// import useSWR from "swr";
// import TrackListContainer from "@/components/others/TrackListContainer";
// import axios from "axios";

// const TracksTabContent = ({ tracks }) => {
//     const { data, error } = useSWR({ entitiesIds: tracks, endpoint: '/api/track' });

//     // Log initial data and error for debugging
//     console.log('Initial tracks:', tracks);
//     if (error) {
//         console.error('Error fetching tracks:', error);
//         return <div>Error loading tracks</div>;
//     }

//     const filteredTracks = data?.[0] ? data[0].filter(track => tracks.includes(track.id)) : [];

//     // Log each track's sptfy_id
//     filteredTracks.forEach(track => {
//         console.log('Filtered Track sptfy_id:', track.sptfy_id);
//     });

//     const token = '52ad9eecf35b396a32c44b6b8da4b843cdbb6e84'; // Replace with your actual token

//     const createFavourite = async (track) => {
//         try {
//             const response = await axios.post('http://localhost:8000/api/favourites/', {
//                 track: { trackid: track.sptfy_id },
//                 album: { albumid: "album_123" },   // Update these as needed
//                 artist: { artistid: "artist_123" }, // Update these as needed
//                 playlist: { playlistid: "playlist_123" } // Update these as needed
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Token ${token}`
//                 }
//             });

//             console.log('Favourite added:', response.data);
//         } catch (error) {
//             console.error('Error adding favourite:', error);
//         }
//     };

//     const deleteFavourite = async (trackid) => {
//         try {
//             const response = await axios.delete(`http://localhost:8000/api/favourites/delete_by_track/${trackid}/`, {
//                 headers: {
//                     'Authorization': `Token ${token}`
//                 }
//             });

//             console.log('Favourite removed:', response.data);
//         } catch (error) {
//             console.error('Error removing favourite:', error);
//         }
//     };

//     // Function to check if sptfy_id exists in the database
//     const checkIfExistsInDatabase = async (sptfy_id) => {
//         try {
//             const response = await axios.get(`http://localhost:8000/api/favourites/`, {
//                 headers: {
//                     'Authorization': `Token ${token}`
//                 }
//             });

//             // Return the favourite entry if found
//             const favourite = response.data.find(favourite => favourite.track.trackid === sptfy_id);
//             return favourite;
//         } catch (error) {
//             console.error('Error checking existence:', error);
//             return null; // Return null if there's an error
//         }
//     };

//     const checkAndUpdateFavourites = async () => {
//         const existingFavourites = await Promise.all(
//             filteredTracks.map(track => checkIfExistsInDatabase(track.sptfy_id))
//         );
    
//         // Create new favourites if they don't exist
//         for (const track of filteredTracks) {
//             const favourite = existingFavourites.find(fav => fav?.track.trackid === track.sptfy_id);
//             if (!favourite) {
//                 await createFavourite(track);
//             }
//         }
    
//         // Remove favourites that no longer exist in filteredTracks
//         const existingIds = existingFavourites
//             .filter(fav => fav) // Filter out any undefined values
//             .map(fav => fav.track.trackid);
            
//         const idsToRemove = existingIds.filter(id => !filteredTracks.some(track => track.sptfy_id === id));
    
//         for (const id of idsToRemove) {
//             await deleteFavourite(id);
//         }
//     };
    

//     // Call the function to check and update favourites when needed
//     checkAndUpdateFavourites();

//     console.log('Filtered Tracks for favourite page:', filteredTracks);
    
//     return <TrackListContainer tracks={filteredTracks} />;
// };

// export default TracksTabContent;







// =================================V4





// import useSWR from "swr";
// import TrackListContainer from "@/components/others/TrackListContainer";
// import axios from "axios";
// import TokenContext from "@/app/context/TokenContext";
// import { useContext } from "react";

// const TracksTabContent = ({ tracks }) => {
//     const { token } = useContext(TokenContext);
//     const { data, error } = useSWR({ entitiesIds: tracks, endpoint: '/api/track' });

//     // Log initial data and error for debugging
//     console.log('Initial tracks:', tracks);
//     if (error) {
//         console.error('Error fetching tracks:', error);
//         return <div>Error loading tracks</div>;
//     }

//     const filteredTracks = data?.[0] ? data[0].filter(track => tracks.includes(track.id)) : [];

//     // Log each track's sptfy_id
//     filteredTracks.forEach(track => {
//         console.log('Filtered Track sptfy_id:', track.sptfy_id);
//     });

//     // const token = '52ad9eecf35b396a32c44b6b8da4b843cdbb6e84'; // Replace with your actual token

//     const createFavourite = async (track) => {
//         try {
//             const response = await axios.post('http://localhost:8000/api/favourites/', {
//                 track: { trackid: track.sptfy_id },
//                 album: { albumid: "album_123" },   // Update these as needed
//                 artist: { artistid: "artist_123" }, // Update these as needed
//                 playlist: { playlistid: "playlist_123" } // Update these as needed
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Token ${token}`
//                 }
//             });

//             // console.log('Favourite added:', response.data);
//         } catch (error) {
//             console.error('Error adding favourite:', error);
//         }
//     };

//     const deleteFavourite = async (trackid) => {
//         try {
//             const response = await axios.delete(`http://localhost:8000/api/favourites/delete_by_track/${trackid}/`, {
//                 headers: {
//                     'Authorization': `Token ${token}`
//                 }
//             });

//             console.log('Favourite removed:', response.data);
//         } catch (error) {
//             console.error('Error removing favourite:', error);
//         }
//     };

//     // Function to fetch all existing track IDs from the database
//     const fetchAllTrackIDs = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/favourites/', {
//                 headers: {
//                     'Authorization': `Token ${token}`
//                 }
//             });
//             return response.data.map(fav => fav.track.trackid); // Adjust if necessary
//         } catch (error) {
//             console.error('Error fetching existing favourites:', error);
//             return [];
//         }
//     };

//     const checkAndUpdateFavourites = async () => {
//         const existingFavourites = await fetchAllTrackIDs();
    
//         // Create new favourites if they don't exist
//         for (const track of filteredTracks) {
//             if (!existingFavourites.includes(track.sptfy_id)) {
//                 await createFavourite(track);
//             }
//         }
    
//         // Remove favourites that no longer exist in filteredTracks
//         const idsToRemove = existingFavourites.filter(id => !filteredTracks.some(track => track.sptfy_id === id));
    
//         for (const id of idsToRemove) {
//             await deleteFavourite(id);
//         }
//     };

//     // Call the function to check and update favourites when needed
//     checkAndUpdateFavourites();

//     console.log('Filtered Tracks for favourite page:', filteredTracks);
    
//     return <TrackListContainer tracks={filteredTracks} />;
// };

// export default TracksTabContent;



// ==============================================v5====================


// import useSWR from "swr";
// import TrackListContainer from "@/components/others/TrackListContainer";
// import TokenContext from "@/app/context/TokenContext";
// import { useContext, useEffect } from "react";
// import { checkAndUpdateFavourites } from "@/utils/favouriteManager"; // Adjust the path as per your folder structure

// const TracksTabContent = ({ tracks }) => {
//     const { token } = useContext(TokenContext);
//     const { data, error } = useSWR({ entitiesIds: tracks, endpoint: '/api/track' });

//     // Log initial data and error for debugging
//     console.log('Initial tracks:', tracks);
//     if (error) {
//         console.error('Error fetching tracks:', error);
//         return <div>Error loading tracks</div>;
//     }

//     const filteredTracks = data?.[0] ? data[0].filter(track => tracks.includes(track.id)) : [];

//     // Log each track's sptfy_id
//     filteredTracks.forEach(track => {
//         console.log('Filtered Track sptfy_id:', track.sptfy_id);
//     });

//     // Call checkAndUpdateFavourites when filteredTracks are ready and token is available
//     // useEffect(() => {
//     //     if (filteredTracks.length > 0 && token) {
//     //         checkAndUpdateFavourites(filteredTracks, token);
//     //     }
//     // }, [filteredTracks, token]);

//     console.log('Filtered Tracks for favourite page:', filteredTracks);
    
//     return <TrackListContainer tracks={filteredTracks} />;
// };

// export default TracksTabContent;



// =======================================================

// import useSWR from "swr";
// import TrackListContainer from "@/components/others/TrackListContainer";
// import axios from "axios";
// import TokenContext from "@/app/context/TokenContext";
// import { useContext, useEffect, useState } from "react";
// import { fetchTrackById } from "@/utils/fetchers"; // Assuming you have a fetcher to get track data by ID
// import { fetchAllTrackIDs } from "@/utils/fetchers"; // Move fetchAllTrackIDs to utils/fetchers

// const TracksTabContent = ({ tracks }) => {
//     const { token } = useContext(TokenContext);  // Get the token from context
//     const [filteredTracks, setFilteredTracks] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const loadFavoritesAndTracks = async () => {
//             try {
//                 // Fetch all favorite track IDs
//                 const favoriteTrackIDs = await fetchAllTrackIDs(token);
//                 console.log(' favorites favoriteTrackIDs:', favoriteTrackIDs);
//                 // Fetch full track data for each favorite track ID
//                 const favoriteTracksPromises = favoriteTrackIDs.map(id => fetchTrackById(id, token));
//                 const favoriteTracks = await Promise.all(favoriteTracksPromises);

//                 // Filter tracks based on the passed "tracks" prop
//                 const filtered = favoriteTracks.filter(track => tracks.includes(track.id));
//                 setFilteredTracks(filtered);
//             } catch (error) {
//                 console.error('Error loading favorite tracks:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         // Call the function to load data on component mount
//         loadFavoritesAndTracks();
//     }, [tracks, token]);

//     if (isLoading) {
//         return <div>Loading...</div>;  // Optionally display a loading state
//     }

//     return (
//         <TrackListContainer tracks={filteredTracks} />
//     );
// };

// export default TracksTabContent;



// ====================================================================

// import { useContext, useEffect, useState } from "react";
// import useSWR from "swr";
// import TrackListContainer from "@/components/others/TrackListContainer";
// import TokenContext from "@/app/context/TokenContext";
// import { fetchTrackById } from "@/utils/fetchers"; 
// import { fetchAllTrackIDs } from "@/utils/fetchers"; 

// const TracksTabContent = ({ tracks }) => {
//     const { token } = useContext(TokenContext); 
//     const [filteredTracks, setFilteredTracks] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const loadFavoritesAndTracks = async () => {
//             if (!token) return; // Exit if there's no token

//             setIsLoading(true); // Reset loading state
            
//             try {
//                 const favoriteTrackIDs = await fetchAllTrackIDs(token);
//                 // console.log(' favorites favoriteTrackIDs:', favoriteTrackIDs);
//                 const favoriteTracksPromises = favoriteTrackIDs.map(id => fetchTrackById(id, token));
//                 // console.log(' favorites favoriteTracksPromisess:', favoriteTracksPromises);
//                 const favoriteTracks = await Promise.all(favoriteTracksPromises);
//                 // console.log(' favorites favoriteTracks:', favoriteTracks);

//                 const filtered = favoriteTracks.filter(track => tracks.includes(track.id));
//                 console.log(' favorites filtered:', filtered);
//                 setFilteredTracks(filtered);
//             } catch (error) {
//                 console.error('Error loading favorite tracks:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         loadFavoritesAndTracks();
//     }, [tracks, token]); // Runs on every render if tracks or token changes

//     if (isLoading) {
//         return <div>Loading...</div>;  // Optionally display a loading state
//     }

//     return (
//         <TrackListContainer tracks={filteredTracks} />
//     );
// };

// export default TracksTabContent;








import { useContext, useEffect, useState } from "react";
import TrackListContainer from "@/components/others/TrackListContainer";
import TokenContext from "@/app/context/TokenContext";
import { fetchTracksptfyById, fetchAllTrackIDs } from "@/utils/fetchers"; 

const TracksTabContent = ({ tracks }) => {
    const { token } = useContext(TokenContext); 
    const [filteredTracks, setFilteredTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadFavoritesAndTracks = async () => {
            if (!token) return; // Exit if there's no token

            setIsLoading(true); // Reset loading state
            
            try {
                // Fetch favorite track IDs
                const favoriteTrackIDs = await fetchAllTrackIDs(token);
                // console.log('Fetched favorite track IDs:', favoriteTrackIDs);

                // Fetch favorite tracks based on favorite track IDs
                const favoriteTracksPromises = favoriteTrackIDs.map(id => fetchTracksptfyById(id, token));
                const favoriteTracks = await Promise.all(favoriteTracksPromises);
                // console.log('Fetched favorite tracks:', favoriteTracks);

                setFilteredTracks(favoriteTracks);
            } catch (error) {
                console.error('Error loading favorite tracks:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFavoritesAndTracks();
    }, [tracks, token]); // Runs on every render if tracks or token changes

    if (isLoading) {
        return <div>Loading...</div>;  // Optionally display a loading state
    }

    return (
        <TrackListContainer tracks={filteredTracks} />
    );
};

export default TracksTabContent;
