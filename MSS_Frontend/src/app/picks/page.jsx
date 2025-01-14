
'use client';
import { useEffect, useState } from 'react';
import Button from "@/components/Button/Button";
import LinkCardItem from "@/components/list-items/LinkCardItem";
import TrackListContainer from "@/components/others/TrackListContainer";
import { fetchAiFavPicks } from "@/utils/fetchers";
import AuthGuard from "@/components/AuthGuard/AuthGuard";

export default function Picks() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchAiFavPicks();
                setData(result);
               
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };
        
        fetchData();
    }, []); // Empty dependency array to run only once on mount
    console.log("mlPicks",data);
    return (
        <AuthGuard>
            <div className='top-radio-container page-container'>
                <h2>AI/ML Discover New Tracks From Your Past Listening Habits and Favorites</h2>

                {loading ? ( // Conditional rendering for loading state
                    <div>Loading...</div> // Replace with a spinner or other loading indicator as needed
                ) : (
                    <TrackListContainer
                        header='Recommended Tracks'
                        tracks={data}
                    />
                )}
            </div>
        </AuthGuard>
    );
}

















