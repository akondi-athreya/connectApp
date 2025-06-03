import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  Platform,
  Alert,
  ScrollView,
  Linking,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const EMERGENCY_PHONE_NUMBER = '+918309958747'; 
const FeaturesScreen = () => {
  const [message, setMessage] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const emergencyServices = [
    { id: 'police', name: 'Police', icon: 'Police' },
    { id: 'women', name: 'Women', icon: 'Women' },
    { id: 'child', name: 'Child', icon: 'Child' },
    { id: 'sos', name: 'SOS', icon: 'Others' },
  ];

  const icons = {
    Police: ({ color = '#1E3A8A', size = 30 }) => (
      <MaterialCommunityIcons name="police-badge" color={color} size={size} />
    ),
    Women: ({ color = '#1E3A8A', size = 30 }) => (
      <MaterialIcons name="girl" color={color} size={35} />
    ),
    Child: ({ color = '#1E3A8A', size = 30 }) => (
      <MaterialCommunityIcons name="human-child" color={color} size={size} />
    ),
    Others: ({ color = '#F97316', size = 30 }) => (
      <MaterialCommunityIcons name="alert-circle" color={color} size={size} />
    ),
  };

  useEffect(() => {
    // Set sample location
    const timer = setTimeout(() => {
      console.log('Setting location...');
      setCurrentLocation({ latitude: 16.9603939, longitude: 82.1962307 });
      setLoading(false);
      console.log('Location set:', { latitude: 16.9603939, longitude: 82.1962307 });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const sendSMSMessage = async (serviceType) => {
    try {
      if (loading) {
        throw new Error('Location is still loading');
      }
      if (!currentLocation) {
        Alert.alert(
          'Location Error',
          'Unable to get current location. Sending message without location.',
          [{ text: 'OK' }]
        );
      }

      const locationText = currentLocation
        ? `Location Lat ${currentLocation.latitude.toFixed(4)} Lon ${currentLocation.longitude.toFixed(4)}`
        : 'Location unavailable';

      // Simplified message to avoid encoding issues
      const emergencyMessage = `EMERGENCY ${serviceType} assistance needed ${locationText}`;

      // Use Linking to open SMS app
      const smsUrl = Platform.OS === 'ios'
        ? `sms:${EMERGENCY_PHONE_NUMBER}&body=${encodeURIComponent(emergencyMessage)}`
        : `sms:${EMERGENCY_PHONE_NUMBER}?body=${encodeURIComponent(emergencyMessage)}`;

      const supported = await Linking.canOpenURL(smsUrl);
      if (!supported) {
        throw new Error('SMS not supported on this device');
      }

      await Linking.openURL(smsUrl);

      Alert.alert(
        'Message Prepared',
        `Emergency ${serviceType} message prepared for ${serviceType} Number. Please confirm in your messaging app.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error sending SMS:', error);
      Alert.alert(
        'Error',
        'Failed to prepare emergency message. Please try again or check your messaging app.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleServicePress = (service) => {
    if (loading) {
      Alert.alert('Loading', 'Please wait until location is loaded before sending.', [
        { text: 'OK' },
      ]);
      return;
    }
    console.log('Service pressed:', service.name);
    sendSMSMessage(service.name);
  };

  const handleSendMessage = async () => {
    if (message.trim().length === 0) {
      Alert.alert('Error', 'Please enter a message before sending.', [
        { text: 'OK', style: 'default' },
      ]);
      return;
    }

    try {
      if (loading) {
        throw new Error('Location is still loading');
      }
      if (!currentLocation) {
        Alert.alert(
          'Location Error',
          'Unable to get current location. Sending message without location.',
          [{ text: 'OK' }]
        );
      }

      const locationText = currentLocation
        ? `Location Lat ${currentLocation.latitude.toFixed(4)} Lon ${currentLocation.longitude.toFixed(4)}`
        : 'Location unavailable';

      const customMessage = `${message} ${locationText}`;

      const smsUrl = Platform.OS === 'ios'
        ? `sms:${EMERGENCY_PHONE_NUMBER}&body=${encodeURIComponent(customMessage)}`
        : `sms:${EMERGENCY_PHONE_NUMBER}?body=${encodeURIComponent(customMessage)}`;

      const supported = await Linking.canOpenURL(smsUrl);
      if (!supported) {
        throw new Error('SMS not supported on this device');
      }

      await Linking.openURL(smsUrl);

      Alert.alert(
        'Message Prepared',
        'Your custom emergency message is ready. Please confirm in your messaging app.',
        [{ text: 'OK' }]
      );
      setMessage('');
    } catch (error) {
      console.error('Error sending custom SMS:', error);
      Alert.alert(
        'Error',
        'Failed to send custom message. Please try again or check your messaging app.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Disha Emergency Services</Text>
        </View>

        <View style={styles.mapContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading map and location...</Text>
            </View>
          ) : (
            <>
              <Image
                source={{
                  uri: 'https://miro.medium.com/max/1400/1*qYUvh-EtES8dtgKiBRiLsA.png',
                }}
                style={styles.mapImage}
                resizeMode="cover"
              />
              <View style={styles.currentLocationMarker}>
                <View style={styles.locationDot} />
                <View style={styles.locationCircle} />
              </View>
              <View style={styles.locationInfoContainer}>
                <Text style={styles.locationInfo}>
                  Lat: {currentLocation?.latitude.toFixed(4) || 'N/A'}, Lon: {currentLocation?.longitude.toFixed(4) || 'N/A'}
                </Text>
              </View>
            </>
          )}

          <View style={styles.messageContainer}>
            <View style={styles.messageInputContainer}>
              <TextInput
                style={styles.messageInput}
                placeholder="Add Message to Emergency SOS"
                placeholderTextColor="#64748B"
                value={message}
                onChangeText={setMessage}
                multiline={true}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.googleAttribution}>
            <Text style={styles.googleText}>Google</Text>
          </View>
        </View>

        <View style={styles.emergencyServicesContainer}>
          <View style={styles.serviceRow}>
            {emergencyServices.map((service) => {
              const IconComponent = icons[service.icon];
              return (
                <TouchableOpacity
                  key={service.id}
                  style={styles.serviceButton}
                  onPress={() => handleServicePress(service)}
                  activeOpacity={0.7}
                >
                  {IconComponent && <IconComponent />}
                  <Text
                    style={
                      service.id === 'sos' ? styles.sosButtonText : styles.serviceButtonText
                    }
                  >
                    {service.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? STATUSBAR_HEIGHT : 0,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#1E3A8A',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 500,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#64748B',
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  currentLocationMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    marginLeft: -50,
    marginTop: -50,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F97316',
    zIndex: 2,
  },
  locationCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    zIndex: 1,
  },
  locationInfoContainer: {
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  locationInfo: {
    fontSize: 14,
    color: '#333',
  },
  messageContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '90%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 4,
    maxHeight: 80,
  },
  sendButton: {
    backgroundColor: '#F97316',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  sendButtonText: {
    color: '#F5F5F5',
    fontWeight: 'bold',
  },
  googleAttribution: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  googleText: {
    fontSize: 16,
    color: '#64748B',
  },
  emergencyServicesContainer: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  serviceButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: 40,
    height: 75,
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    borderWidth: 1,
    borderColor: '#64748B',
  },
  serviceButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A8A',
    marginTop: 8,
  },
  sosButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F97316',
    marginTop: 8,
  },
});

export default FeaturesScreen;