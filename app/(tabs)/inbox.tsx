import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const Page = () => {
    const [active, setActive] = useState(0)
    return (
        <SafeAreaView style={defaultStyles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Inbox</Text>
                <View style={styles.tabContainer}>
                    <TouchableOpacity onPress={() => setActive(0)}>
                        <Text style={[styles.tabText,{paddingRight: 20}, active === 1 ? {color: Colors.primary} : null]}>Messages</Text>
                        {active === 0 && <View style={styles.underline} />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActive(1)}>
                        <Text style={[styles.tabText, active === 0 ? {color: Colors.primary} : null]}>Notifications</Text>
                        {active === 1 && <View style={styles.underline} />}
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', height: '80%', width: '100%'}}>
                    <Text style={styles.centerText}>You're all caught up</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        padding: 24,
    },
    headerText: {
        fontFamily: 'mon-b',
        fontSize: 24,
        marginBottom: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        paddingBottom: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.grey,
    },
    tabText: {
        fontFamily: 'mon-sb',
    },
    underline: {
        position: 'absolute',
        height: 2,
        top: 31,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#000',
    },
    centerText: {
        fontFamily: 'mon',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default Page;
