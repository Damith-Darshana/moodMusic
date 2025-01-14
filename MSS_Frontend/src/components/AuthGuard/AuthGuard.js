'use client'; // Ensure client-side rendering

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // If no token, redirect to the login page
      router.push('/login');
    } else {
      // If token exists, set the user as authenticated
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    // You can render a loader while the auth check is happening
    return <div>Loading...</div>;
  }

  return children;
}
