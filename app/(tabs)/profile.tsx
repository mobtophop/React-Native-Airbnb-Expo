import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image} from 'react-native';
import {useAuth, useUser} from "@clerk/clerk-expo";
import {Link} from "expo-router";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {defaultStyles} from "@/constants/Styles";
import Colors from "@/constants/Colors";
import * as ImagePicker from 'expo-image-picker';

const Page = () => {
    const {signOut, isSignedIn} = useAuth();
    const { user } = useUser();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (!user) {
            return;
        }

        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.emailAddresses[0].emailAddress);
    }, [user]);

    const onSaveUser = async () => {
        try {
            await user?.update({
                firstName: firstName!,
                lastName: lastName!,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setEdit(false);
        }
    };

    const onCaptureImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.75,
            base64: true,
        });

        if (!result.canceled) {
            const base64 = `data:image/png;base64,${result.assets[0].base64}`;
            user?.setProfileImage({
                file: base64,
            });
        }
    };

    return (
        <SafeAreaView style={defaultStyles.container}>
            <View style={{paddingHorizontal: 24}}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Profile</Text>
                </View>
                <Text style={{color: Colors.grey, marginBottom: 40}}>Log in to start planning your next trip.</Text>

                {user && (
                    <View style={styles.card}>
                        <TouchableOpacity onPress={onCaptureImage}>
                            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', gap: 6 }}>
                            {!edit && (
                                <View style={styles.editRow}>
                                    <Text style={{ fontFamily: 'mon-b', fontSize: 22 }}>
                                        {firstName} {lastName}
                                    </Text>
                                    <TouchableOpacity onPress={() => setEdit(true)}>
                                        <Ionicons name="create-outline" size={24} color={Colors.dark} />
                                    </TouchableOpacity>
                                </View>
                            )}
                            {edit && (
                                <View style={styles.editRow}>
                                    <TextInput
                                        placeholder="First Name"
                                        value={firstName || ''}
                                        onChangeText={setFirstName}
                                        style={[defaultStyles.inputField, { width: 100 }]}
                                    />
                                    <TextInput
                                        placeholder="Last Name"
                                        value={lastName || ''}
                                        onChangeText={setLastName}
                                        style={[defaultStyles.inputField, { width: 100 }]}
                                    />
                                    <TouchableOpacity onPress={onSaveUser}>
                                        <Ionicons name="checkmark-outline" size={24} color={Colors.dark} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                        <Text>{email}</Text>
                        <Text>Since {user?.createdAt!.toLocaleDateString()}</Text>
                    </View>
                )}

                {isSignedIn && <Button title="Log Out" onPress={() => signOut()} color={Colors.dark} />}
                {!isSignedIn && (
                    <>
                        <Link href={'/(modals)/login'} asChild >
                            <TouchableOpacity style={defaultStyles.btn}>
                                <Text style={defaultStyles.btnText}>Log in</Text>
                            </TouchableOpacity>
                        </Link>

                        <View style={{flexDirection: 'row', alignItems: 'center',marginTop: 20}}>
                            <Text style={{paddingRight: 5}}>Don't have an account?</Text>
                            <Link href={'/(modals)/login'} asChild>
                                <Text style={{textDecorationLine: 'underline'}}>Sign up</Text>
                            </Link>
                        </View>

                        <View style={styles.container}>
                            <View style={{}}>
                                <Text style={{fontFamily: 'mon-sb', paddingBottom: 10, fontSize: 16}}>Airbnb your place</Text>
                                <Text style={{color: Colors.grey, fontSize: 14}}>It is simple to get set up{'\n'}and start earning.</Text>
                            </View>
                            <Image style={styles.image} source={require('@/assets/images/building.png')} />
                        </View>
                        <View style={{ justifyContent: 'space-between',flexDirection: 'row', marginTop: 30}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Ionicons name='settings-outline' size={22} color={Colors.dark} />
                                <Text style={{paddingLeft: 14, color: Colors.dark}}>Settings</Text>
                            </View>
                            <MaterialIcons name={'keyboard-arrow-right'} size={24} />
                        </View>

                        <View style={{ justifyContent: 'space-between',flexDirection: 'row', marginTop: 30}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Ionicons name='help-circle-outline' size={24} color={Colors.dark} />
                                <Text style={{paddingLeft: 12, color: Colors.dark}}>Get help</Text>
                            </View>
                            <MaterialIcons name={'keyboard-arrow-right'} size={24} />
                        </View>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 10,
    },
    headerText: {
        fontFamily: 'mon-b',
        fontSize: 24,
    },
    card: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 16,
        marginHorizontal: 24,
        marginTop: 24,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        alignItems: 'center',
        gap: 14,
        marginBottom: 24,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.grey,
    },
    editRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    container: {
        marginTop: 20,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        height: 130,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#e5e5e5',
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    image: {
        resizeMode: 'contain',
        width: 80,
        height: 80
    }
})

export default Page;
