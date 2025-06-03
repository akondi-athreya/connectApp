import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function MyBloodScreen() {
  const requests = [
    {
      id: '1',
      name: 'Ravi Kumar',
      phone: '9876543210',
      location: 'Hyderabad',
      emergency: 'Fast',
      hospital: 'Apollo Hospital',
      bloodGroup: 'O-',
    },
    {
      id: '2',
      name: 'Sita Reddy',
      phone: '9123456780',
      location: 'Vijayawada',
      emergency: 'Normal',
      hospital: 'Rainbow Hospital',
      bloodGroup: 'O-',
    },
    {
      id: '3',
      name: 'Arjun Rao',
      phone: '9988776655',
      location: 'Guntur',
      emergency: 'Fast',
      hospital: 'AIIMS Hospital',
      bloodGroup: 'O-',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>
        Blood Group: <Text style={styles.bloodGroup}>{item.bloodGroup}</Text>
      </Text>
      <Text>Phone: {item.phone}</Text>
      <Text>Location: {item.location}</Text>
      <Text>
        Emergency:{' '}
        <Text style={{ color: item.emergency === 'Fast' ? 'red' : 'green' }}>
          {item.emergency}
        </Text>
      </Text>
      <Text>Hospital: {item.hospital}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.accept]}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.viewdetails]}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

function OthersScreen() {
  const otherRequests = [
    {
      id: '1',
      name: 'Anjali Verma',
      phone: '9876543211',
      location: 'Visakhapatnam',
      emergency: 'Normal',
      bloodGroup: 'A+',
      hospital: 'KIMS Hospital',
    },
    {
      id: '2',
      name: 'Naveen Joshi',
      phone: '9123456789',
      location: 'Rajahmundry',
      emergency: 'Fast',
      bloodGroup: 'B-',
      hospital: 'Care Hospital',
    },
    {
      id: '3',
      name: 'Meena Rao',
      phone: '9988776650',
      location: 'Eluru',
      emergency: 'Normal',
      bloodGroup: 'AB+',
      hospital: 'Government Hospital',
    },
    {
      id: '4',
      name: 'Rakesh Das',
      phone: '9001234567',
      location: 'Kakinada',
      emergency: 'Fast',
      bloodGroup: 'O+',
      hospital: 'City Hospital',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>Phone: {item.phone}</Text>
      <Text>Location: {item.location}</Text>
      <Text>
        Blood Group: <Text style={styles.bloodGroup}>{item.bloodGroup}</Text>
      </Text>
      <Text>
        Emergency:{' '}
        <Text style={{ color: item.emergency === 'Fast' ? 'red' : 'green' }}>
          {item.emergency}
        </Text>
      </Text>
      <Text>Hospital: {item.hospital}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.accept]}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.viewdetails]}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={otherRequests}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

export default function DonateScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My Blood" component={MyBloodScreen} />
      <Tab.Screen name="Others" component={OthersScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  bloodGroup: {
    fontWeight: 'bold',
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  accept: {
    backgroundColor: 'green',
  },
  viewdetails: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
