// ===================================================================================================
// ------------------------------------------- notDONE --------------------------------------------------
// ===================================================================================================
import IntroContainer from "@/components/others/IntroContainer";
import TrackListContainer from "@/components/others/TrackListContainer";
import { fetchPlaylist } from "@/utils/fetchers";
import AuthGuard from "@/components/AuthGuard/AuthGuard";

const Playlists = async ({ params }) => {
    // const { type, title, description, picture_medium, tracks } = await fetchPlaylist(params.id);
    let playlist = { name: '',type:'', description: '', tracks: [] };
    playlist = await fetchPlaylist(params.id);
    const tracks = Array.isArray(playlist.tracks) ? playlist.tracks : [];


    return (
        <AuthGuard>
        <div className='page-container'>
            <IntroContainer
                id={ params.id }
                type={ playlist.type }
                title={playlist.name}
                // imgSrc={tracks[0]?.preview_url || ''}
                imgSrc={playlist.playlist_image_url}
                playlist={ tracks }
                description={playlist.description}
            />
            
            <TrackListContainer tracks={ tracks }/>
        </div>
        </AuthGuard>
    );
};

export default Playlists;
