import React from 'react';
import {View, Text} from 'react-native';
import {useLocalSearchParams} from "expo-router";

const Page = () => {
    const {id} = useLocalSearchParams<{id: string}>();
    console.log('id', id);
    return (
        <View>
            <Text>
                Page
            </Text>
        </View>
    );
};

export default Page;
