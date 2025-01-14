// ===================================================================================================
// ------------------------------------------- DONE --------------------------------------------------
// ===================================================================================================
import { fetchTopArtists } from '@/utils/fetchers';
import LinkCardItem from '../list-items/LinkCardItem';
import { compactNumber } from '@/utils/formatters';
import Carousel from "./Carousel";

const TopArtistsContainer = async ({ limit }) => {
    const artists = await fetchTopArtists({ limit });

    return (
        <div className='top-artists-container'>
            {/* <h2>Top Artist</h2> */}
            <Carousel header='Top Artist'>
            {/* <ul> */}
            
                {
                    artists.map(artist => {
                        // const { id, name, image_url, nb_album, nb_fan } = artist;
                        const { id, name, image_url } = artist;
                        // const formattedFanNumber = compactNumber(nb_fan);

                        return (
                            <LinkCardItem
                                key={ id }
                                title={ name }
                                imgSrc= { image_url }
                                href={ `/artist/${ id }` }
                                description={ ` 0 Fans | 0 Albums` }
                                // description={ `${ formattedFanNumber } Fans | ${ nb_album } Albums` }
                            />
                        );
                    })
                }
               
            {/* </ul> */}
            </Carousel> 
        </div>
    );
};

export default TopArtistsContainer;
