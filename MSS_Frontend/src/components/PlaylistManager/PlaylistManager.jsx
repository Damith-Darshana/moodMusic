// src/components/PlaylistManager.jsx
// 'use client';
// import { useContext, useEffect, useState } from "react";
// import { fetchPlaylists, createPlaylist, updatePlaylist, deletePlaylist } from '@/utils/fetchers';
// import TokenContext from "@/app/context/TokenContext";
// import './PlaylistManager.css';

// const PlaylistManager = () => {
//     const { token } = useContext(TokenContext);
//     const [playlists, setPlaylists] = useState([]);
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [playlistImageUrl, setPlaylistImageUrl] = useState('');
//     const [tracks, setTracks] = useState('');
//     const [editMode, setEditMode] = useState(false);
//     const [currentPlaylistId, setCurrentPlaylistId] = useState(null);

//     useEffect(() => {
//         const loadPlaylists = async () => {
//             const data = await fetchPlaylists(token);
//             setPlaylists(data);
//         };
//         loadPlaylists();
//     }, [token]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const playlistData = {
//             name,
//             description,
//             playlist_image_url: playlistImageUrl,
//             tracks: tracks.split(',').map(track => track.trim()), // Assuming tracks are comma-separated
//             type: 'playlist'
//         };

//         if (editMode) {
//             const updatedPlaylist = await updatePlaylist(currentPlaylistId, playlistData, token);
//             if (updatedPlaylist) {
//                 setPlaylists(playlists.map(playlist => (playlist.id === currentPlaylistId ? updatedPlaylist : playlist)));
//                 resetForm();
//             }
//         } else {
//             const newPlaylist = await createPlaylist(playlistData, token);
//             if (newPlaylist) {
//                 setPlaylists([...playlists, newPlaylist]);
//                 resetForm();
//             }
//         }
//     };

//     const handleEdit = (playlist) => {
//         setName(playlist.name);
//         setDescription(playlist.description);
//         setPlaylistImageUrl(playlist.playlist_image_url);
//         setTracks(playlist.tracks.join(', ')); // Convert array to comma-separated string
//         setEditMode(true);
//         setCurrentPlaylistId(playlist.id);
//     };

//     const handleDelete = async (id) => {
//         await deletePlaylist(id, token);
//         setPlaylists(playlists.filter(playlist => playlist.id !== id));
//     };

//     const resetForm = () => {
//         setName('');
//         setDescription('');
//         setPlaylistImageUrl('');
//         setTracks('');
//         setEditMode(false);
//         setCurrentPlaylistId(null);
//     };

//     return (

//         <div className="playlist-manager">
//         <h1>Manage Playlists</h1>
//         <form className="playlist-form" onSubmit={handleSubmit}>
//             <input
//                 className="playlist-input"
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//             />
//             <textarea
//                 className="playlist-textarea"
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 required
//             />
//             <input
//                 className="playlist-input"
//                 type="url"
//                 placeholder="Playlist Image URL"
//                 value={playlistImageUrl}
//                 onChange={(e) => setPlaylistImageUrl(e.target.value)}
//             />
//             <input
//                 className="playlist-input"
//                 type="text"
//                 placeholder="Tracks (comma-separated)"
//                 value={tracks}
//                 onChange={(e) => setTracks(e.target.value)}
//             />
//             <button className="playlist-button" type="submit">{editMode ? 'Update Playlist' : 'Create Playlist'}</button>
//             {editMode && <button className="playlist-cancel" type="button" onClick={resetForm}>Cancel</button>}
//         </form>

//         <ul className="playlist-list">
//             {playlists.map(playlist => (
//                 <li className="playlist-item" key={playlist.id}>
//                     <h2 className="playlist-title">{playlist.name}</h2>
//                     <p className="playlist-description">{playlist.description}</p>
//                     <img className="playlist-image" src={playlist.playlist_image_url} alt={playlist.name} width="100" />
//                     <p className="playlist-tracks">Tracks: {playlist.tracks.join(', ')}</p>
//                     <button className="playlist-edit-button" onClick={() => handleEdit(playlist)}>Edit</button>
//                     <button className="playlist-delete-button" onClick={() => handleDelete(playlist.id)}>Delete</button>
//                 </li>
//             ))}
//         </ul>
//     </div>



//     );
// };

// export default PlaylistManager;







// 'use client';

