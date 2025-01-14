'use client';
import React, { useState } from 'react';
import Button from '@/components/Button/Button';
import TrackListContainer from "@/components/others/TrackListContainer";
import { fetchMoodData } from '@/utils/fetchers';
import AuthGuard from '@/components/AuthGuard/AuthGuard';

export default function TopRadio() {
  const [mood, setMood] = useState('Happy'); // Default mood
  const [tracks, setTracks] = useState([]);

  const handleMoodChange = async (newMood) => {
    try {
      const data = await fetchMoodData(newMood);
      setMood(newMood);
      setTracks(data);
    } catch (error) {
      console.error('Failed to fetch mood data:', error);
    }
  };

  return (
    <AuthGuard>
    <div className='top-radio-container page-container'>
      <h2>AI/ML MOOD Recommendations</h2>
      <ul>
        {['Calm', 'Excited', 'Happy', 'Melancholic', 'Neutral', 'Relaxed', 'Sad', 'Thoughtful', 'Upset', 'Worried'].map((moodId) => (
          <Button key={moodId} onClick={() => handleMoodChange(moodId)} style={{ margin: '5px' }}>
            {moodId} Mood
          </Button>
        ))}
      </ul>

      {/* <h2>AI/ML SONG Recommendations For Current Taste</h2> */}
      <TrackListContainer
        header='Songs Recommended By Our Machine Learning Model'
        tracks={tracks}
      />
    </div>
    </AuthGuard>
  );
}




