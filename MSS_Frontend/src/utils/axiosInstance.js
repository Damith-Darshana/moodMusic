// utils/fetchers.js

import axios from 'axios';

export const fetchMoodData = async (moodId) => {
  try {
    // Use the correct path to match the actual API route
    const response = await axios.get(`/api/mood?mood=${moodId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch mood data');
  }
};
