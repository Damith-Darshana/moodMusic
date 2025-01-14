// ===================================================================================================
// ------------------------------------------- NOTDONE --------------------------------------------------
// ===================================================================================================
'use client';
import React from 'react';
import Link from 'next/link';
import { formatDuration } from '@/utils/formatters';
import { useDispatch } from 'react-redux';
import { playSong } from '@/redux/features/songsSlice';
import FavoriteButton from '../others/FavoriteButton';

const TrackListItem = ({ index, playlist, track: { id, title, type ,cover,artist ,sptfy_id} }) => {
    const dispatch = useDispatch();
    const artistObject = artist?.[0];
    const formattedDuration = '0:30';
    // console.log('TrackListItem Rendered');
    // console.log('Index:', index);
    // console.log('Rendered from track-list_Items ');
    // console.log('Playlist:', playlist);
    // console.log('Track:', type);
    // console.log('Formatted Duration:', formattedDuration);
    return (
        <li
            className='track-list-item'
            onClick={ () => dispatch(playSong({index, playlist}))  }
        >
            {/* <img src={ album.cover_medium } alt="" /> */}
            <img src={ cover } alt="" />
            

            <div className='song-details'>
                <div>
                    <strong className='overflowing-text'>{ title }</strong>

                    <Link
                        href={ `/artist/${  artistObject.id }` }
                        className='artist-name overflowing-text'
                        onClick={ (e) => e.stopPropagation() }
                    >
                        {  artistObject.name }
                    </Link>



                </div>

                <span>{ formattedDuration }</span>
                
                {/* <FavoriteButton id={ id } type={ type } /> */}
                <FavoriteButton id={ sptfy_id } type={ type } sptfy_id={ sptfy_id } />

            </div>
        </li>
    );
};

export default TrackListItem;

