import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const SettingCard = ({details}) => {
    const navigation = useNavigation();
    const changingDetails = (details) => {
        if (details.name === 'App Version') {
            alert('App Version: 1.0.0');
            return;
        }
        if (details.name === 'Logout') {
            alert('You have been logged out');
            return;
        }
        navigation.navigate('SettingDetail', {
            name: details.name,
            icon: details.icon
        });
    }
    return (
        <TouchableOpacity style={styles.container} onPress={() => changingDetails(details)}>
            <View style={styles.left}>
                <Feather name={details.icon} size={20} color="black" style={styles.icon} />
                <Text style={styles.label}>{details.name}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="black" />
        </TouchableOpacity>
    );
};

export default SettingCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 12,
    },
    label: {
        fontSize: 16,
        color: '#000',
    },
});