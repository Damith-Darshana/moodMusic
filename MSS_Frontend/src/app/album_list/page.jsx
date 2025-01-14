import { fetchTopPlaylists } from "@/utils/fetchers";
import PlaylistListItem from "@/components/list-items/PlaylistListItem";
import Carousel from "@/components/others/Carousel";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import PlaylistManager from "@/components/PlaylistManager/PlaylistManager";
import { fetchArtist ,fetchAlbum} from "@/utils/fetchers";

const albums = async () => {
    // 
    const playlists = await fetchTopPlaylists();

    const artistAlbumsPromise = fetchAlbum(id);
    const artistAlbums = await artistAlbumsPromise;
    console.log('Data from artistAlbums:', artistAlbums);
    
    return (
        <AuthGuard>
        <div className='top-playlists-container'>
                
                   
            <Carousel header='System Generated Playlists'>
                {
                    playlists.map(playlist => {
                        const { id, name,playlist_image_url } = playlist;
                     
                        // const randomImage = images[Math.floor(Math.random() * images.length)];

                        return (
                            <>
                            
                            <PlaylistListItem
                                id={id}
                                key={id}
                                title={name}
                                imgSrc={playlist_image_url} // Pass the random image
                            />
                            </>
                        );
                    })
                }
            </Carousel> 

            {/* <Carousel header='User Created Playlists'> */}
            {/* <PlaylistManager /> */}
            {/* </Carousel> */}


            <div className='albums-container'>
                <Carousel header='Albums'>
                {
                    artistAlbums.map((album) => {
                        const { id, title, image_url, release_date } = album;
                        // const releaseYear = getYearFromDate(release_date);

                        return (
                            <LinkCardItem
                                key={ id }
                                title={ title }
                                imgSrc= { image_url }
                                href={ `/album/${ id }` }
                                // description={ `Album | ${ releaseYear }` }
                            />
                        )
                    })
                }
                </Carousel>
            </div>




           

        </div>
        </AuthGuard>
    );
};

export default albums;