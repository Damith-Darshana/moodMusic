'use client'; // This ensures it's a Client Component

import React from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router
import { userLogout } from '@/utils/fetchers';

const LogoutButton = () => {
    const router = useRouter(); // from next/navigation

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const result = await userLogout(token);
                if (result) {
                    localStorage.removeItem('token');
                    router.push('/login'); // Redirect to the login page
                } else {
                    console.log('Logout failed');
                }
            } catch (error) {
                console.error('Logout error:', error);
            }
        } else {
            console.log('No token found');
        }
    };

    return (
        <button style={{ color: 'white' }} onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
