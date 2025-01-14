// import { fetchTopPlaylists } from "@/utils/fetchers";
// import PlaylistListItem from "@/components/list-items/PlaylistListItem";
// import Carousel from "./Carousel";

// const Playlists = async () => {
//     const playlists = await fetchTopPlaylists();
    
//     return (
//         <div className='top-playlists-container'>            
//             <Carousel header='Playlists'>
//                 {
//                     playlists.map(playlist => {
//                         // const { id, title, creation_date, picture_medium } = playlist;
//                         const { id, title } = playlist;

//                         return (
//                             <PlaylistListItem
//                                 id={ id }
//                                 key={ id }
//                                 title={ title }
//                                 // imgSrc={ picture_medium }
//                                 // creationDate={ creation_date }
//                             />
//                         );
//                     })
//                 }
//             </Carousel>        
//         </div>
//     );
// };

// export default Playlists;




import { fetchTopPlaylists } from "@/utils/fetchers";
import PlaylistListItem from "@/components/list-items/PlaylistListItem";
import Carousel from "./Carousel";

// Sample array of image URLs
// const images = [
//     '/images/image1.jpg',
//     '/images/image2.jpg',
//     '/images/image3.jpg',
//     '/images/image4.jpg',
//     '/images/image5.jpg',
//     '/images/image6.jpg',
//     '/images/image7.jpg',
//     '/images/image8.jpg',
//     '/images/image9.jpg',
//     '/images/image10.jpg',
//     '/images/image11.jpg',
//     // Add more image paths as needed
// ];



const Playlists = async () => {
    const playlists = await fetchTopPlaylists();
    
    return (
        <div className='top-playlists-container'>            
            <Carousel header='Playlists'>
                {
                    playlists.map(playlist => {
                        const { id, name,playlist_image_url } = playlist;
                     
                        // const randomImage = images[Math.floor(Math.random() * images.length)];

                        return (
                            <PlaylistListItem
                                id={id}
                                key={id}
                                title={name}
                                imgSrc={playlist_image_url} // Pass the random image
                            />
                        );
                    })
                }
            </Carousel>        
        </div>
    );
};

export default Playlists;
