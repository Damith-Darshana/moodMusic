import axios from "axios";

// Function to create a new favourite
export const createFavourite = async (track, token) => {
    try {
        const response = await axios.post('http://localhost:8000/api/favourites/', {
            track: { trackid: track.sptfy_id },
            album: { albumid: "album_123" },   // Update these as needed
            artist: { artistid: "artist_123" }, // Update these as needed
            playlist: { playlistid: "playlist_123" } // Update these as needed
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error adding favourite:', error);
    }
};

// Function to delete a favourite by track ID
export const deleteFavourite = async (trackid, token) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/favourites/delete_by_track/${trackid}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error removing favourite:', error);
    }
};

// Function to fetch all track IDs of existing favourites
export const fetchAllTrackIDs = async (token) => {
    try {
        const response = await axios.get('http://localhost:8000/api/favourites/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data.map(fav => fav.track.trackid); // Adjust this if necessary
    } catch (error) {
        console.error('Error fetching existing favourites:', error);
        return [];
    }
};

// Function to sync favourites by adding new ones and removing old ones
export const checkAndUpdateFavourites = async (filteredTracks, token) => {
    const existingFavourites = await fetchAllTrackIDs(token);

    // Create new favourites if they don't exist
    for (const track of filteredTracks) {
        if (!existingFavourites.includes(track.sptfy_id)) {
            await createFavourite(track, token);
        }
    }

    // Remove favourites that no longer exist in filteredTracks
    const idsToRemove = existingFavourites.filter(id => !filteredTracks.some(track => track.sptfy_id === id));

    for (const id of idsToRemove) {
        await deleteFavourite(id, token);
    }
};
