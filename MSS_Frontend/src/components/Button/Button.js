'use client';  // Ensure it's a client-side component

import React, { useState } from 'react';
import { fetchMoodData } from '@/utils/fetchers';
import TrackListContainer from "@/components/others/TrackListContainer";

const Button = ({ onClick, children, style, id }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    console.log('Button clicked, fetching data for mood:', id);  // Debug log
    
    try {
      const result = await fetchMoodData(id);
      console.log('Data fetched successfully:', result);  // Debug log
      setData(result);
      if (onClick) {
        onClick(event, id, result);
      }
    } catch (err) {
      console.error('Error fetching data:', err);  // Debug log
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
      console.log('Loading state reset');  // Debug log
    }
  };

  return (
    <>
      <button id={id} onClick={handleClick} className="buttonx" style={style}>
        {loading ? 'Loading...' : children}
        {error && <div>{error}</div>}
      </button>
    </>
  );
};

export default Button;

