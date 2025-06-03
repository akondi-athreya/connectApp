import React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import MainTabNavigator from './MainTabNavigator';
import BloodScreen from '../services/BloodServices/BloodScreen';
import BloodTabNavigator from '../services/BloodServices/BloodTabNavigator';
import AmbulanceScreen from '../services/AmbulanceServices/AmbulanceScreen';
import OthersScreen from '../services/OtherServices/OthersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import LogoutScreen from '../screens/LogoutScreen';

// disha
import MainTabs from '../services/DishaServices/DishaScreen';


import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props}>
      
      <View style={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'red' }}>CONNECT</Text>
      </View>

      <DrawerItem
        label="Home"
        icon={() => <Icon name="home" size={24} />}
        onPress={() => navigation.navigate('Home')}
      />
      <DrawerItem
        label="Blood"
        icon={() => <Icon name="water" size={24} />}
        onPress={() => navigation.navigate('Blood Services')}
      />
      <DrawerItem
        label="Disha"
        icon={() => <Icon name="compass" size={24} />}
        onPress={() => navigation.navigate('Disha')}
      />
      <DrawerItem
        label="Ambulance"
        icon={() => <Icon name="car" size={24} />}
        onPress={() => navigation.navigate('Ambulance')}
      />
      <DrawerItem
        label="Other Servies"
        icon={() => <Icon name="ellipsis-horizontal" size={24} />}
        onPress={() => navigation.navigate('Others')}
      />
      <DrawerItem
        label="Profile"
        icon={() => <Icon name="person" size={24} />}
        onPress={() => navigation.navigate('ProfileTab')}
      />
      <DrawerItem
        label="Notifications"
        icon={() => <Icon name="notifications" size={24} />}
        onPress={() => navigation.navigate('Notifications')}
      />
      <DrawerItem
        label="About Us"
        icon={() => <Icon name="information-circle" size={24} />}
        onPress={() => navigation.navigate('AboutUs')}
      />
      <DrawerItem
        label="Privacy Policy"
        icon={() => <Icon name="document-text" size={24} />}
        onPress={() => navigation.navigate('PrivacyPolicy')}
      />
      <DrawerItem
        label="Settings"
        icon={() => <Icon name="settings" size={24} />}
        onPress={() => navigation.navigate('PrivacyPolicy')}
      />
      <DrawerItem
        label="Logout"
        icon={() => <Icon name="log-out" size={24} />}
        onPress={() => navigation.navigate('Logout')}
      />
    </DrawerContentScrollView>
  );
}


export default function DrawerNavigator() {
  return (
    <View style={styles.container}>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={MainTabNavigator}
        // options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Blood"
          component={BloodScreen}
        // options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Blood Services"
          component={BloodTabNavigator}
        // options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Disha"
          component={MainTabs}
        // options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Ambulance"
          component={AmbulanceScreen}
        // options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Others"
          component={OthersScreen}
        // options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="ProfileTab"
          component={ProfileScreen}
        // options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Notifications"
          component={NotificationsScreen}
        // options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="AboutUs"
          component={AboutUsScreen}
        // options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
        // options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Logout"
          component={LogoutScreen}
        // options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
};
