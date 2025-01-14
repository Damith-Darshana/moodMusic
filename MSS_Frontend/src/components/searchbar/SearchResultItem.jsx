// 'use client';
// import { playSong } from '@/redux/features/songsSlice';
// import { useRouter } from 'next/navigation';
// import { useDispatch } from 'react-redux';

// const SearchResultItem = ({ type, result }) => {
//     const router = useRouter();
//     const dispatch = useDispatch();
//     const { id, name, title,cover} = result; 
    
//     return (
//         // <li
//         //     onClick={
//         //         type === 'track'
//         //             ? () => dispatch(playSong({ playlist: [result], index: 0}))
//         //             : () => router.push(`/${ type }/${ id }`)
//         //     }
//         // >
//         //     <img
//         //         src={ cover }
//         //         alt={ title || name }
//         //     />
//         //     <span className='overflowing-text'>{ name || title }</span>
//         // </li>

// <li
//   className={isSelected ? 'selected' : ''}
//   onClick={
//     type === 'track'
//       ? () => dispatch(playSong({ playlist: [result], index: 0 }))
//       : () => router.push(`/${type}/${id}`)
//   }
// >
//   <img src={cover} alt={title || name} />
//   <span className='overflowing-text'>{name || title}</span>
// </li>


//     );
// };

// export default SearchResultItem;






// 'use client';
// import { playSong } from '@/redux/features/songsSlice';
// import { useRouter } from 'next/navigation';
// import { useDispatch } from 'react-redux';
// import { useState } from 'react'; // Import useState

// const SearchResultItem = ({ type, result }) => {
//     const router = useRouter();
//     const dispatch = useDispatch();
    
//     const { id, name, title, cover } = result;
    
//     // Local state to track the selected item
//     const [selectedId, setSelectedId] = useState(null);
    
//     // Function to handle item click
//     const handleItemClick = () => {
//         setSelectedId(id); // Set the current item as selected
        
//         // Dispatch the appropriate action
//         if (type === 'track') {
//             dispatch(playSong({ playlist: [result], index: 0 }));
//         } else {
//             router.push(`/${type}/${id}`);
//         }
//     };
    
//     // Check if the current item is selected
//     const isSelected = selectedId === id;
    
//     return (
//         <li
//             className={isSelected ? 'selected' : ''}
//             onClick={handleItemClick} // Trigger the click handler
//         >
//             <img
//                 src={cover}
//                 alt={title || name}
//             />
//             <span className='overflowing-text'>{name || title}</span>
//         </li>
//     );
// };

// export default SearchResultItem;






'use client';
import { playSong } from '@/redux/features/songsSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const SearchResultItem = ({ type, result }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    
    const { id, name, title, cover, artist } = result;
    const artistNames = artist.map((artist) => artist.name).join(', '); // Concatenate artist names
    
    // Local state to track the selected item
    const [selectedId, setSelectedId] = useState(null);
    
    // Function to handle item click
    const handleItemClick = () => {
        setSelectedId(id); // Set the current item as selected
        
        // Dispatch the appropriate action
        if (type === 'track') {
            dispatch(playSong({ playlist: [result], index: 0 }));
        } else {
            router.push(`/${type}/${id}`);
        }
    };
    
    // Check if the current item is selected
    const isSelected = selectedId === id;
    
    return (
        <li
            className={isSelected ? 'selected' : ''}
            onClick={handleItemClick}
        >
            <img src={cover} alt={title || name} />
            <span className='overflowing-text'>{name || title}</span>
            <span className='artist-text'>{artistNames}</span> {/* Display artist name(s) */}
        </li>
    );
};

export default SearchResultItem;
