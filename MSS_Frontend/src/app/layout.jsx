// import { Rubik } from 'next/font/google';
import './globals.css';
// import LayoutWrapper from '@/components/LayoutWrapper';
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper';
import { TokenProvider } from './context/TokenContext';


export const metadata = {
  title: 'MSS Platform',
  description: 'Discover your favourite musics and song in a new way',
};

// const rubik = Rubik({
//   subsets: ['latin'],
// });

export default function RootLayout({ children }) {
  return (
    // <html lang='en' className={rubik.className}>
    <html lang='en' >
      <body>
      
        <LayoutWrapper>
        <TokenProvider>
          {children}
          </TokenProvider>
          </LayoutWrapper>
          
      </body>
    </html>
  );
}
