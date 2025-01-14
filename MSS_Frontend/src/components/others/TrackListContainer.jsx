// ===================================================================================================
// ------------------------------------------- DONE --------------------------------------------------
// ===================================================================================================

import React from 'react';
import TrackListItem from '../list-items/TrackListItem';
import TrackListItemMl from '../list-items/TrackListItemMl';

const TrackListContainer = ({ header, tracks }) => {
    // Debug logs
    // console.log('TrackListContainer Rendered');
    console.log('Header:', header);
    console.log('Tracks:', tracks);

    return (
        <div className='track-list-container'>
            { !!header && <h2>{ header }</h2> }

            <ul>
                {
                    tracks.map((track, index) => {
                        // Debug log for each track
                        // console.log(`Rendering track ${index}:`, track);
                        // console.log(`Rendering track ${index}:`, track.id);
                        // console.log('TrackListItem Rendered from track-list-container ');
                        // console.log('Index:', index);
                        // console.log('Playlist:', playlist);
                        // console.log('Track:', track);
                        if (!track) {
                            return null; // or some fallback UI
                        }
                        console.log('artist_ids:', track);
                        return (
                            // <div></div>
                            <TrackListItemMl
                                key={track.id}
                                index={index}
                                playlist={tracks}
                                track={track}
                            />
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default TrackListContainer;
