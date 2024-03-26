import { View } from 'react-native';
import React, {useMemo, useState} from 'react';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from "@/components/Listings";
import listingsData from '@/assets/data/airbnb-listings.json';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ListingsMap from "@/components/ListingsMap";

const Page = () => {
    const items = useMemo(() => {
        const filteredListings = listingsData.filter(item => item.medium_url);
        return filteredListings;
    }, []);
    const geToItems = useMemo(() => listingsDataGeo, []);
    const [category, setCategory] = useState<string>('Tiny homes');

    const onDataChanged = (category: string) => {
        setCategory(category);
    };
    return (
        <View
            style={{ flex: 1, marginTop: 130 }}
        >
            <Stack.Screen
                options={{
                    header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
                }}
            />
            <Listings listings={items} category={category}/>
            <ListingsMap listings={geToItems} />
        </View>
    );
};

export default Page;
