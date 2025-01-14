// import { notFound } from "next/navigation";

// const base = 'https://api.deezer.com';

// async function fetchData(endpoint) {
//     const response = await fetch(base + endpoint);
//     const data = await response.json();

//     // Deezer API internal notfound error
//     if(data.error?.code === 800) { 
//         return notFound();
//     }

//     return data;
// }


// export async function fetchTrack(id) {
//     const endpoint = `/track/${ id }`;
//     const data = await fetchData(endpoint);

//     return data;
// }

// export async function fetchTopTracks({ limit = 10 } = {}) {
//     const endpoint = `/chart/0/tracks?limit=${ limit }`;
//     const { data } = await fetchData(endpoint);

//     return data;
// }



// export async function fetchTopArtists({ limit = 3 } = {}) {
//     const endpoint = `/chart/0/artists?limit=${ limit }`;

//     const { data } = await fetchData(endpoint);
    
//     const promises = data.map(artist => fetchArtist(artist.id));
//     const topArtists = await Promise.all(promises);
    
//     return topArtists;
// }

// export async function fetchTopPlaylists() {
//     const endpoint = `/chart/0/playlists`;
//     const { data } = await fetchData(endpoint);

//     return data;
// }

// export async function fetchArtist(id) {
//     const endpoint = `/artist/${ id }`;
//     const data = await fetchData(endpoint);
    
//     return data;
// }

// export async function fetchArtistTopTracks(id) {
//     const endpoint = `/artist/${ id }/top`;
//     const { data } = await fetchData(endpoint);
    
//     return data;
// }

// export async function fetchArtistAlbums(id, { limit = 9999 } = {}) {
//     const endpoint = `/artist/${ id }/albums?limit=${ limit }`;
//     const { data } = await fetchData(endpoint);
    
//     return data;
// }

// export async function fetchAlbum(id) {
//     const endpoint = `/album/${ id }`;
//     const data = await fetchData(endpoint);
    
//     return data;
// }

// export async function fetchPlaylist(id) {
//     const endpoint = `/playlist/${ id }`;
//     const data = await fetchData(endpoint);
    
//     return data;
// }

// export async function fetchTopRadio() {
//     const endpoint = '/radio/top';
//     const { data } = await fetchData(endpoint);
    
//     return data;
// }

// export async function fetchRadio(id) {
//     const radioPromise = fetchData(`/radio/${ id }`);
//     const trackListPromise = fetchData(`/radio/${ id }/tracks`);

//     const [radio, tracks] = await Promise.all([radioPromise, trackListPromise]);
    
//     return {
//         ...radio,
//         tracks: tracks.data
//     };
// }

// export async function fetchSearchData(query, { limit = 3 } = {}) {
//     const endpoint = (category) => `/search/${ category }?q=${ query }&limit=${ limit }`;
    
//     const tracksPromise = fetchData(endpoint('track'));
//     const albumsPromise = fetchData(endpoint('album'));
//     const artistsPromise = fetchData(endpoint('artist'));

//     return await Promise.all([tracksPromise, albumsPromise, artistsPromise]);
// }



import { notFound } from "next/navigation";

// const base = 'http://localhost:8000/api'; // Updated base URL
const base = 'http://localhost:8000/'; // Updated base URL

