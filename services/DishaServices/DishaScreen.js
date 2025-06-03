import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNavigationBar from '../../components/BottomNavigationBar';

// Screens
import DishaHomeScreen from './DishaHomeScreen';
import FeaturesScreen from './FeaturesScreen';
import ChatbotScreen from './ChatbotScreen';
import ProfileScreen from '../../navigation/ProfileStack';

export default function MainTabs() {
    const [activeTab, setActiveTab] = useState('home');
    const [showBottomBar, setShowBottomBar] = useState(true);

    const renderScreen = () => {
        switch (activeTab) {
            case 'home':
                return <DishaHomeScreen />;
            case 'features':
                return <FeaturesScreen />;
            case 'chatbot':
                return <ChatbotScreen />;
            case 'profile':
                return <ProfileScreen setShowBottomBar={setShowBottomBar} />;
            default:
                return <DishaHomeScreen />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>{renderScreen()}</View>
            {showBottomBar && (
                <BottomNavigationBar activeTab={activeTab} onTabPress={setActiveTab} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
    },
});