import React, { useRef } from 'react';
import { BlurView } from 'expo-blur';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Platform, Animated } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window')

// components
import ContactCard from '../../components/contactCard'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
    const navigation = useNavigation();

    const navigateToSettings = () => {
        console.log('Navigating to Settings');
        navigation.navigate('Settings')
    }

    const scrollY = useRef(new Animated.Value(0)).current;

    return (
        <ScrollView
            contentContainerStyle={styles.container}>
            <View style={styles.body}>
                <View style={styles.topBox}>
                    <View style={styles.avatar}>
                        <Avatar
                            size={100}
                            rounded
                            title='👩🏻‍🦱'
                            backgroundColor="#ff12"
                            titleStyle={{ fontSize: 70 }}
                        />
                    </View>

                    <View style={styles.detailsBox}>
                        <Text style={styles.texts}>Athreya</Text>
                        <Text style={styles.texts}>akondiathreya@gmail.com</Text>
                        <Text style={styles.texts}>+91 9491728563</Text>
                        <Text style={styles.texts}>Male - 22</Text>
                    </View>
                </View>

                <View style={styles.contactsBox}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Emergency Contacts</Text>
                    </View>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <ContactCard key={index} />
                    ))}
                </View>
                <TouchableOpacity onPress={navigateToSettings} style={{ alignItems: 'center', marginTop: 20 }}>
                    <BlurView
                        intensity={100}
                        style={{
                            width: width - 30,
                            padding: 15,
                            borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={styles.text2}>Settings</Text>
                        <Ionicons name="settings-outline" size={24} color="#fff" />
                    </BlurView>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
    },
    iconButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    body: {
        height: 'auto',
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 15,
        paddingBottom: 200,
    },
    topBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20
    },
    avatar: {
        borderRadius: 100,
        borderWidth: 2,
        width: 105,
    },
    detailsBox: {
        padding: 10,
        justifyContent: 'space-between',
    },
    texts: {
        color: '#000',
        fontSize: 16,
        marginVertical: 4,
    },
    contactsBox: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FAF6E9',
        borderRadius: 10,
        gap: 15,
        paddingBottom: 20,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 4,
        marginLeft: 10,
    },
    text2: {
        color: '#000',
        fontSize: 16,
        marginVertical: 4,
        marginLeft: 10,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
    },
})