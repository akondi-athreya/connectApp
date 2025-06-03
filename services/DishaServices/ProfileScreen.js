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
    const headerTranslate = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -230],
        extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const headerScale = scrollY.interpolate({
        inputRange: [0, 90],
        outputRange: [1, 0.6],
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#008B8B' }}>
            <Animated.View
                style={[
                    styles.header,
                    {
                        transform: [{ translateY: headerTranslate }, { scale: headerScale }],
                        opacity: headerOpacity,
                        zIndex: 1000, // keep on top
                    },
                ]}
                pointerEvents="box-none"
            >

                {/* <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity> */}
                <View></View>

                <TouchableOpacity style={styles.iconButton} onPress={() => navigateToSettings()}>
                    <Ionicons name="settings-outline" size={24} color="#000" />
                </TouchableOpacity>
            </Animated.View>
            <Animated.ScrollView
                contentContainerStyle={styles.container}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >

                <View style={styles.body}>
                    {/* Avatar */}
                    <View style={styles.avatar}>
                        <Avatar
                            size={100}
                            rounded
                            title='👩🏻‍🦱'
                            backgroundColor="#ff12"
                            titleStyle={{ fontSize: 70 }}
                        />
                    </View>

                    <View style={{ marginTop: 50 }}></View>

                    <View style={styles.detailsBox}>
                        <View style={styles.detailsBoxLeft}>
                            <Text style={styles.texts}>Athreya</Text>
                            <Text style={styles.texts}>akondiathreya@gmail.com</Text>
                        </View>
                        <View style={styles.detailsBoxRight}>
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
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#008B8B',
        marginTop: 160,
        borderRadius: 40,
    },
    header: {
        backgroundColor: '#008B8B',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: width,
        ...Platform.select({
            ios: {
                paddingTop: 20,
                top: 50,
            },
            android: {
                paddingTop: 30,
                top: 30,
            },
        }),
        paddingBottom: 20,
        borderRadius: 40,
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
        position: 'relative',
        paddingBottom: 200,
    },
    avatar: {
        position: 'absolute',
        top: -50,
        ...Platform.select({
            ios: {
                left: '10%'
            },
            android: {
                left: '10%'
            },
        }),
        borderRadius: 100,
        borderWidth: 2,
    },
    detailsBox: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailsBoxLeft: {

    },
    detailsBoxRight: {

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
})