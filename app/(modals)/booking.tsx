import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useRouter} from "expo-router";
// import DatePicker from 'react-native-modern-datepicker';
import Colors from "@/constants/Colors";
import {BlurView} from "expo-blur";
import Animated, {SlideInDown} from "react-native-reanimated";
import {defaultStyles} from "@/constants/Styles";
import {Ionicons} from "@expo/vector-icons";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const guestsGropus = [
    {
        name: 'Adults',
        text: 'Ages 13 or above',
        count: 0,
    },
    {
        name: 'Children',
        text: 'Ages 2-12',
        count: 0,
    },
    {
        name: 'Infants',
        text: 'Under 2',
        count: 0,
    },
    {
        name: 'Pets',
        text: 'Pets allowed',
        count: 0,
    },
];

const Page = () => {
    const [openCard, setOpenCard] = useState(0);
    const [selectedPlace, setSelectedPlace] = useState(0);

    const [groups, setGroups] = useState(guestsGropus);
    const router = useRouter();
    const today = new Date().toISOString().substring(0, 10);

    const onClearAll = () => {
        setSelectedPlace(0);
        setOpenCard(0);
    };

    return (
      <BlurView
          intensity={70}
          tint='light'
          style={styles.container}
      >
          <View style={styles.card}>
              {openCard !== 0 && (
                  <AnimatedTouchableOpacity onPress={setOpenCard(0)}>
                      <Text style={styles.previewText}>Where</Text>
                      <Text style={styles.previewData}>I'm flexible</Text>
                  </AnimatedTouchableOpacity>
              )}
          </View>

          <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)} >
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableOpacity onPress={onClearAll} style={{justifyContent: 'center'}}>
                        <Text style={{fontSize: 18, fontFamily: 'mon-sb', textDecorationLine: 'underline'}}>
                            Clear all
                        </Text>
                    </TouchableOpacity>

                  <TouchableOpacity onPress={() => router.back()} style={[defaultStyles.btn, {paddingRight: 20, paddingLeft: 50}]}>
                      <Ionicons name='search-outline' size={24} color={'#fff'} style={defaultStyles.btnIcon}/>
                      <Text style={defaultStyles.btnText}>
                          Clear all
                      </Text>
                  </TouchableOpacity>
              </View>
          </Animated.View>
      </BlurView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        margin: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        gap: 20,
    },
    cardHeader: {
        fontFamily: 'mon-b',
        fontSize: 24,
        padding: 20,
    },
    cardBody: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    cardPreview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },

    searchSection: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ABABAB',
        borderRadius: 8,
        marginBottom: 16,
    },
    searchIcon: {
        padding: 10,
    },
    inputField: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    placesContainer: {
        flexDirection: 'row',
        gap: 25,
    },
    place: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    placeSelected: {
        borderColor: Colors.grey,
        borderWidth: 2,
        borderRadius: 10,
        width: 100,
        height: 100,
    },
    previewText: {
        fontFamily: 'mon-sb',
        fontSize: 14,
        color: Colors.grey,
    },
    previewData: {
        fontFamily: 'mon-sb',
        fontSize: 14,
        color: Colors.dark,
    },

    guestItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    itemBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.grey,
    },
});

export default Page;
