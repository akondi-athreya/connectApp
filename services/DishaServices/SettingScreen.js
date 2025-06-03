import { View, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Animated } from 'react-native'
import { Divider } from 'react-native-elements'

// components
import SettingCard from '../../components/settingCard'
import { StatusBar } from 'expo-status-bar'

const { width } = Dimensions.get('window')

const SettingScreen = () => {

    const boxData = [[
        { id: 1, name: 'User Details', icon: 'user' },
        { id: 2, name: 'Change Password', icon: 'lock' },
        { id: 3, name: 'Update Contacts', icon: 'phone' },
        { id: 4, name: 'Privacy', icon: 'shield' },
    ], [
        { id: 1, name: 'Notifications', icon: 'bell' },
        { id: 2, name: 'Permissions', icon: 'smartphone' },
    ], [
        { id: 1, name: 'About', icon: 'info' },
        { id: 2, name: 'Logout', icon: 'log-out' }
    ], [
        { id: 1, name: 'App Version', icon: 'code' },
        { id: 2, name: 'Help', icon: 'help-circle' },
    ]]

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {boxData.map((box, index) => (
                <View key={index} style={styles.infoBoxes}>
                    {box.map((item, i) => (
                        <React.Fragment key={item.id}>
                            <SettingCard details={item} />
                            {i !== box.length - 1 && <Divider style={{ backgroundColor: '#D3D3D3' }} />}
                        </React.Fragment>
                    ))}
                </View>
            ))}
            <View style={{ height: 180 }} />
        </ScrollView>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        borderRadius: 40,
        marginTop: 20,
        alignItems: 'center',
    },
    infoBoxes: {
        padding: 20,
        backgroundColor: '#fff',
        width: '90%',
        borderRadius: 20,
        marginVertical: 10,
    }
})