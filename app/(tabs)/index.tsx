import { View } from 'react-native';
import React, {useMemo, useState} from 'react';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import listingsData from '@/assets/data/airbnb-listings.json';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ListingsMap from "@/components/ListingsMap";
import ListingsBottomSheet from "@/components/LinstingsBottomSheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const Page = () => {
    const items = useMemo(() => {
        const filteredListings = listingsData.filter((item: any) => item.medium_url);
        return filteredListings;
    }, []);
    const geToItems = useMemo(() => listingsDataGeo, []);
    const [category, setCategory] = useState<string>('Tiny homes');

    const onDataChanged = (category: string) => {
        setCategory(category);
    };
    return (
        <GestureHandlerRootView style={{ flex: 1, marginTop: 130 }}>
            <Stack.Screen
                options={{
                    header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
                }}
            />
            <ListingsMap listings={geToItems} />
            <ListingsBottomSheet listings={items} category={category} />
        </GestureHandlerRootView>
    );
};

export default Page;
