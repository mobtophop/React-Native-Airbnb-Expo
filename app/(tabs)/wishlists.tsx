import React from 'react';
import {View, Text, SafeAreaView, Image, StyleSheet, StatusBar} from 'react-native';
import {defaultStyles} from "@/constants/Styles";
import Colors from "@/constants/Colors";

const Page = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <SafeAreaView style={defaultStyles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Wishlists</Text>
                    <View style={{gap: 5}}>
                        <Text style={{fontFamily: 'mon-sb'}}>Create your first wishlist</Text>
                        <Text style={{fontFamily: 'mon', color: Colors.grey}}>As you search, tap the heart icon to save your favorite places to stay or things to do to a wishlist.</Text>
                    </View>
                </View>
            </SafeAreaView>
        </>

    );
};

const styles = StyleSheet.create({
    headerContainer: {
        padding: 24,
        gap: 54
    },
    headerText: {
        fontFamily: 'mon-b',
        fontSize: 24,
    },
})

export default Page;
