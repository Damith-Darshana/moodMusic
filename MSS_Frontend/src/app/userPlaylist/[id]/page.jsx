'use client';
import IntroContainer from "@/components/others/IntroContainer";
import TrackListContainer from "@/components/others/TrackListContainer";
import { getPlaylistId, fetchTracksptfyById } from "@/utils/fetchers";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import TokenContext from "@/app/context/TokenContext";
import { useContext, useEffect, useState } from "react";

const Playlists = ({ params }) => {
    const { token } = useContext(TokenContext);
    const [playlist, setPlaylist] = useState({ name: '', type: '', description: '', tracks: [], playlist_image_url: '' });
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch playlist and track data
        const fetchPlaylistAndTracks = async () => {
            try {
                const playlistData = await getPlaylistId(params.id, token);
                setPlaylist(playlistData);

                // Track IDs are comma-separated, so we split them into an array
                const trackIds = Array.isArray(playlistData.tracks) ? playlistData.tracks : playlistData.tracks.split(',');
                console.log("trackIds separated is:", playlistData)
                // Fetch tracks data from Spotify using fetchTracksptfyById
                const tracksData = await Promise.all(
                    trackIds.map(async (trackId) => {
                        return await fetchTracksptfyById(trackId, token);
                    })
                );

                // Set the fetched track data to state
                setTracks(tracksData);
            } catch (error) {
                console.error("Error fetching playlist or tracks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            fetchPlaylistAndTracks();
        }
    }, [params.id, token]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthGuard>
            <div className='page-container'>
                <IntroContainer
                    id={params.id}
                    type={playlist.type}
                    title={playlist.name}
                    imgSrc={playlist.playlist_image_url}
                    playlist={tracks}
                    description={playlist.description}
                />

                {/* Render the TrackListContainer only if tracks exist */}
                {tracks.length > 0 && <TrackListContainer tracks={tracks} />}
            </div>
        </AuthGuard>
    );
};

export default Playlists;
