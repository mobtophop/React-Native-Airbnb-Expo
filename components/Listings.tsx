import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

interface Props {
    listings: any[];
    category: string;
}
const Listings = ({listings, category}: Props) => {
    useEffect(() => {
        console.log('listing length,', listings.length )
    }, [category]);
    return (
        <View>
            <Text>
                Listings
            </Text>
        </View>
    );
};

export default Listings;
