// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     album: [],
//     track: [],
//     // radio: [],
//     artist: [],
//     playlist: [],
// };

// const favoriteSlice = createSlice({
//     name: 'favorites',
//     initialState,
//     reducers: {
//         addToFavorites(state, { payload }) {
//             const { type, id } = payload;
            
//             state[type].push(id);
            
//         },
//         removeFromFavorites(state, { payload }) {
//             const { type, id } = payload;
            
//             state[type] = state[type].filter(favoriteId => favoriteId !== id);
//         },
//     }
// });

// export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
// export const selectFavorites = (state) => state.favorites;

// export default favoriteSlice.reducer;




// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     album: [],
//     track: [],
//     artist: [],
//     playlist: [],
// };

// const favoriteSlice = createSlice({
//     name: 'favorites',
//     initialState,
//     reducers: {
//         addToFavorites(state, { payload }) {
//             const { type, id } = payload;
            
//             // Debugging logs
//             console.log('Add to Favorites Action');
//             console.log('Payload:', payload);
//             console.log('Current State:', state);

//             // Ensure the type exists in the state
//             if (!state[type]) {
//                 console.error(`Type ${type} does not exist in state`);
//                 return;
//             }

//             // Add the id to the array
//             state[type].push(id);

//             // Debugging logs
//             console.log('Updated State:', state);
//         },
//         removeFromFavorites(state, { payload }) {
//             const { type, id } = payload;
            
//             // Debugging logs
//             console.log('Remove from Favorites Action');
//             console.log('Payload:', payload);
//             console.log('Current State:', state);

//             // Ensure the type exists in the state
//             if (!state[type]) {
//                 console.error(`Type ${type} does not exist in state`);
//                 return;
//             }

//             // Remove the id from the array
//             state[type] = state[type].filter(favoriteId => favoriteId !== id);

//             // Debugging logs
//             console.log('Updated State:', state);
//         },
//     }
// });

// export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
// export const selectFavorites = (state) => state.favorites;

// export default favoriteSlice.reducer;





import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllTrackIDs } from "@/utils/fetchers"; 

// Async thunk to fetch favorites from the API
export const fetchFavorites = createAsyncThunk(
    'favorites/fetchFavorites',
    async (token, { dispatch }) => {
        if (!token) return; // If no token, return

        try {
            const favoriteIds = await fetchAllTrackIDs(token);
            console.log('Fetched favorite IDs:', favoriteIds); // Log the fetched IDs
            
            // Dispatch setFavorites with the fetched IDs
            dispatch(setFavorites({ type: 'track', ids: favoriteIds }));
        } catch (error) {
            console.error('Error loading favorite tracks:', error);
        }
    }
);

const initialState = {
    album: [],
    track: [],
    artist: [],
    playlist: [],
};

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites(state, { payload }) {
            const { type, id } = payload;
            if (!state[type].includes(id)) {
                state[type].push(id); // Avoid duplicates
            }
        },
        removeFromFavorites(state, { payload }) {
            const { type, id } = payload;
            state[type] = state[type].filter(favoriteId => favoriteId !== id);
        },
        setFavorites(state, { payload }) {
            const { type, ids } = payload;
            state[type] = [...new Set(ids)]; // Set the favorites for the given type, avoiding duplicates
        },
    },
});

export const { addToFavorites, removeFromFavorites, setFavorites } = favoriteSlice.actions;
export const selectFavorites = (state) => state.favorites;

export default favoriteSlice.reducer;
