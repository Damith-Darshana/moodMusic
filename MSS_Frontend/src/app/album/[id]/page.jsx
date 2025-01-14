'use client';
import { useEffect, useState, useContext } from "react";
import IntroContainer from "@/components/others/IntroContainer";
import TrackListContainer from "@/components/others/TrackListContainer";
import { getYearFromDate } from "@/utils/formatters";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import TokenContext from "@/app/context/TokenContext";

const AlbumPage = ({ params }) => {
    const { token } = useContext(TokenContext);
    const [album, setAlbum] = useState(null);
    const [trackDetails, setTrackDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAlbumAndTracks = async () => {
            try {
                setIsLoading(true); // Start loading state

                // Fetch album details
                const response = await fetch('/api/album/' + params.id);
                const albums = await response.json(); // Parse the JSON response

                if (!albums || albums.length === 0) {
                    throw new Error("Album not found");
                }

                const albumData = albums[0];
                console.log("Fetched album data:", albumData); // Log the album data
                setAlbum(albumData);

                // Check for tracks
                if (!albumData.tracks || !Array.isArray(albumData.tracks)) {
                    throw new Error("No valid tracks found in album");
                }

                // Fetch details for each track from your new API route
                const trackDetailsPromises = albumData.tracks.map(trackId => 
                    fetch(`/api/trackid/${trackId}`).then(res => res.json())
                );
                const trackDetails = await Promise.all(trackDetailsPromises);
                console.log("Fetched fetchedTracks:", trackDetails);

                setTrackDetails(trackDetails.filter(Boolean)); // Remove any null/undefined results
            } catch (error) {
                console.error("Error loading album or tracks:", error);
            } finally {
                setIsLoading(false); // End loading state
            }
        };

        loadAlbumAndTracks();
    }, [params.id]);

    if (isLoading) {
        return <div>Loading...</div>; // Optionally display a loading state
    }

    if (!album) {
        return <div>Album not found</div>; // Handle case where album is not found
    }

    const { title, image_url, type, release_date } = album;
    const releaseYear = getYearFromDate(release_date);

    return (
        <AuthGuard>
            <div className='page-container'>
                <IntroContainer
                    id={params.id}
                    type={type}
                    title={title}
                    description={`Album released in ${releaseYear}`}
                    imgSrc={image_url}
                    playlist={trackDetails}
                />
                <TrackListContainer tracks={trackDetails} />
            </div>
        </AuthGuard>
    );
};

export default AlbumPage;
