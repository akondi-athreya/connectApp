import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Platform, Animated } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window')

// components
import SettingCard from '../../components/settingCard'
import { StatusBar } from 'expo-status-bar'

const SettingScreen = () => {

    const navigation = useNavigation();

    const boxData = [[
        {id: 1, name: 'User Details', icon: 'user'},
        {id: 2, name: 'Change Password', icon: 'lock'},
        {id: 3, name: 'Update Contacts', icon: 'phone'},
        {id: 4, name: 'Privacy', icon: 'shield'},
    ],[
        {id: 1, name: 'Notifications', icon: 'bell'},
        {id: 2, name: 'Permissions', icon: 'smartphone'},
    ],[
        {id: 1, name: 'About', icon: 'info'},
        {id: 2, name: 'Logout', icon: 'log-out'}
    ],[
        {id: 1, name: 'App Version', icon: 'code'},
        {id: 2, name: 'Help', icon: 'help-circle'},
    ]]

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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECECEC' }}>
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
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, color: '#000' }}>Settings</Text>

            </Animated.View>
            <Animated.ScrollView
                contentContainerStyle={styles.container}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                {boxData.map((box, index) => (
                    <View key={index} style={styles.infoBoxes}>
                        {box.map(item => (
                            <React.Fragment key={item.id}>
                                <SettingCard details={item}/>
                                {item.id !== box.length && <Divider style={{ backgroundColor: '#D3D3D3' }} />}
                            </React.Fragment>
                        ))}
                    </View>
                ))}
                <View style={{ height: 180 }} />
            </Animated.ScrollView>
        </SafeAreaView>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        borderRadius: 40,
        ...Platform.select({
            ios: {
                marginTop: 90,
            },
            android: {
                marginTop: 110,
            },
        }),
        alignItems: 'center',
    },
    header: {
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
        paddingRight: 50,
    },
    iconButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2
    },
    infoBoxes: {
        padding: 20,
        backgroundColor: '#fff',
        width: '90%',
        borderRadius: 20,
        marginVertical: 10,
    }
})