
'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { useSelector } from 'react-redux';
import { selectFavorites } from '@/redux/features/favoritesSlice';
import TracksTabContent from '@/components/favorites-page/tabs/TracksTabContent';
import TabContentContainer from '@/components/favorites-page/TabContentContainer';

const TabsContainer = () => {
    const favorites = useSelector(selectFavorites);

    return (
        <>
            <Tabs.Content value='tracks'>
                <TabContentContainer entities={ favorites.track }>
                    <TracksTabContent tracks={ favorites.track } />
                </TabContentContainer>
            </Tabs.Content>

        </>
    );
};

export default TabsContainer;