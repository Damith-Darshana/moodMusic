'use client'; // Ensure this is a client component

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/navigation/Sidebar';
import Player from '@/components/player/Player';
import SearchBar from '@/components/searchbar/SearchBar';
import ReduxProvider from '@/redux/ReduxProvider';

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname(); // Get the current pathname
  const noLayoutPages = ['/login','/register'];
  const isNoLayout = noLayoutPages.includes(pathname);

  return (
    <ReduxProvider>
      <div className='wrapper'>
        {/* Render layout only if not on the login page */}
        {!isNoLayout && (
          <>
            <Sidebar />
            <div className='main-container'>
              <SearchBar />
              <main>{children}</main>
            </div>
            <Player />
          </>
        )}
        {/* If it's the login page, render only children */}
        {isNoLayout && children}
      </div>
    </ReduxProvider>
  );
};

export default LayoutWrapper;