// import { FcNext ,FcPrevious} from "react-icons/fc";
// import IconButton from '@mui/material/IconButton';
// import { useContext, useEffect, useState } from "react";
// import { fetchPlaylists, createPlaylist, updatePlaylist, deletePlaylist } from '@/utils/fetchers';
// import TokenContext from "@/app/context/TokenContext";
// import './PlaylistManager.css';
// import UserCarousel from "@/components/others/UserCarousel";
// import UserPlaylistListItem from "@/components/list-items/UserPlaylistListItem";

// const PlaylistManager = () => {
//     const { token } = useContext(TokenContext);
//     const [playlists, setPlaylists] = useState([]);
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [playlistImageUrl, setPlaylistImageUrl] = useState('');
//     const [tracks, setTracks] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentPlaylistId, setCurrentPlaylistId] = useState(null);

//     useEffect(() => {
//         const loadPlaylists = async () => {
//             const data = await fetchPlaylists(token);
//             setPlaylists(data);
//         };
//         loadPlaylists();
//     }, [token]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const playlistData = {
//             name,
//             description,
//             playlist_image_url: playlistImageUrl,
//             tracks: tracks.split(',').map(track => track.trim()),
//             type: 'playlist'
//         };

//         if (currentPlaylistId) {
//             const updatedPlaylist = await updatePlaylist(currentPlaylistId, playlistData, token);
//             if (updatedPlaylist) {
//                 setPlaylists(playlists.map(playlist => (playlist.id === currentPlaylistId ? updatedPlaylist : playlist)));
//                 resetForm();
//             }
//         } else {
//             const newPlaylist = await createPlaylist(playlistData, token);
//             if (newPlaylist) {
//                 setPlaylists([...playlists, newPlaylist]);
//                 resetForm();
//             }
//         }
//     };

//     const handleEdit = (playlist) => {
//         setName(playlist.name);
//         setDescription(playlist.description);
//         setPlaylistImageUrl(playlist.playlist_image_url);
//         setTracks(playlist.tracks.join(', '));
//         setCurrentPlaylistId(playlist.id);
//         setIsModalOpen(true);
//     };

//     const handleDelete = async (id) => {
//         await deletePlaylist(id, token);
//         setPlaylists(playlists.filter(playlist => playlist.id !== id));
//     };

//     const resetForm = () => {
//         setName('');
//         setDescription('');
//         setPlaylistImageUrl('');
//         setTracks('');
//         setCurrentPlaylistId(null);
//         setIsModalOpen(false);
//     };

//     return (
        
//         // <div className="playlist-manager">
//         <div>

//             {isModalOpen && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
                        
//                         <h2>{currentPlaylistId ? 'Edit Playlist' : 'Create Playlist'}</h2>
//                         <form className="playlist-form" onSubmit={handleSubmit}>
//                             <input
//                                 className="playlist-input"
//                                 type="text"
//                                 placeholder="Name"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 required
//                             />
//                             <textarea
//                                 className="playlist-textarea"
//                                 placeholder="Description"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 required
//                             />
//                             <input
//                                 className="playlist-input"
//                                 type="url"
//                                 placeholder="Playlist Image URL"
//                                 value={playlistImageUrl}
//                                 onChange={(e) => setPlaylistImageUrl(e.target.value)}
//                             />
//                             <input
//                                 className="playlist-input"
//                                 type="text"
//                                 placeholder="Tracks (comma-separated)"
//                                 value={tracks}
//                                 onChange={(e) => setTracks(e.target.value)}
//                             />
//                             <button className="playlist-button" type="submit">{currentPlaylistId ? 'Update Playlist' : 'Create Playlist'}</button>
//                             <button className="playlist-cancel" type="button" onClick={resetForm}>Cancel</button>
//                         </form>
//                     </div>
//                 </div>
//             )}
        

//             <UserCarousel header='User Created Playlists' buttonrender={
//                       <IconButton onClick={() => setIsModalOpen(true)} size="large"><FcNext /></IconButton>
//                      }>
            
//                 {playlists.map(playlist => (
//                 <>
//                             <UserPlaylistListItem
//                             id={playlist.id}
//                             key={playlist.id}
//                             title={playlist.name}
//                             imgSrc={playlist.playlist_image_url} 
//                             editbtn={ 
//                             <button className="playlist-edit-button" onClick={() => handleEdit(playlist)}>Edit</button>}  
//                             delelebtn={
//                             <button className="playlist-delete-button" onClick={() => handleDelete(playlist.id)}>Delete</button>}
//                             />

               
//                  </>

                    
//                 ))}
           
