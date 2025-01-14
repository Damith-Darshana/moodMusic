// ===================================================================================================
// ------------------------------------------- DONE --------------------------------------------------
// ===================================================================================================
'use client';
import { useRef } from 'react';
import useWavesurfer from '@/hooks/useWavesurfer';
import VolumeSlider from './VolumeSlider';
import { formatDuration } from '@/utils/formatters';
import { useDispatch, useSelector } from 'react-redux';
import { MdSkipPrevious, MdSkipNext, MdPlayArrow, MdPause, MdVolumeUp, MdVolumeMute } from 'react-icons/md';
import { playNextSong, playPreviousSong, selectCurrentSong } from '@/redux/features/songsSlice';
import FavoriteButton from '../others/FavoriteButton';
import { TokenProvider } from '@/app/context/TokenContext';

const Player = () => {
    const dispatch = useDispatch();
    const waveContainerRef = useRef(null);
    // const { album, title, artist, preview: audioSrc, duration } = useSelector(selectCurrentSong);
    const {  title,cover,preview_url,artists,type,sptfy_id} = useSelector(selectCurrentSong);
    const { handlePlayPause, isPlaying, setAudioVolume, audioVolume } = useWavesurfer(waveContainerRef, preview_url, () => dispatch(playNextSong()));
    // const formattedDuration = formatDuration(duration);
    const formattedDuration = '0:30';
    console.log('Current Song:', { cover, title, preview_url,artists,cover,preview_url,artists,type,sptfy_id });
    // const currentSong = useSelector(selectCurrentSong);
    // console.log('Current Song Data:', currentSong);
    const artist = artists?.[0];
    return (
        <>
        
            <div className={ preview_url ? 'player' : 'player disable' }>
                <img src={ cover } alt='' />

                <div className='song-details'>
                    <span className='song-title overflowing-text'>{ title }</span>
                    <span className='artist-name'>{ artist?.name }</span>
                </div>

                <div className='control-buttons'>
                    <button onClick={ () => dispatch(playPreviousSong()) }>
                        <MdSkipPrevious />
                    </button>

                    <button
                        className='play-pause-btn'
                        onClick={ preview_url && handlePlayPause }
                    >
                        { 
                            isPlaying ? 
                                <MdPause /> :
                                <MdPlayArrow /> 
                        }
                    </button>

                    <button onClick={ () => dispatch(playNextSong()) }>
                        <MdSkipNext />
                    </button>
                </div>

                <div className='wave-container' ref={ waveContainerRef }></div>

                <span className='duration'>{ formattedDuration }</span>

                <TokenProvider>
                <span className='duration'>
                <FavoriteButton id={ sptfy_id } type={ type } sptfy_id={ sptfy_id } />
                </span>
                </TokenProvider>

                <div className='volume-slider-container'>
                    <button onClick={ () => setAudioVolume((prev) => ({ ...prev, isMuted: prev.value <= 0 ? true : ! prev.isMuted })) }>
                        { audioVolume.isMuted ? <MdVolumeMute /> : <MdVolumeUp /> }
                    </button>

                    {
                        preview_url &&
                            <VolumeSlider
                                audioVolume={ audioVolume }
                                onChange={ ([ value ]) => { setAudioVolume({ isMuted: value <= 0 ? true : false, value }) } }
                            />
                    }
                </div>
            </div>
        </>
    );
};

export default Player;



// ===================================================================================================
// ===================================================================================================
