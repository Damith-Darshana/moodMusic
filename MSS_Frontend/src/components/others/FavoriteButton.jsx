// 'use client';
// import { addToFavorites, removeFromFavorites, selectFavorites } from "@/redux/features/favoritesSlice";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { checkAndUpdateFavourites } from "@/utils/favouriteManager"; // Adjust the path as per your folder structure
// import TokenContext from "@/app/context/TokenContext";

// const FavoriteButton = ({ type, id }) => {
//     const dispatch = useDispatch();
//     const favorites = useSelector(selectFavorites);
//     const { token } = useContext(TokenContext);
//     // console.log("Favorites object:", favorites);
//     console.log("Current type:", type);
//     console.log("ID to check:", id);

//     // const isFavorite = favorites[type].find(favoriteId => favoriteId === id);
//     const isFavorite = favorites[type]?.find(favoriteId => favoriteId === id) !== undefined;
//     // console.log("Is favorite:", isFavorite);
//     const handleFavoriteClick = (e) => {
//         e.stopPropagation();

//         isFavorite
//             ? dispatch(removeFromFavorites({ type, id }))
//             : dispatch(addToFavorites({ type, id }));
//     };

//     return (
//         <button
//             className={ isFavorite ? `favorite active` : 'favorite' }
//             onClick={ handleFavoriteClick }
//         >
//             { isFavorite ? <AiFillHeart /> : <AiOutlineHeart /> }
//         </button> 
//     );
// };

// export default FavoriteButton;




// 'use client';
// import { addToFavorites, removeFromFavorites, selectFavorites } from "@/redux/features/favoritesSlice";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";

// const FavoriteButton = ({ type, id }) => {
//     const dispatch = useDispatch();
//     const favorites = useSelector(selectFavorites);

//     // Debugging: Log favorites and the current type to inspect the data
//     console.log("Favorites object:", favorites);
//     console.log("Current type:", type);
//     console.log("ID to check:", id);

//     // Check if favorites[type] exists before calling find, add fallback if undefined
//     const isFavorite = favorites[type]?.find(favoriteId => favoriteId === id) !== undefined;

//     // Debugging: Log whether the item is a favorite
//     console.log("Is favorite:", isFavorite);

//     const handleFavoriteClick = (e) => {
//         e.stopPropagation();

//         // Debugging: Log action dispatch
//         console.log(isFavorite ? "Removing from favorites..." : "Adding to favorites...");

//         isFavorite
//             ? dispatch(removeFromFavorites({ type, id }))
//             : dispatch(addToFavorites({ type, id }));
//     };

//     return (
//         <button
//             className={ isFavorite ? `favorite active` : 'favorite' }
//             onClick={ handleFavoriteClick }
//         >
//             {/* Debugging: Log which icon will be displayed */}
//             { isFavorite ? <AiFillHeart /> : <AiOutlineHeart /> }
//         </button>
//     );
// };

// export default FavoriteButton;









// 'use client';
// import { addToFavorites, removeFromFavorites, selectFavorites } from "@/redux/features/favoritesSlice";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import TokenContext from "@/app/context/TokenContext";
// import { useContext } from "react";

// const FavoriteButton = ({ type, id }) => {
//     const dispatch = useDispatch();
//     const favorites = useSelector(selectFavorites);
//     const { token } = useContext(TokenContext);  // Get the token from context for authenticated requests

//     // Debugging: Log favorites and the current type to inspect the data
//     // console.log("Favorites object:", favorites);
//     // console.log("Current type:", type);
//     // console.log("ID to check:", id);

//     // Check if favorites[type] exists before calling find, add fallback if undefined
//     const isFavorite = favorites[type]?.find(favoriteId => favoriteId === id) !== undefined;

//     // Debugging: Log whether the item is a favorite
//     console.log("Is favorite:", isFavorite);

//     // Function to add favorite to the database
//     const addFavoriteToDatabase = async () => {
//         try {
//             const response = await axios.post('http://localhost:8000/api/favourites/', {
//                 track: { trackid: id },  // Assuming 'id' is the track ID
//                 album: { albumid: "album_123" },   // Update these as needed
//                 artist: { artistid: "artist_123" }, // Update these as needed
//                 playlist: { playlistid: "playlist_123" } // Update these as needed
//             }, {
//                 headers: {
//                     'Authorization': `Token ${token}`,
//                     'Content-Type': 'application/json',
//                 }
//             });
//             console.log('Added to favorites:', response.data);
//         } catch (error) {
//             console.error('Error adding to favorites:', error);
//         }
//     };