//                 </UserCarousel>
//                 {/* </div> */}
//             {/* </ul> */}
        
//         </div>
//     );
// };

// export default PlaylistManager;















// 'use client';

// import { FcNext, FcPrevious } from "react-icons/fc";
// import IconButton from '@mui/material/IconButton';
// import { useContext, useEffect, useState } from "react";
// import { fetchPlaylists, createPlaylist, updatePlaylist, deletePlaylist } from '@/utils/fetchers';
// import TokenContext from "@/app/context/TokenContext";
// import './PlaylistManager.css';
// import UserCarousel from "@/components/others/UserCarousel";
// import UserPlaylistListItem from "@/components/list-items/UserPlaylistListItem";
// import SearchBar from "../searchbar/SearchBarTrack";

// const PlaylistManager = () => {
//     const { token } = useContext(TokenContext);
//     const [playlists, setPlaylists] = useState([]);
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [playlistImageUrl, setPlaylistImageUrl] = useState('');
//     const [selectedTracks, setSelectedTracks] = useState([]);  // Stores selected track IDs
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentPlaylistId, setCurrentPlaylistId] = useState(null);

//     useEffect(() => {
//         const loadPlaylists = async () => {
//             const data = await fetchPlaylists(token);
//             setPlaylists(data);
//         };
//         loadPlaylists();
//     }, [token]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const playlistData = {
//             name,
//             description,
//             playlist_image_url: playlistImageUrl,
//             tracks: selectedTracks,  // Use selected tracks IDs
//             type: 'playlist'
//         };

//         if (currentPlaylistId) {
//             const updatedPlaylist = await updatePlaylist(currentPlaylistId, playlistData, token);
//             if (updatedPlaylist) {
//                 setPlaylists(playlists.map(playlist => (playlist.id === currentPlaylistId ? updatedPlaylist : playlist)));
//                 resetForm();
//             }
//         } else {
//             const newPlaylist = await createPlaylist(playlistData, token);
//             if (newPlaylist) {
//                 setPlaylists([...playlists, newPlaylist]);
//                 resetForm();
//             }
//         }
//     };

//     const handleEdit = (playlist) => {
//         setName(playlist.name);
//         setDescription(playlist.description);
//         setPlaylistImageUrl(playlist.playlist_image_url);
//         setSelectedTracks(playlist.tracks);  // Pre-fill selected tracks from the playlist
//         setCurrentPlaylistId(playlist.id);
//         setIsModalOpen(true);
//     };

//     const handleDelete = async (id) => {
//         await deletePlaylist(id, token);
//         setPlaylists(playlists.filter(playlist => playlist.id !== id));
//     };

//     const resetForm = () => {
//         setName('');
//         setDescription('');
//         setPlaylistImageUrl('');
//         setSelectedTracks([]);  // Reset selected tracks
//         setCurrentPlaylistId(null);
//         setIsModalOpen(false);
//     };

//     const handleTrackSelect = (trackId) => {
//         if (!selectedTracks.includes(trackId)) {
//             setSelectedTracks([...selectedTracks, trackId]);  // Add track ID if not already selected
//         }
//     };

//     const handleTrackRemove = (trackId) => {
//         setSelectedTracks(selectedTracks.filter(id => id !== trackId));  // Remove track ID from selection
//     };

//     return (
//         <div>
//             {isModalOpen && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <h2>{currentPlaylistId ? 'Edit Playlist' : 'Create Playlist'}</h2>
//                         <form className="playlist-form" onSubmit={handleSubmit}>
//                             <input
//                                 className="playlist-input"
//                                 type="text"
//                                 placeholder="Name"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 required
//                             />
//                             <textarea
//                                 className="playlist-textarea"
//                                 placeholder="Description"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 required
//                             />
//                             <input
//                                 className="playlist-input"
//                                 type="url"
//                                 placeholder="Playlist Image URL"
//                                 value={playlistImageUrl}
//                                 onChange={(e) => setPlaylistImageUrl(e.target.value)}
//                             />

//                             {/* Search bar for finding tracks */}
//                             <SearchBar onSelectTrack={handleTrackSelect} /> 

                        
//                             <div className="selected-tracks">
//                                 {console.log("selected", selectedTracks)}
//                                 {selectedTracks.map((trackId, index) => (
//                                     <div key={index} className="selected-track-item">
//                                         {trackId}
//                                         <button type="button" onClick={() => handleTrackRemove(trackId)}>Remove</button>
//                                     </div>
//                                 ))}
//                             </div>


