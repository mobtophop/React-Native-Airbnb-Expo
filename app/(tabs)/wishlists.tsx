import React from 'react';
import {View, Text} from 'react-native';
import {Link} from "expo-router";

const Page = () => {
    return (
        <View>
            <Link href={"/(modals)/login"}>Login</Link>
            <Link href={"/(modals)/booking"}>Booking</Link>
            <Link href={"/listing/1234"}>Listing</Link>
        </View>
    );
};

export default Page;
