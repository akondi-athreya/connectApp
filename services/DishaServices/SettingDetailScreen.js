import { StyleSheet, Text, View, Animated, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

// components
import { UserDetails, ChangePassword, Privacy } from '../../components/AllSettings'
import UpdateContacts from '../../components/UpdateContacts';

const { width, height } = Dimensions.get('window')

const SettingDetailScreen = ({ route }) => {
    const navigation = useNavigation();
    const { name, icon } = route.params;
    console.log(name, icon);

    const user = {
        username: 'Athreya',
        email: 'athreya@example.com',
        phone: '1234567890',
        address: '123 Main St, City, Country',
        password: 'password123',
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ECECEC', alignItems: 'center' }}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, color: '#000' }}>{name}</Text>
            </View>
            <View style={styles.container}>
                {name === 'User Details' && (<UserDetails user={user} />)}
                {name === 'Change Password' && (<ChangePassword />)}
                {name === 'Privacy' && (<Privacy />)}
                {name === 'Update Contacts' && (<UpdateContacts />)}
            </View>
        </SafeAreaView>
    )
}

export default SettingDetailScreen

const styles = StyleSheet.create({
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
    container: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingHorizontal: 20,
        marginTop: 100,
        width: '90%',
        borderRadius: 20,
        padding: 20
    },
})