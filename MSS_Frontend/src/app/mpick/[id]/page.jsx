import IntroContainer from '@/components/others/IntroContainer';
import TrackListContainer from '@/components/others/TrackListContainer';
import { fetchRadio } from '@/utils/fetchers';
import AuthGuard from '@/components/AuthGuard/AuthGuard';

export default async function RadioTrackList({ params }) {
    const { type, tracks, title, picture_medium } = await fetchRadio(params.id);

    return (
        <AuthGuard>
        <div className='radio-container page-container'>
            <IntroContainer
                id={ params.id }
                type={ type }
                imgSrc={ picture_medium }
                title={ title }
                playlist={ tracks }
                description='Radio'
            />

            <TrackListContainer tracks={ tracks } />
        </div>
        </AuthGuard>
    );
};
