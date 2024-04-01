import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {defaultStyles} from "@/constants/Styles";
import Colors from "@/constants/Colors";
import {Link} from "expo-router";

const Page = () => {
  return (
    <SafeAreaView style={defaultStyles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Trips</Text>
            <View style={{gap: 5}}>
                <Text style={{fontFamily: 'mon-sb'}}>Upcoming reservations</Text>
                <Text style={{fontFamily: 'mon', color: Colors.grey}}>Currently you don't have any reservations</Text>
            </View>

            <Link href={"/explore"} asChild >
                <TouchableOpacity style={defaultStyles.btn}>
                    <Text style={defaultStyles.btnText}>Let's explore</Text>
                </TouchableOpacity>
            </Link>
        </View>
    </SafeAreaView>
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