//     // Function to remove favorite from the database
//     const removeFavoriteFromDatabase = async () => {
//         try {
//             const response = await axios.delete(`http://localhost:8000/api/favourites/delete_by_track/${id}/`, {
//                 headers: {
//                     'Authorization': `Token ${token}`
//                 }
//             });
//             console.log('Removed from favorites:', response.data);
//         } catch (error) {
//             console.error('Error removing from favorites:', error);
//         }
//     };

//     const handleFavoriteClick = async (e) => {
//         e.stopPropagation();

//         // Debugging: Log action dispatch
//         console.log(isFavorite ? "Removing from favorites..." : "Adding to favorites...");

//         if (isFavorite) {
//             dispatch(removeFromFavorites({ type, id }));
//             await removeFavoriteFromDatabase();  // Remove from database when it's unfavorited
//         } else {
//             dispatch(addToFavorites({ type, id }));
//             await addFavoriteToDatabase();  // Add to database when it's favorited
//         }
//     };

//     return (
//         <button
//             className={isFavorite ? `favorite active` : 'favorite'}
//             onClick={handleFavoriteClick}
//         >
//             {/* Debugging: Log which icon will be displayed */}
//             {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
//         </button>
//     );
// };

// export default FavoriteButton;



// ========================================== work ============================================

// 'use client';
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import TokenContext from "@/app/context/TokenContext";

// const FavoriteButton = ({ type, id }) => {
//     const { token } = useContext(TokenContext);
//     const [favoriteIds, setFavoriteIds] = useState([]);
//     const [isFavorite, setIsFavorite] = useState(false);

//     // Fetch all favorite IDs when the component mounts
//     useEffect(() => {
//         const fetchFavorites = async () => {
//             if (!token) return;

//             try {
//                 const response = await axios.get('http://localhost:8000/api/favourites/tracks/', {
//                     headers: {
//                         'Authorization': `Token ${token}`
//                     }
//                 });
//                 const ids = response.data.map(fav => fav.trackid);
//                 setFavoriteIds(ids);
//                 console.log("Fetched favorite IDs:", ids);
                
//                 // Check if the current track ID is a favorite
//                 const favoriteStatus = ids.includes(String(id));
//                 setIsFavorite(favoriteStatus);
//                 // console.log(`Is track ID ${id} favorite?`, favoriteStatus);
//             } catch (error) {
//                 console.error('Error fetching existing favorites:', error);
//             }
//         };

//         fetchFavorites();
//     }, [token, id]);

//     const addFavoriteToDatabase = async () => {
//         try {
//             const response = await axios.post('http://localhost:8000/api/favourites/tracks/', {
//                trackid: id 

//             }, {
//                 headers: {
//                     'Authorization': `Token ${token}`,
//                     'Content-Type': 'application/json',
//                 }
//             });
//             console.log('Added to favorites:', response.data);
//             // Update local state
//             setFavoriteIds(prevIds => [...prevIds, id]);
//             setIsFavorite(true);
//         } catch (error) {
//             console.error('Error adding to favorites:', error);
//         }
//     };

//     const removeFavoriteFromDatabase = async () => {
//         try {
//             const response = await axios.delete(`http://localhost:8000/api/favourites/tracks/delete/${id}/`, {
//                 headers: {
//                     'Authorization': `Token ${token}`
//                 }
//             });
//             console.log('Removed from favorites:', response);
//             // Update local state
//             setFavoriteIds(prevIds => prevIds.filter(favId => favId !== id));
//             setIsFavorite(false);
//         } catch (error) {
//             console.error('Error removing from favorites:', error);
//         }
//     };

//     const handleFavoriteClick = async (e) => {
//         e.stopPropagation();
//         // console.log(`Favorite button clicked for track ID ${id}. Current state:`, isFavorite);

//         if (isFavorite) {
//             await removeFavoriteFromDatabase();
//         } else {
//             await addFavoriteToDatabase();
//         }
//     };

//     return (
//         <button
//             className={isFavorite ? `favorite active` : 'favorite'}
//             onClick={handleFavoriteClick}
//         >
//             {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
//         </button>
//     );
// };

// export default FavoriteButton;




// ================================================================================
'use client';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import TokenContext from "@/app/context/TokenContext";


