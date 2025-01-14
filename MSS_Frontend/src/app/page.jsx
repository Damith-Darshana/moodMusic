// ===================================================================================================
// ------------------------------------------- notDONE --------------------------------------------------
// ===================================================================================================
import Playlists from "@/components/others/Playlists";
import TrackListContainer from "@/components/others/TrackListContainer";
import { fetchTopTracks } from "@/utils/fetchers";
import TopArtistsContainer from "@/components/others/TopArtistsContainer";
import AuthGuard from "@/components/AuthGuard/AuthGuard";
import Sidebar from '@/components/navigation/Sidebar';
import '@/styles/style.css'
import CircleComponent from "@/components/particle/particle";

export default async function Home() {
  const tracks = await fetchTopTracks({ limit: 10 });
  // console.log('Tracks:', tracks);

  return (
    <AuthGuard>
      <div class="container">
      <CircleComponent />
      
    <div className='home-container'>
      <TrackListContainer
        header=' Global Top Musics '
        tracks={ tracks }
      />
      <TopArtistsContainer limit={ 3 }/>
      <Playlists />
    </div>

    


    </div>
    </AuthGuard>
  )
}


