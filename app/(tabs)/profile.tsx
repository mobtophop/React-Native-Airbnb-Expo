import React from 'react';
import {View, Text, Button} from 'react-native';
import {useAuth} from "@clerk/clerk-expo";
import {Link} from "expo-router";

const Page = () => {
    const {signOut, isSignedIn} = useAuth();
    return (
        <View>
            <Button title={'Sign out'} onPress={() => signOut()} />
            {!isSignedIn && (
                <Link href={'/(modals)/login'}>
                    <Text>Login</Text>
                </Link>
            )}
        </View>
    );
};

export default Page;
