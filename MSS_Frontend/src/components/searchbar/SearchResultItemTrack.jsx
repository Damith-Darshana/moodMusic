'use client';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const SearchResultItem = ({ type, result, onSelect }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    // console.log("result", result.sptfy_id)
    const { id, name, title, cover,sptfy_id } = result;
    
    // Local state to track the selected item
    const [selectedId, setSelectedId] = useState(null);
    
    // Function to handle item click
    const handleItemClick = () => {
        setSelectedId(sptfy_id); // Set the current item as selected
        
        // Call the onSelect function to handle track selection
        if (type === 'track' && onSelect) {
            onSelect(sptfy_id); // Pass the track ID to the parent component
        } else {
            router.push(`/${type}/${id}`);
        }
    };
    
    // Check if the current item is selected
    const isSelected = selectedId === sptfy_id;
    
    return (
        <li
            className={isSelected ? 'selected' : ''}
            onClick={handleItemClick} // Trigger the click handler
        >
            <img
                src={cover}
                alt={title || name}
            />
            <span className='overflowing-text'>{name || title}</span>
        </li>
    );
};

export default SearchResultItem;