const FavoriteButton = ({ type, id,sptfy_id }) => {
    
    console.log(`type is:`, id);
    const { token } = useContext(TokenContext);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    // Determine the correct API endpoints based on the type
    const apiEndpoints = {
        track: {
            list: 'http://localhost:8000/api/favourites/tracks/',
            delete: `http://localhost:8000/api/favourites/tracks/delete/${id}/`
        },
        artist: {
            list: 'http://localhost:8000/api/favourites/artists/',
            delete: `http://localhost:8000/api/favourites/artists/delete/${id}/`
        },
        album: {
            list: 'http://localhost:8000/api/favourites/albums/',
            delete: `http://localhost:8000/api/favourites/albums/delete/${id}/`
        },
        playlist: {
            list: 'http://localhost:8000/api/favourites/playlists/',
            delete: `http://localhost:8000/api/favourites/playlists/delete/${id}/`
        }
    };

    const currentApi = apiEndpoints[type];  // Get the correct API endpoints for the type

    // Fetch all favorite IDs when the component mounts
    useEffect(() => {
        const fetchFavorites = async () => {
            if (!token || !currentApi) return;

            try {
                const response = await axios.get(currentApi.list, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                // const ids = response.data.map(fav => fav[`${type}id`]); // Adapt to dynamic types
                const ids = response.data.map(fav => fav.favid)
                setFavoriteIds(ids);
                console.log('Response data:', response.data);
                // console.log(`Fetched favorite ${type} IDs:`, ids);

                // Check if the current ID is a favorite
                const favoriteStatus = ids.includes(String(id));
                setIsFavorite(favoriteStatus);
            } catch (error) {
                console.error(`Error fetching existing favorites for ${type}:`, error);
            }
        };

        fetchFavorites();
    }, [token, id, type]);  // Re-run when token, id, or type changes

    // const addFavoriteToDatabase = async () => {
    //     if (!currentApi) return;  // Ensure the type is valid

    //     try {
    //         const response = await axios.post(currentApi.list, {
    //             favid: id // Send the correct field based on type
    //         }, {
    //             headers: {
    //                 'Authorization': `Token ${token}`,
    //                 'Content-Type': 'application/json',
    //             }
    //         });
    //         // console.log(`Added ${type} to favorites:`, response.data);
    //         // Update local state
    //         setFavoriteIds(prevIds => [...prevIds, id]);
    //         setIsFavorite(true);
    //     } catch (error) {
    //         console.error(`Error adding ${type} to favorites:`, error);
    //     }
    // };

    const addFavoriteToDatabase = async () => {
        if (!currentApi) {
            console.warn("No valid API found. Aborting the operation.");
            return;  // Ensure the type is valid
        }
    
        console.log("Adding to favorites. ID:", id, "API:", currentApi.list);
    
        try {
            const response = await axios.post(currentApi.list, {
                favid: id // Send the correct field based on type
            }, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            
            // Log response data
            console.log(`Added ${type} to favorites:`, response.data);
            
            // Update local state
            setFavoriteIds(prevIds => {
                const updatedIds = [...prevIds, id];
                console.log("Updated favorite IDs:", updatedIds);
                return updatedIds;
            });
            setIsFavorite(true);
        } catch (error) {
            console.error(`Error adding ${type} to favorites:`, error);
            // You may want to display a user-friendly message or toast here
        }
    };
    

    const removeFavoriteFromDatabase = async () => {
        if (!currentApi) return;  // Ensure the type is valid

        try {
            const response = await axios.delete(currentApi.delete, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            // console.log(`Removed ${type} from favorites:`, response);
            // Update local state
            setFavoriteIds(prevIds => prevIds.filter(favId => favId !== id));
            setIsFavorite(false);
        } catch (error) {
            console.error(`Error removing ${type} from favorites:`, error);
        }
    };

    // const handleFavoriteClick = async (e) => {
    //     e.stopPropagation();

    //     if (isFavorite) {
    //         await removeFavoriteFromDatabase();
    //     } else {
    //         await addFavoriteToDatabase();
    //     }
    // };

    const handleFavoriteClick = async (e) => {
        e.stopPropagation();
        
        // Log the event and current state
        console.log("Favorite button clicked, isFavorite:", isFavorite);
    
        try {
            if (isFavorite) {
                console.log("Removing from favorites");
                await removeFavoriteFromDatabase();
                console.log("Removed from favorites");
            } else {
                console.log("Adding to favorites");
                await addFavoriteToDatabase();
                console.log("Added to favorites");
            }
        } catch (error) {
            console.error("Error in handleFavoriteClick:", error);
        }
    };
    

    return (
        <button
            className={isFavorite ? `favorite active` : 'favorite'}
            onClick={handleFavoriteClick}
        >
            {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
    );
};

export default FavoriteButton;
