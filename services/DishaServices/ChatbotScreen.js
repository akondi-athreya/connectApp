import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'expo-camera';

const ChatbotScreen = ({ username = 'User' }) => {
  const [currentStep, setCurrentStep] = useState('initial'); // initial, location, situation, suspect, camera, location_sharing
  const [responses, setResponses] = useState({
    isAtHome: null,
    situation: null, // 'travelling' or 'waiting'
    canSeeSuspect: null,
    location: null,
  });
  const [cameraPermission, setCameraPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (currentStep === 'camera') {
      requestCameraPermission();
    }
  }, [currentStep]);

  const requestCameraPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
      if (status === 'granted') {
        setShowCamera(true);
      } else {
        Alert.alert(
          'Camera Permission Required',
          'Please enable camera permission to take photos of the suspect.',
          [
            { text: 'Skip', onPress: () => handleSkipCamera() },
            { text: 'Settings', onPress: () => Linking.openSettings() },
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      handleSkipCamera();
    }
  };

  const handleMakeRequest = () => {
    setCurrentStep('location');
  };

  const handleLocationResponse = (isAtHome) => {
    setResponses(prev => ({ ...prev, isAtHome }));
    if (isAtHome) {
      // If at home, skip to location sharing
      setCurrentStep('location_sharing');
    } else {
      // If outside, ask about situation
      setCurrentStep('situation');
    }
  };

  const handleSituationResponse = (situation) => {
    setResponses(prev => ({ ...prev, situation }));
    setCurrentStep('suspect');
  };

  const handleSuspectResponse = (canSeeSuspect) => {
    setResponses(prev => ({ ...prev, canSeeSuspect }));
    if (canSeeSuspect) {
      setCurrentStep('camera');
    } else {
      setCurrentStep('location_sharing');
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });
        
        // Here you would upload the photo to your backend
        console.log('Photo taken:', photo.uri);
        
        // Simulate backend upload
        Alert.alert(
          'Photo Captured',
          'Suspect photo has been securely stored. Proceeding to share your location.',
          [{ text: 'OK', onPress: () => handlePhotoTaken() }]
        );
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  const handlePhotoTaken = () => {
    setShowCamera(false);
    setCurrentStep('location_sharing');
  };

  const handleSkipCamera = () => {
    setShowCamera(false);
    setCurrentStep('location_sharing');
  };

  const getCurrentLocation = () => {
    // Simulate getting current location
    return {
      latitude: 16.5062,
      longitude: 80.6480,
      address: "Vijayawada, Andhra Pradesh"
    };
  };

  const shareLocationViaSMS = () => {
    const location = getCurrentLocation();
    const message = `EMERGENCY: I need help! My current location is: ${location.address}. Coordinates: ${location.latitude}, ${location.longitude}. Please contact me immediately.`;
    
    // Emergency contacts (you can make this configurable)
    const emergencyContacts = ['+91XXXXXXXXXX']; // Replace with actual numbers
    
    emergencyContacts.forEach(number => {
      const url = Platform.OS === 'ios' 
        ? `sms:${number}&body=${encodeURIComponent(message)}`
        : `sms:${number}?body=${encodeURIComponent(message)}`;
      
      Linking.openURL(url).catch(err => {
        console.error('Error sending SMS:', err);
        Alert.alert('Error', 'Failed to send location. Please call emergency services.');
      });
    });

    Alert.alert(
      'Location Shared',
      'Your location has been shared with emergency contacts. Stay safe!',
      [{ text: 'OK', onPress: () => setCurrentStep('complete') }]
    );
  };

  const renderInitialScreen = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.title}>Safety Request System</Text>
      <Text style={styles.subtitle}>
        If you feel unsafe or need assistance, tap the button below to start a safety request.
      </Text>
      <TouchableOpacity style={styles.emergencyButton} onPress={handleMakeRequest}>
        <Text style={styles.emergencyButtonText}>Make a Safety Request</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLocationQuestion = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.questionTitle}>Are you currently at home?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.optionButton, styles.yesButton]} 
          onPress={() => handleLocationResponse(true)}
        >
          <Text style={styles.optionButtonText}>Yes, I'm at home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.optionButton, styles.noButton]} 
          onPress={() => handleLocationResponse(false)}
        >
          <Text style={styles.optionButtonText}>No, I'm outside</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSituationQuestion = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.questionTitle}>What is your current situation?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.optionButton, styles.primaryButton]} 
          onPress={() => handleSituationResponse('travelling')}
        >
          <Text style={styles.optionButtonText}>I'm travelling</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.optionButton, styles.secondaryButton]} 
          onPress={() => handleSituationResponse('waiting')}
        >
          <Text style={styles.optionButtonText}>I'm waiting at a place</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSuspectQuestion = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.questionTitle}>Can you see the suspect or person making you feel unsafe?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.optionButton, styles.yesButton]} 
          onPress={() => handleSuspectResponse(true)}
        >
          <Text style={styles.optionButtonText}>Yes, I can see them</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.optionButton, styles.noButton]} 
          onPress={() => handleSuspectResponse(false)}
        >
          <Text style={styles.optionButtonText}>No, I cannot see them</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCamera = () => {
    // Determine camera props based on available API
    const getCameraProps = () => {
      // For newer versions (expo-camera v13+)
      if (Camera.CameraType) {
        return {
          facing: Camera.CameraType.back,
          flash: Camera.FlashMode?.auto || 'auto'
        };
      }
      // For older versions
      else if (Camera.Constants) {
        return {
          type: Camera.Constants.Type.back,
          flashMode: Camera.Constants.FlashMode.auto
        };
      }
      // Fallback with string values
      else {
        return {
          type: 'back',
          flashMode: 'auto'
        };
      }
    };

    const cameraProps = getCameraProps();

    return (
      <View style={styles.fullScreenContainer}>
        {showCamera && cameraPermission ? (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            {...cameraProps}
          >
            <View style={styles.cameraOverlay}>
              <Text style={styles.cameraInstruction}>
                Take a photo of the suspect (be discreet and safe)
              </Text>
              <View style={styles.cameraControls}>
                <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                  <Text style={styles.captureButtonText}>📸</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.skipButton} onPress={handleSkipCamera}>
                  <Text style={styles.skipButtonText}>Skip</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Camera>
        ) : (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>Camera not available</Text>
            <TouchableOpacity style={styles.optionButton} onPress={handleSkipCamera}>
              <Text style={styles.optionButtonText}>Continue without photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderLocationSharing = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.questionTitle}>Share Your Location</Text>
      <Text style={styles.subtitle}>
        We'll send your current location to your emergency contacts via SMS
      </Text>
      <TouchableOpacity style={styles.shareLocationButton} onPress={shareLocationViaSMS}>
        <Text style={styles.shareLocationButtonText}>📍 Send Location Now</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.secondaryButton} 
        onPress={() => setCurrentStep('complete')}
      >
        <Text style={styles.optionButtonText}>Skip Location Sharing</Text>
      </TouchableOpacity>
    </View>
  );

  const renderComplete = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.successTitle}> Safety Request Completed</Text>
      <Text style={styles.subtitle}>
        Your safety request has been processed. Stay safe and contact emergency services if needed.
      </Text>
      <TouchableOpacity 
        style={styles.emergencyButton} 
        onPress={() => {
          setCurrentStep('initial');
          setResponses({
            isAtHome: null,
            situation: null,
            canSeeSuspect: null,
            location: null,
          });
        }}
      >
        <Text style={styles.emergencyButtonText}>Start New Request</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'initial':
        return renderInitialScreen();
      case 'location':
        return renderLocationQuestion();
      case 'situation':
        return renderSituationQuestion();
      case 'suspect':
        return renderSuspectQuestion();
      case 'camera':
        return renderCamera();
      case 'location_sharing':
        return renderLocationSharing();
      case 'complete':
        return renderComplete();
      default:
        return renderInitialScreen();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Safety Assistant</Text>
      </View> */}
      {renderCurrentStep()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Soft White
  },
  header: {
    padding: 20,
    backgroundColor: '#1E3A8A', // Deep Blue
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5F5F5', // Soft White
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreenContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A', // Deep Blue
    textAlign: 'center',
    marginBottom: 10,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A', // Lime Green
    textAlign: 'center',
    marginBottom: 10,
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E3A8A', // Deep Blue
    textAlign: 'center',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: '#424242', // Body Text
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  emergencyButton: {
    backgroundColor: '#F97316', // Bright Orange
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 250,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  emergencyButtonText: {
    color: '#F5F5F5', // Soft White
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    minHeight: 55,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  primaryButton: {
    backgroundColor: '#1E3A8A', // Deep Blue
  },
  secondaryButton: {
    backgroundColor: '#64748B', // Slate Gray
  },
  yesButton: {
    backgroundColor: '#1E3A8A', // Deep Blue
  },
  noButton: {
    backgroundColor: '#F97316', // Bright Orange
  },
  optionButtonText: {
    color: '#F5F5F5', // Soft White
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  shareLocationButton: {
    backgroundColor: '#F97316', // Bright Orange
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    minWidth: 250,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  shareLocationButtonText: {
    color: '#F5F5F5', // Soft White
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 58, 138, 0.5)', // Deep Blue overlay
    justifyContent: 'space-between',
    padding: 20,
  },
  cameraInstruction: {
    color: '#F5F5F5', // Soft White
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'rgba(30, 58, 138, 0.8)', // Deep Blue
    padding: 15,
    borderRadius: 10,
    marginTop: 50,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 50,
  },
  captureButton: {
    backgroundColor: '#F5F5F5', // Soft White
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  captureButtonText: {
    fontSize: 32,
    color: '#1E3A8A', // Deep Blue icon
  },
  skipButton: {
    backgroundColor: 'rgba(100, 116, 139, 0.8)', // Slate Gray overlay
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  skipButtonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: '#F97316', // Bright Orange
    textAlign: 'center',
    marginBottom: 20,
  },
});


export default ChatbotScreen;