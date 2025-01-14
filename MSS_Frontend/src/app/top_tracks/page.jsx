import { fetchTopTracks } from "@/utils/fetchers";
import TrackListContainer from "@/components/others/TrackListContainer";
import AuthGuard from "@/components/AuthGuard/AuthGuard";

export default async function TopTracks() {
    const tracks = await fetchTopTracks();

    return (
        <AuthGuard>
        <TrackListContainer
            header=' Top Tracks Just For You'
            tracks={ tracks }
        />
        </AuthGuard>
    );
}