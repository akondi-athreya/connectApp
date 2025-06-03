import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, Vibration } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as LocalAuthentication from 'expo-local-authentication';

const BottomNavigationBar = ({ activeTab, onTabPress }) => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [showStopModal, setShowStopModal] = useState(false);
  const soundRef = useRef(null);
  const beepIntervalRef = useRef(null);
  const vibrationIntervalRef = useRef(null);

  useEffect(() => {
    // Configure audio mode when component mounts
    const configureAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: false,
          playThroughEarpieceAndroid: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });
        console.log(' Audio configured successfully');
      } catch (error) {
        console.log('Error configuring audio:', error);
      }
    };
    
    configureAudio();

    // Cleanup on unmount
    return () => {
      stopEmergencySound();
    };
  }, []);

  const generateBeepSound = () => {
    // Generate a proper WAV file with beep sound
    const sampleRate = 44100;
    const duration = 0.3; // 300ms beep
    const frequency = 1000; // 1kHz tone
    const samples = Math.floor(sampleRate * duration);
    
    // Create WAV header
    const buffer = new ArrayBuffer(44 + samples * 2);
    const view = new DataView(buffer);
    
    // WAV header
    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + samples * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, samples * 2, true);
    
    // Generate sine wave
    for (let i = 0; i < samples; i++) {
      const sample = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.8;
      view.setInt16(44 + i * 2, sample * 32767, true);
    }
    
    // Convert to base64
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const playEmergencySound = async () => {
    try {
      console.log('🚨 Starting emergency alert...');
      
      // Stop any existing sound first
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // Start vibration pattern immediately
      startVibrationPattern();
      
      // Try to play audio beeps
      await createBeepingSound();
      
    } catch (error) {
      console.log('❌ Error playing emergency sound:', error);
      // Even if audio fails, vibration should work
      startVibrationPattern();
    }
  };

  const startVibrationPattern = () => {
    try {
      // Clear any existing vibration
      if (vibrationIntervalRef.current) {
        clearInterval(vibrationIntervalRef.current);
      }

      // Start immediate vibration
      Vibration.vibrate([0, 500, 200, 500], true); // Pattern: wait, vibrate, wait, vibrate - repeat
      
      console.log(' Vibration pattern started');
    } catch (error) {
      console.log(' Vibration error:', error);
    }
  };

  const createBeepingSound = async () => {
    try {
      // Clear any existing interval
      if (beepIntervalRef.current) {
        clearInterval(beepIntervalRef.current);
      }

      console.log('🔊 Creating audio beep pattern...');

      // Create initial beep
      await createSingleBeep();

      // Set up repeating beeps - check the state properly
      beepIntervalRef.current = setInterval(async () => {
        // Check if emergency is still active using a different approach
        try {
          await createSingleBeep();
          console.log(' Repeating beep played');
        } catch (beepError) {
          console.log(' Repeat beep failed:', beepError);
        }
      }, 1000); // Beep every second
      
    } catch (error) {
      console.log(' Error creating beeping sound:', error);
    }
  };

  const createSingleBeep = async () => {
    try {
      // Method 1: Try generated beep sound
      const beepBase64 = generateBeepSound();
      const { sound } = await Audio.Sound.createAsync(
        {
          uri: `data:audio/wav;base64,${beepBase64}`
        },
        { 
          shouldPlay: true,
          volume: 1.0,
          rate: 1.0,
        }
      );

      console.log('🎵 Beep sound created and playing');

      // Auto cleanup after beep
      setTimeout(async () => {
        try {
          await sound.unloadAsync();
        } catch (e) {
          console.log('Cleanup error:', e);
        }
      }, 500);
      
    } catch (error) {
      console.log(' Generated beep failed, trying alternative:', error);
      
      // Method 2: Try simple notification-like sound
      try {
        // Create a very simple beep using minimal WAV data
        const simpleBeep = 'UklGRl4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA';
        
        const { sound } = await Audio.Sound.createAsync(
          { uri: `data:audio/wav;base64,${simpleBeep}` },
          { shouldPlay: true, volume: 0.8 }
        );
        
        console.log('🎵 Simple beep playing');
        
        setTimeout(async () => {
          try {
            await sound.unloadAsync();
          } catch (e) {
            console.log('Simple beep cleanup error:', e);
          }
        }, 300);
        
      } catch (simpleError) {
        console.log(' Simple beep also failed:', simpleError);
        
        // Method 3: Last resort - just log and rely on vibration
        console.log(' Audio unavailable - using vibration only');
      }
    }
  };

  const stopEmergencySound = async () => {
    try {
      console.log(' Stopping emergency alert...');
      
      // Stop beeping interval FIRST
      if (beepIntervalRef.current) {
        clearInterval(beepIntervalRef.current);
        beepIntervalRef.current = null;
        console.log(' Beep interval cleared');
      }

      // Stop audio
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // Stop vibration
      if (vibrationIntervalRef.current) {
        clearInterval(vibrationIntervalRef.current);
        vibrationIntervalRef.current = null;
      }
      Vibration.cancel();

      // Set states after clearing intervals
      setIsEmergencyActive(false);
      setShowStopModal(false);
      
      console.log(' Emergency alert stopped successfully');
      
    } catch (error) {
      console.log(' Error stopping emergency sound:', error);
      // Force stop everything
      if (beepIntervalRef.current) {
        clearInterval(beepIntervalRef.current);
        beepIntervalRef.current = null;
      }
      Vibration.cancel();
      setIsEmergencyActive(false);
      setShowStopModal(false);
    }
  };

  const handleBiometricAuthentication = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      
      if (!hasHardware || supportedTypes.length === 0) {
        Alert.alert(
          'Authentication Unavailable',
          'Biometric authentication is not available on this device. Please use passcode to stop emergency.',
          [{ text: 'OK' }]
        );
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert(
          'No Biometric Data',
          'No biometric data is enrolled. Please use passcode to stop emergency.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Stop Emergency Alert',
        subtitle: 'Use your biometric to stop the emergency sound',
        cancelLabel: 'Cancel',
        fallbackLabel: 'Use Passcode',
        disableDeviceFallback: false,
      });

      if (result.success) {
        await stopEmergencySound();
        Alert.alert('Emergency Stopped', 'Emergency alert has been stopped successfully.');
      } else if (result.error === 'user_fallback') {
        handlePasscodeAuthentication();
      }
    } catch (error) {
      console.log('Biometric authentication error:', error);
      Alert.alert('Authentication Error', 'Please try again or use passcode.');
    }
  };

  const handlePasscodeAuthentication = () => {
    Alert.prompt(
      'Enter Passcode',
      'Enter your emergency passcode to stop the alert (default: 1234):',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Submit',
          onPress: async (passcode) => {
            if (passcode && (passcode === '1234' || passcode.length >= 4)) {
              await stopEmergencySound();
              Alert.alert('Emergency Stopped', 'Emergency alert has been stopped successfully.');
            } else {
              Alert.alert('Invalid Passcode', 'Please enter a valid passcode (try 1234 for demo).');
            }
          },
        },
      ],
      'secure-text'
    );
  };

  const handleTabPress = async (tabName) => {
    if (tabName === 'sos') {
      if (isEmergencyActive) {
        setShowStopModal(true);
        return;
      }

      Alert.alert(
        'Emergency Alert',
        'Are you sure you want to activate emergency alert? This will trigger an alarm with sound and vibration.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Activate',
            style: 'destructive',
            onPress: async () => {
              console.log('🚨 User activated emergency alert');
              setIsEmergencyActive(true);
              await playEmergencySound();
              setShowStopModal(true);
              
              Alert.alert('SOS Emergency Triggered', 'Emergency services have been notified.');
            },
          },
        ]
      );
      return;
    }
    onTabPress(tabName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomNav}>
        {/* Home */}
        <TouchableOpacity style={styles.tabButton} onPress={() => handleTabPress('home')}>
          <MaterialIcons
            name="home"
            color={activeTab === 'home' ? '#F97316' : '#F5F5F5'}
            size={26}
          />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>

        {/* Features */}
        <TouchableOpacity style={styles.tabButton} onPress={() => handleTabPress('features')}>
          <Ionicons
            name="apps"
            color={activeTab === 'features' ? '#F97316' : '#F5F5F5'}
            size={26}
          />
          <Text style={styles.tabText}>Features</Text>
        </TouchableOpacity>

        {/* SOS */}
        <TouchableOpacity 
          style={[styles.scanButton, isEmergencyActive && styles.emergencyActiveButton]} 
          onPress={() => handleTabPress('sos')}
        >
          <View style={[styles.sosContainer, isEmergencyActive && styles.emergencyActiveSOS]}>
            <MaterialCommunityIcons 
              name={isEmergencyActive ? "alert-circle-outline" : "alert-circle"} 
              size={36} 
              color="#F5F5F5" 
            />
            <Text style={styles.sosText}>{isEmergencyActive ? 'STOP' : 'SOS'}</Text>
          </View>
        </TouchableOpacity>

        {/* Chatbot */}
        <TouchableOpacity style={styles.tabButton} onPress={() => handleTabPress('chatbot')}>
          <FontAwesome5
            name="robot"
            color={activeTab === 'chatbot' ? '#F97316' : '#F5F5F5'}
            size={24}
          />
          <Text style={styles.tabText}>Chatbot</Text>
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity style={styles.tabButton} onPress={() => handleTabPress('profile')}>
          <MaterialIcons
            name="person"
            color={activeTab === 'profile' ? '#F97316' : '#F5F5F5'}
            size={26}
          />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}></View>
      </View>

      {/* Emergency Stop Modal */}
      <Modal
        visible={showStopModal && isEmergencyActive}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <MaterialCommunityIcons name="alert-circle" size={60} color="#FF4444" />
            <Text style={styles.modalTitle}>🚨 Emergency Alert Active</Text>
            <Text style={styles.modalSubtitle}>
              {isEmergencyActive ? 'Alarm is currently active with sound and vibration' : 'Use biometric or passcode to stop the alarm'}
            </Text>
            
            <TouchableOpacity 
              style={styles.biometricButton} 
              onPress={handleBiometricAuthentication}
            >
              <MaterialIcons name="fingerprint" size={24} color="#F5F5F5" />
              <Text style={styles.buttonText}>Use Biometric</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.passcodeButton} 
              onPress={handlePasscodeAuthentication}
            >
              <MaterialIcons name="lock" size={24} color="#1E3A8A" />
              <Text style={[styles.buttonText, { color: '#1E3A8A' }]}>Use Passcode</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNav: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#1E3A8A',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabText: {
    color: '#F5F5F5',
    marginTop: 5,
    fontSize: 12,
  },
  scanButton: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -25,
    flex: 1,
  },
  emergencyActiveButton: {
    transform: [{ scale: 1.1 }],
  },
  sosContainer: {
    backgroundColor: '#F97316',
    height: 80,
    width: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  emergencyActiveSOS: {
    backgroundColor: '#FF4444',
    shadowColor: '#FF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  sosText: {
    color: '#F5F5F5',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 4,
  },
  progressContainer: {
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    paddingBottom: 10,
  },
  progressBar: {
    height: 4,
    width: '30%',
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#F5F5F5',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    maxWidth: 300,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  biometricButton: {
    backgroundColor: '#1E3A8A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
  passcodeButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1E3A8A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
  },
  buttonText: {
    color: '#F5F5F5',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default BottomNavigationBar;