async function fetchData(endpoint) {
    if (endpoint.includes('favicon')) {
        console.log('Blocking request to favicon');
        return null; // Or handle as needed
    }
    try {
        const response = await fetch(base + endpoint, { cache: "no-store" });
        // console.log('Data from response:', response);
        // Check if the response status is not OK
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        // Try to parse the response as JSON
        const data = await response.json();
        
        // Check for specific error codes in the response data if needed
        if (data.error?.code === 800) { 
            return notFound();
        }

        return data;

    } catch (error) {
        // Log the error and rethrow it
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default fetchData;


export async function fetchTopTracks() {
    const endpoint = `/api/tracks`;
    const data = await fetchData(endpoint);
    // console.log('Data from fetchTopTracks:', data);
    return data;
  }



export async function fetchArtist(id) {
    const endpoint = `/api/artists/${id}`;
    const artist = await fetchData(endpoint);
    // console.log('Data from fetchArtist:', artist);
    return artist;
}

export async function fetchTopArtists({ limit = 3 } = {}) {
    const endpoint = `/api/artists?limit=${limit}`;

    // Fetching the list of artists directly (no need for destructuring)
    const artists = await fetchData(endpoint);

    // console.log(`Artist data received:`, artists);

    // Fetch detailed artist data for each artist in parallel
    const promises = artists.map(artist => fetchArtist(artist.id));
    const topArtists = await Promise.all(promises);
    
    return topArtists;
}

// export async function fetchArtistTopTracks(id) {
//     const endpoint = `/artists/${ id }`;
//     const { data } = await fetchData(endpoint);
//     // console.log('Data from fetchArtistTopTracks:', data);
//     return data;
// }

export async function fetchArtistAlbums(id, { limit = 9999 } = {}) {
    const endpoint = `/api/artist/${ id }/albums?limit=${ limit }`;
    const { data } = await fetchData(endpoint);
    
    return data;
}

export async function fetchTopPlaylists() {
    const endpoint = `/api/playlistsnames`;
    const playlists = await fetchData(endpoint); // Directly return the fetched playlists
    
    return playlists;
}

export async function fetchPlaylist(id) {
    const endpoint = `/api/playlists/${ id }`;
    const  data  = await fetchData(endpoint);
    
    return data;
}



export async function fetchTrack(id) {
    const endpoint = `/api/tracks`;
    const  data  = await fetchData(endpoint);

    return data;
}

export async function fetchTrackByIdx(id) {
    const endpoint = `/api/tracks/${ id }`;
    const  data  = await fetchData(endpoint);

    return data;
}

export async function fetchAlbum(id) {
    const endpoint = `/api/albums/${ id }`;
    const data = await fetchData(endpoint);
    console.log('Data from fetchAlbum:', data);
    // return data;
    return Array.isArray(data) ? data : [data];
}

// export const fetchMoodData = async (moodId) => {
//     try {
//         const response = await fetch(`/api/mood/${moodId}`);
//         console.log('Data from response:', response);
//         if (!response.ok) {
//             throw new Error(`Failed to fetch data: ${response.statusText}`);
//         }
//         const data = await response.json();
//         // console.log('Data from response:', data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// };


// utils/fetchers.js

import axios from 'axios';

export const fetchMoodData = async (moodId) => {
  try {
    const response = await axios.get(`/api/mood?mood=${moodId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch mood data');
  }
};

export async function fetchAiPicks(id) {
    const endpoint = `/mlapi/${ id }`;
    const  data  = await fetchData(endpoint);

    return data;
}


export const fetchalbumById = async (id, token) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/albums/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data ; // Adjust this if necessary
    } catch (error) {
        console.error(`Error fetching track with id ${id}:`, error);
        return null;
    }
};

export const fetchTrackById = async (id, token) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/tracks/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data; // Adjust this if necessary
    } catch (error) {
        console.error(`Error fetching track with id ${id}:`, error);
        return null;
    }
};


export const fetchTracksptfyById = async (id, token) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/track/sptfy/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        // console.log('fetchTracksptfyById:', response.data);
        return response.data; // Adjust this if necessary
    } catch (error) {
        console.error(`Error fetching track with id ${id}:`, error);
        return null;
    }
};

// Function to fetch all track IDs of existing favourites
export const fetchAllTrackIDs = async (token) => {
    try {
        const response = await axios.get('http://localhost:8000/api/favourites/tracks/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data.map(fav => fav.favid); // Adjust this if necessary
    } catch (error) {
        console.error('Error fetching existing favourites:', error);
        return [];
    }
};


// Function to fetch all track IDs of existing favourites
export const fetchAllPlaylistIDs = async (token) => {
    try {
        const response = await axios.get('http://localhost:8000/api/favourites/playlists/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data.map(fav => fav.favid); // Adjust this if necessary
    } catch (error) {
        console.error('Error fetching existing favourites:', error);
        return [];
    }
};





// Function to fetch all track IDs of existing favourites
export const fetchAllArtistIDs = async (token) => {
    try {
        const response = await axios.get('http://localhost:8000/api/favourites/artists/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data.map(fav => fav.favid); // Adjust this if necessary
    } catch (error) {
        console.error('Error fetching existing favourites:', error);
        return [];
    }
};

// Function to fetch all track IDs of existing favourites
export const fetchAllAlbumIDs = async (token) => {
    try {
        const response = await axios.get('http://localhost:8000/api/favourites/albums/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data.map(fav => fav.favid); // Adjust this if necessary
    } catch (error) {
        console.error('Error fetching existing favourites:', error);
        return [];
    }
};


export const fetchPlaylistById = async (id, token) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/playlists/${ id }`, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data; // Adjust this if necessary
    } catch (error) {
        console.error(`Error fetching track with id ${id}:`, error);
        return null;
    }
};



export const fetchAiFavPicks = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/mlapi/`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // console.log('ai data:', response.data);
        console.log('fetchAiFavPicks:', response.data);
        return response.data; // Adjust this if necessary
    } catch (error) {
        console.error(`Error fetching aipicks with id :`, error);
        return null;
    }
};


export const userLogout = async (token) => {
    try {
        const response = await axios.post(`http://localhost:8000/auth/logout/`, {}, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Logout failed:', error.response?.data || error.message);
        return null;
    }
};


// playlist api


const API_URL = 'http://localhost:8000/api/users/playlists/';

export const fetchPlaylists = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching playlists:', error);
        return [];
    }
};

export const createPlaylist = async (playlistData, token) => {
    try {
        const response = await axios.post(API_URL, playlistData, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating playlist:', error);
        return null;
    }
};

export const updatePlaylist = async (id, playlistData, token) => {
    try {
        const response = await axios.put(`${API_URL}${id}/`, playlistData, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating playlist:', error);
        return null;
    }
};

export const deletePlaylist = async (id, token) => {
    try {
        await axios.delete(`${API_URL}${id}/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
    } catch (error) {
        console.error('Error deleting playlist:', error);
    }
};


export const getPlaylistId = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}${id}/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting playlist:', error);
        return null;
    }
};