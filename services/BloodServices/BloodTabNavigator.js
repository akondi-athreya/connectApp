import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BloodScreen from './BloodScreen';
import DonateScreen from './DonateScreen';
import RequestScreen from './RequestScreen';
import DonorsScreen from './DonorsScreen';
import BloodBank from './BloodBank';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const BloodTab = createBottomTabNavigator();

export default function BloodTabNavigator() {
  return (
    <BloodTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 55,
          borderTopWidth: 0,
        },
      }}
    >
      <BloodTab.Screen
        name="Home"
        component={BloodScreen}
        options={{ tabBarIcon: () => <Icon name="home-outline" size={24} /> }}
      />
      <BloodTab.Screen
        name="Donate"
        component={DonateScreen}
        options={{ tabBarIcon: () => <Icon name="heart-outline" size={24} /> }}
      />
      <BloodTab.Screen
        name="Request"
        component={RequestScreen}
        options={{ tabBarIcon: () => <Icon name="add-circle-outline" size={24} /> }}
      />
      <BloodTab.Screen
        name="Donors"
        component={DonorsScreen}
        options={{ tabBarIcon: () => <Icon name="people-outline" size={24} /> }}
      />
      <BloodTab.Screen
        name="BloodBank"
        component={BloodBank}
        options={{ tabBarIcon: () => <Icons name="blood-bag" size={24} /> }}
      />
    </BloodTab.Navigator>
  );
}
