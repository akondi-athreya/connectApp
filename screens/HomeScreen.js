import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Card from '../components/Card';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        <Card title="Blood Services" onPress={() => navigation.navigate('Blood Services')} />
        <Card title="Disha" onPress={() => navigation.navigate('Disha')} />
        <Card title="Ambulance" onPress={() => navigation.navigate('Ambulance')} />
        <Card title="Others" onPress={() => navigation.navigate('Others')} />
      </ScrollView>
    </SafeAreaView>
  );
}
