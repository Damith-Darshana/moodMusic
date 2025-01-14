'use client';
import { SWRConfig } from 'swr';
import { fetchProxyMultipleEntities } from '@/utils/fetchers';
import TabsContainer from '@/components/favorites-page/TabsContainer';
import * as Tabs from '@radix-ui/react-tabs';
import { Suspense } from 'react';
import Loader from '../loading';
import AuthGuard from '@/components/AuthGuard/AuthGuard';

const FavoritesPage = () => {
    return (
        <AuthGuard>
            <Tabs.Root
                className='page-container tabs-container'
                defaultValue='tracks'
            >
                <Tabs.List className='tablist'>
                    <Tabs.Trigger value='tracks'>Tracks</Tabs.Trigger>
                    <Tabs.Trigger value='albums'>Albums</Tabs.Trigger>
                    {/* <Tabs.Trigger value='radio'>Radio</Tabs.Trigger> */}
                    <Tabs.Trigger value='artists'>Artists</Tabs.Trigger>
                    <Tabs.Trigger value='playlists'>Playlists</Tabs.Trigger>
                </Tabs.List>

                <Suspense fallback={<Loader />}>
                    <SWRConfig
                        value={{
                            fetcher: async ({ entitiesIds, endpoint }) => {
                                const promises = entitiesIds.map(async (id) => {
                                    const res = await fetch(endpoint + '/' + id);
                                    // Log the response for debugging
                                    console.log(`Response for ID ${id}:`, res);
                                    return res.json();
                                });

                                const results = await Promise.all(promises);
                                // Log the final results for debugging
                                console.log('All results:', results);
                                return results;
                            },
                            suspense: true
                        }}
                    >
                        <TabsContainer />
                    </SWRConfig>
                </Suspense>
            </Tabs.Root>
        </AuthGuard>
    );
};

export default FavoritesPage;





