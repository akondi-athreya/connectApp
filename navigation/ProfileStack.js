import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../services/DishaServices/ProfileScreen';
import SettingScreen from '../services/DishaServices/SettingScreen';
import SettingDetailScreen from '../services/DishaServices/SettingDetailScreen';

const Stack = createStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileMain" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingScreen} />
            <Stack.Screen name="SettingDetail" component={SettingDetailScreen} />
        </Stack.Navigator>
    );
}