//                             <button className="playlist-button" type="submit">{currentPlaylistId ? 'Update Playlist' : 'Create Playlist'}</button>
//                             <button className="playlist-cancel" type="button" onClick={resetForm}>Cancel</button>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             <UserCarousel header='User Created Playlists' buttonrender={
//                 <IconButton onClick={() => setIsModalOpen(true)} size="large"><FcNext /></IconButton>
//             }>
//                 {playlists.map(playlist => (
//                     <UserPlaylistListItem
//                         id={playlist.id}
//                         key={playlist.id}
//                         title={playlist.name}
//                         imgSrc={playlist.playlist_image_url}
//                         editbtn={<button className="playlist-edit-button" onClick={() => handleEdit(playlist)}>Edit</button>}
//                         delelebtn={<button className="playlist-delete-button" onClick={() => handleDelete(playlist.id)}>Delete</button>}
//                     />
//                 ))}
//             </UserCarousel>
//         </div>
//     );
// };

// export default PlaylistManager;




// 'use client';


// import IconButton from '@mui/material/IconButton';
// import { RiAddCircleLine } from "react-icons/ri";
// import { useContext, useEffect, useState } from "react";
// import { fetchPlaylists, createPlaylist, updatePlaylist, deletePlaylist, fetchTracksptfyById} from '@/utils/fetchers';
// import TokenContext from "@/app/context/TokenContext";
// import './PlaylistManager.css';
// import UserCarousel from "@/components/others/UserCarousel";
// import UserPlaylistListItem from "@/components/list-items/UserPlaylistListItem";
// import SearchBar from "../searchbar/SearchBarTrack";

// const PlaylistManager = async () => {
//     const { token } = useContext(TokenContext);
//     const [playlists, setPlaylists] = useState([]);
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [playlistImageUrl, setPlaylistImageUrl] = useState('');
//     const [selectedTracks, setSelectedTracks] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');  // State for search query
//     const [searchResults, setSearchResults] = useState([]);  // State for search results
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentPlaylistId, setCurrentPlaylistId] = useState(null);

//     useEffect(() => {
//         const loadPlaylists = async () => {
//             const data = await fetchPlaylists(token);
//             setPlaylists(data);
//         };
//         loadPlaylists();
        
//     }, [token]);

