// ===================================================================================================
// -------------------------------------------not DONE --------------------------------------------------
// ===================================================================================================
import LinkCardItem from "@/components/list-items/LinkCardItem";
import Carousel from "@/components/others/Carousel";
import IntroContainer from "@/components/others/IntroContainer";
import TrackListContainer from "@/components/others/TrackListContainer";
import { compactNumber, getYearFromDate } from "@/utils/formatters";
// import { fetchArtist, fetchArtistAlbums, fetchArtistTopTracks } from "@/utils/fetchers";
import { fetchArtist ,fetchAlbum} from "@/utils/fetchers";
import AuthGuard from "@/components/AuthGuard/AuthGuard";

const ArtistPage = async ({ params: { id } }) => {
    const artistPromise = fetchArtist(id);
    // const topTracksPromise = fetchArtistTopTracks(id);
    // const artistAlbumsPromise = fetchArtistAlbums(id, { limit: 20 });

    // const [artist, topTracks, artistAlbums] = await Promise.all([artistPromise, topTracksPromise, artistAlbumsPromise]);
    // const formattedFanNumber = compactNumber(artist.nb_fan);
    const artistAlbumsPromise = fetchAlbum(id);
    const artistAlbums = await artistAlbumsPromise;
    console.log('Data from artistAlbums:', artistAlbums);
    const formattedFanNumber = '0';
    // const [artist, topTracks] = await Promise.all([artistPromise, topTracksPromise]);
    const artist = await artistPromise;

    // console.log('Artist Details:', artist);
    // console.log('Top Tracks:', topTracks);
    if (!artist) {
        // Handle the case where artist data is not available
        return (
            <div className='page-container'>
                <p>Artist not found.</p>
            </div>
        );
    }

    return (
        <AuthGuard>
        <div className='artist-page'>
            
            <IntroContainer
                id={ id }
                type={ artist.type }
                title={ artist.name }
                imgSrc={ artist.image_url }
                description={ `${ formattedFanNumber } Fans` }
                playlist={ artist.tracks }
                // playlist={ topTracks }
            />

            {/* <TrackListContainer header='Top Songs' tracks={ topTracks } /> */}
            <TrackListContainer header='Top Songs' tracks={ artist.tracks } />

            <div className='albums-container'>
                <Carousel header='Albums'>
                {
                    artistAlbums.map((album) => {
                        const { id, title, image_url, release_date } = album;
                        const releaseYear = getYearFromDate(release_date);

                        return (
                            <LinkCardItem
                                key={ id }
                                title={ title }
                                imgSrc= { image_url }
                                href={ `/album/${ id }` }
                                description={ `Album | ${ releaseYear }` }
                            />
                        )
                    })
                }
                </Carousel>
            </div>
            
        </div>
        </AuthGuard>
    );
}

export default ArtistPage;