//     const tracksData = await Promise.all(
//         selectedTracks.map(async (trackId) => {
//             return await fetchTracksptfyById(trackId, token);
//         })
//     );
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const playlistData = {
//             name,
//             description,
//             playlist_image_url: playlistImageUrl,
//             tracks: selectedTracks,
//             type: 'playlist'
//         };

//         if (currentPlaylistId) {
//             const updatedPlaylist = await updatePlaylist(currentPlaylistId, playlistData, token);
//             if (updatedPlaylist) {
//                 setPlaylists(playlists.map(playlist => (playlist.id === currentPlaylistId ? updatedPlaylist : playlist)));
//                 resetForm();
//             }
//         } else {
//             const newPlaylist = await createPlaylist(playlistData, token);
//             if (newPlaylist) {
//                 setPlaylists([...playlists, newPlaylist]);
//                 resetForm();
//             }
//         }
//     };

//     const handleEdit = (playlist) => {
//         setName(playlist.name);
//         setDescription(playlist.description);
//         setPlaylistImageUrl(playlist.playlist_image_url);
//         setSelectedTracks(playlist.tracks);
//         setCurrentPlaylistId(playlist.id);
//         setIsModalOpen(true);
//     };

//     const handleDelete = async (id) => {
//         await deletePlaylist(id, token);
//         setPlaylists(playlists.filter(playlist => playlist.id !== id));
//     };

//     const resetForm = () => {
//         setName('');
//         setDescription('');
//         setPlaylistImageUrl('');
//         setSelectedTracks([]);
//         setCurrentPlaylistId(null);
//         setIsModalOpen(false);
//         setSearchQuery('');  // Reset search query
//         setSearchResults([]);  // Reset search results
//     };

//     const handleTrackSelect = (trackId) => {
//         if (!selectedTracks.includes(trackId)) {
//             setSelectedTracks([...selectedTracks, trackId]);
//         }
//     };

//     const handleTrackRemove = (trackId) => {
//         setSelectedTracks(selectedTracks.filter(id => id !== trackId));
//     };

//     const handleSearch = async (query) => {
//         setSearchQuery(query);
//         if (query) {
//             try {
//                 const response = await fetch(`http://127.0.0.1:8000/api/search/?search=${query}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`, // Include token if required by API
//                     },
//                 });
//                 const data = await response.json();
//                 setSearchResults(data); // Assuming the API returns an array of tracks
//             } catch (error) {
//                 console.error("Error fetching search results:", error);
//             }
//         } else {
//             setSearchResults([]); // Clear results if query is empty
//         }
//     };
    

//     return (
//         <div>
//             {isModalOpen && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <h2>{currentPlaylistId ? 'Edit Playlist' : 'Create Playlist'}</h2>
//                         <form className="playlist-form" onSubmit={handleSubmit}>
//                             <input
//                                 className="playlist-input"
//                                 type="text"
//                                 placeholder="Name"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 required
//                             />
//                             <textarea
//                                 className="playlist-textarea"
//                                 placeholder="Description"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 required
//                             />
//                             <input
//                                 className="playlist-input"
//                                 type="url"
//                                 placeholder="Playlist Image URL"
//                                 value={playlistImageUrl}
//                                 onChange={(e) => setPlaylistImageUrl(e.target.value)}
//                             />

//                             {/* Search bar for finding tracks */}
//                             <SearchBar 
//                                 onSelectTrack={handleTrackSelect} 
//                                 onSearch={handleSearch}  // Pass the search function
//                             /> 

//                             <div className="search-results">
//                                 {searchResults.map((track, index) => (
//                                     <div key={index} className="search-result-item" onClick={() => handleTrackSelect(track.id)}>
//                                         {track.name} {/* Adjust this to your track data structure */}
//                                         { console.log("searchResults is:", track.name)}
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className="selected-tracks">
//                                 {console.log("selected", tracksData)}
                                
//                                 {/* {selectedTracks.map((trackId, index) => (
//                                     <div key={index} className="selected-track-item">
//                                         {trackId}
//                                         <button type="button" onClick={() => handleTrackRemove(trackId)}>Remove</button>
//                                     </div>
//                                 ))} */}
//                                     {selectedTracks.map((trackId, index) => (
//                                         <div key={index} className="selected-track-item">
//                                             {tracksData[index].title}
//                                             <button type="button" onClick={() => handleTrackRemove(trackId)}>Remove</button>
//                                         </div>
//                                     ))}
                                



//                             </div>

//                             <button className="playlist-button" type="submit">{currentPlaylistId ? 'Update Playlist' : 'Create Playlist'}</button>
//                             <button className="playlist-cancel" type="button" onClick={resetForm}>Cancel</button>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             <UserCarousel header='User Created Playlists' buttonrender={
//                 <IconButton onClick={() => setIsModalOpen(true)} ><RiAddCircleLine fontSize="inherit" /></IconButton>
//             }>
//                 {playlists.map(playlist => (
//                     <UserPlaylistListItem
//                         id={playlist.id}
//                         key={playlist.id}
//                         title={playlist.name}
//                         imgSrc={playlist.playlist_image_url}
//                         editbtn={<button className="playlist-edit-button" onClick={() => handleEdit(playlist)}>Edit</button>}
//                         delelebtn={<button className="playlist-delete-button" onClick={() => handleDelete(playlist.id)}>Delete</button>}
//                     />
//                 ))}
//             </UserCarousel>
//         </div>
//     );
// };

// export default PlaylistManager;















'use client';

import IconButton from '@mui/material/IconButton';
import { RiAddCircleLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { fetchPlaylists, createPlaylist, updatePlaylist, deletePlaylist, fetchTracksptfyById } from '@/utils/fetchers';
import TokenContext from "@/app/context/TokenContext";
import './PlaylistManager.css';
import UserCarousel from "@/components/others/UserCarousel";
import UserPlaylistListItem from "@/components/list-items/UserPlaylistListItem";
import SearchBar from "../searchbar/SearchBarTrack";

const PlaylistManager = () => {
    const { token } = useContext(TokenContext);
    const [playlists, setPlaylists] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [playlistImageUrl, setPlaylistImageUrl] = useState('');
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [tracksData, setTracksData] = useState([]);  // Stores track data from the backend
    const [searchQuery, setSearchQuery] = useState('');  // State for search query
    const [searchResults, setSearchResults] = useState([]);  // State for search results
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPlaylistId, setCurrentPlaylistId] = useState(null);

    useEffect(() => {
        const loadPlaylists = async () => {
            const data = await fetchPlaylists(token);
            setPlaylists(data);
        };
        loadPlaylists();
    }, [token]);

    useEffect(() => {
        const fetchSelectedTracksData = async () => {
            const fetchedTracks = await Promise.all(
                selectedTracks.map(async (trackId) => {
                    return await fetchTracksptfyById(trackId, token);
                })
            );
            setTracksData(fetchedTracks);
        };

        if (selectedTracks.length) {
            fetchSelectedTracksData();
        }
    }, [selectedTracks, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const playlistData = {
            name,
            description,
            playlist_image_url: playlistImageUrl,
            tracks: selectedTracks,
            type: 'playlist'
        };

        if (currentPlaylistId) {
            const updatedPlaylist = await updatePlaylist(currentPlaylistId, playlistData, token);
            if (updatedPlaylist) {
                setPlaylists(playlists.map(playlist => (playlist.id === currentPlaylistId ? updatedPlaylist : playlist)));
                resetForm();
            }
        } else {
            const newPlaylist = await createPlaylist(playlistData, token);
            if (newPlaylist) {
                setPlaylists([...playlists, newPlaylist]);
                resetForm();
            }
        }
    };

    const handleEdit = (playlist) => {
        setName(playlist.name);
        setDescription(playlist.description);
        setPlaylistImageUrl(playlist.playlist_image_url);
        setSelectedTracks(playlist.tracks);
        setCurrentPlaylistId(playlist.id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        await deletePlaylist(id, token);
        setPlaylists(playlists.filter(playlist => playlist.id !== id));
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setPlaylistImageUrl('');
        setSelectedTracks([]);
        setCurrentPlaylistId(null);
        setIsModalOpen(false);
        setSearchQuery('');  // Reset search query
        setSearchResults([]);  // Reset search results
    };

    const handleTrackSelect = (trackId) => {
        if (!selectedTracks.includes(trackId)) {
            
            setSelectedTracks([...selectedTracks, trackId]);
        }
    };
    
    console.log("selectedTracks track:", selectedTracks);

    const handleTrackRemove = (trackId) => {
        console.log("handleTrackRemove track:", trackId);
        setSelectedTracks(selectedTracks.filter(id => id !== trackId));
    };

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/search/?search=${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{currentPlaylistId ? 'Edit Playlist' : 'Create Playlist'}</h2>
                        <form className="playlist-form" onSubmit={handleSubmit}>
                            <input
                                className="playlist-input"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <textarea
                                className="playlist-textarea"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                            <input
                                className="playlist-input"
                                type="url"
                                placeholder="Playlist Image URL"
                                value={playlistImageUrl}
                                onChange={(e) => setPlaylistImageUrl(e.target.value)}
                            />

                            {/* Search bar for finding tracks */}
                            <SearchBar 
                                onSelectTrack={handleTrackSelect} 
                                onSearch={handleSearch}
                            />

                            {/* <div className="search-results">
                                {searchResults.map((track, index) => (
                                    <div key={index} className="search-result-item" onClick={() => handleTrackSelect(track.id)}>
                                        {track.name}
                                    </div>
                                ))}
                            </div> */}

                            <div className="selected-tracks">
                                {tracksData.map((track, index) => (
                                    <div key={index} className="selected-track-item">
                                        
                                        <div className='resultcontainer'>
                                            <ul>
                                                <li>
                                                <img src={track.cover} />
                                                    <span className='overflowing-text'>{track.title}</span>
                                                </li>
                                            </ul>
                                        </div>
                                         {/* {track.sptfy_id} */}
                                        <button  type="button" onClick={() => handleTrackRemove(track.sptfy_id)}>Remove</button>
                                    </div>
                                ))}
                                
                            </div>

                            <button className="playlist-button" type="submit">{currentPlaylistId ? 'Update Playlist' : 'Create Playlist'}</button>
                            <button className="playlist-cancel" type="button" onClick={resetForm}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            <UserCarousel header='User Created Playlists' buttonrender={
                <IconButton onClick={() => setIsModalOpen(true)} ><RiAddCircleLine fontSize="inherit" /></IconButton>
            }>
                {playlists.map(playlist => (
                    <UserPlaylistListItem
                        id={playlist.id}
                        key={playlist.id}
                        title={playlist.name}
                        imgSrc={playlist.playlist_image_url}
                        editbtn={<button className="playlist-edit-button" onClick={() => handleEdit(playlist)}>Edit</button>}
                        delelebtn={<button className="playlist-delete-button" onClick={() => handleDelete(playlist.id)}>Delete</button>}
                    />
                ))}
            </UserCarousel>
        </div>
    );
};

export default PlaylistManager;
