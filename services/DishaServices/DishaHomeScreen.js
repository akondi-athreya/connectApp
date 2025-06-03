import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  SafeAreaView,
  Animated,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

// Sample icons using react-native-vector-icons
const Icons = {
  Police: ({ color = '#1E3A8A', size = 24 }) => (
    <MaterialCommunityIcons name="police-badge" color={color} size={size} />
  ),
  Women: ({ color = '#1E3A8A', size = 24 }) => (
    <MaterialIcons name="girl" color={color} size={35} />
  ),
  Child: ({ color = '#1E3A8A', size = 24 }) => (
    <MaterialCommunityIcons name="human-child" color={color} size={size} />
  ),
  Others: ({ color = '#F97316', size = 24 }) => (
    <MaterialCommunityIcons name="alert-circle" color={color} size={size} />
  ),
  Alert: ({ color = '#F97316', size = 24 }) => (
    <MaterialCommunityIcons name="alert" color={color} size={size} />
  ),
  Help: ({ color = '#1E3A8A', size = 24 }) => (
    <MaterialIcons name="help-outline" color={color} size={size} />
  ),
  Shield: ({ color = '#1E3A8A', size = 24 }) => (
    <MaterialCommunityIcons name="shield-check" color={color} size={size} />
  ),
  Close: ({ color = '#F5F5F5', size = 24 }) => (
    <MaterialIcons name="close" color={color} size={size} />
  ),
  Volume: ({ color = '#F97316', size = 24 }) => (
    <MaterialCommunityIcons name="volume-high" color={color} size={size} />
  ),
  Fingerprint: ({ color = '#1E3A8A', size = 24 }) => (
    <MaterialCommunityIcons name="fingerprint" color={color} size={size} />
  ),
};

const { width } = Dimensions.get('window');

const DishaHomeScreen = () => {
  const [showSosActivated, setShowSosActivated] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [activeInfo, setActiveInfo] = useState(null);
  const [pulseAnim] = useState(new Animated.Value(1));

  // Start the pulse animation when SOS is activated
  React.useEffect(() => {
    if (showSosActivated) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [showSosActivated, pulseAnim]);

  const activateSOS = () => {
    setShowSosActivated(true);
  };

  const deactivateSOS = () => {
    setShowSosActivated(false);
  };

  const showServiceInfo = (service) => {
    setActiveInfo(service);
    setShowInfoModal(true);
  };
const bulletPoints = [
              'Go to the Features Page',
              'Tap any emergency service icon to quickly connect with the respective department',
              'Press the SOS button in critical situations to send your location to authorities',
              'Add emergency contacts who will be notified when you trigger SOS',
              'Use the text field to provide additional details about your emergency',
              'Verify your identity with fingerprint to prevent accidental SOS activation',
            ];

  const emergencyServices = [
    {
      id: 'police',
      name: 'Police',
      icon: 'Police',
      description: 'Immediate police assistance for emergencies, crime reporting, or threats to personal safety.',
      details: 'Connects you directly to the nearest police station. Use this service for reporting crimes, seeking help during threatening situations, or any security concerns that require police intervention. Available 24/7 for your safety.'
    },
    {
      id: 'women',
      name: 'Women',
      icon: 'Women',
      description: 'Special assistance for women facing harassment, violence, or any gender-specific emergencies.',
      details: 'Dedicated helpline for women\'s safety concerns. This service provides immediate help for cases of harassment, domestic violence, or any situation where a woman feels unsafe. The call is routed to special women safety units trained to handle such situations.'
    },
    {
      id: 'child',
      name: 'Child',
      icon: 'Child',
      description: 'Child protection services for cases of child abuse, missing children, or children in distress.',
      details: 'Specialized service for child-related emergencies including child abuse, missing children, or children in distress. This connects to child protection services who are trained to handle sensitive cases involving minors.'
    },
    {
      id: 'others',
      name: 'Others',
      icon: 'Others',
      description: 'For all other emergency situations not covered by the specific categories.',
      details: 'General emergency assistance for situations not falling under the other categories. This could include animal rescue, gas leaks, fallen trees, road blockages, or any other emergency situation requiring immediate attention.'
    }
  ];

  const renderServiceIcon = (iconName, size = 30) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent size={size} /> : null;
  };

  // Create rows of 4 services each for the grid layout
  const serviceRows = [];
  for (let i = 0; i < emergencyServices.length; i += 4) {
    serviceRows.push(emergencyServices.slice(i, i + 4));
  }

  return (
    <>
      <StatusBar 
        backgroundColor="transparent" 
        translucent={true} 
        barStyle="light-content" 
      />
      
      <SafeAreaView style={styles.safeAreaTop} />
      <SafeAreaView style={styles.safeAreaBottom}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Disha Emergency Services</Text>
        </View>

        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.contentContainer}
          contentInsetAdjustmentBehavior="automatic"
        >
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>About Disha</Text>
            </View>
            <Text style={styles.cardText}>
              Disha is the emergency response system, providing for immediate assistance in critical situations. With a single number, access police, Women Welfare, and other emergency services across the country.
            </Text>
            <View style={styles.motto}>
              <Text style={styles.mottoTitle}>Our Motto: "Quick Response, Saving Lives"</Text>
              <Text style={styles.mottoSubtitle}>Every second counts in an emergency. We're here to help 24/7.</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Integrated Helpline Services</Text>
          
          {serviceRows.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.serviceRow}>
              {row.map(service => (
                <TouchableOpacity
                  key={service.id}
                  style={styles.serviceItem}
                  onPress={() => showServiceInfo(service)}
                >
                  <View style={styles.iconContainer}>
                    {renderServiceIcon(service.icon, 30)}
                  </View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>SOS Emergency Button</Text>
            </View>
            <Text style={styles.cardText}>
              In critical situations, activate the SOS feature to alert authorities and nearby users. The alarm continues until deactivated with your fingerprint, ensuring help arrives.
            </Text>
            <TouchableOpacity style={styles.sosButton} onPress={activateSOS}>
              {renderServiceIcon('Alert', 24)}
              <Text style={styles.sosButtonText}>ACTIVATE SOS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>How To Use</Text>
              
            <View style={styles.bulletList}>
              {bulletPoints.map((point, index) => (
                <View key={index} style={styles.bulletItemContainer}>
                  <Text style={styles.bulletSymbol}>•</Text>
                  <Text style={styles.bulletText}>{point}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.bottomPadding} />
        </ScrollView>

        <Modal
          visible={showInfoModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowInfoModal(false)}
        >
          {activeInfo && (
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{activeInfo.name} Emergency Service</Text>
                  <TouchableOpacity onPress={() => setShowInfoModal(false)}>
                    {renderServiceIcon('Close', 24)}
                  </TouchableOpacity>
                </View>
                
                <View style={styles.modalBody}>
                  <View style={styles.serviceDescriptionContainer}>
                    <View style={styles.modalIconContainer}>
                      {renderServiceIcon(activeInfo.icon, 36)}
                    </View>
                    <Text style={styles.serviceDescription}>{activeInfo.description}</Text>
                  </View>
                  
                  <View style={styles.serviceDetailsContainer}>
                    <Text style={styles.serviceDetails}>{activeInfo.details}</Text>
                  </View>
                  
                  <View style={styles.howToUseContainer}>
                    <Text style={styles.howToUse}>
                      <Text style={styles.bold}>How to use: </Text>
                      Tap the {activeInfo.name} icon on the main screen. You'll be connected to a trained operator who will gather essential information and dispatch the appropriate emergency response team to your location.
                    </Text>
                  </View>
                </View>
                
                <View style={styles.modalFooter}>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setShowInfoModal(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Modal>

        <Modal
          visible={showSosActivated}
          transparent={true}
          animationType="fade"
          onRequestClose={deactivateSOS}
        >
          <View style={styles.sosOverlay}>
            <Animated.View style={[
              styles.pulsingContainer,
              { transform: [{ scale: pulseAnim }] }
            ]}>
              {renderServiceIcon('Volume', 80)}
            </Animated.View>
            
            <Text style={styles.sosActivatedTitle}>SOS ACTIVATED</Text>
            <Text style={styles.sosActivatedText}>
              Emergency services have been notified{'\n'}
              Help is on the way
            </Text>
            
            <View style={styles.fingerprintContainer}>
              {renderServiceIcon('Fingerprint', 50)}
            </View>
            
            <Text style={styles.deactivateText}>
              Place your finger on the sensor to deactivate
            </Text>
            
            <TouchableOpacity style={styles.deactivateButton} onPress={deactivateSOS}>
              <Text style={styles.deactivateButtonText}>DEACTIVATE (Demo Only)</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  safeAreaTop: {
    flex: 0,
    backgroundColor: '#1E3A8A', // Deep Blue
    paddingTop: Platform.OS === 'android' ? STATUSBAR_HEIGHT : 0
  },
  safeAreaBottom: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Soft White
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Soft White
  },
  header: {
    backgroundColor: '#1E3A8A', // Deep Blue
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 16 : 16,
  },
  headerTitle: {
    color: '#F5F5F5', // Soft White
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  bottomPadding: {
    height: 70,
  },
  card: {
    backgroundColor: '#F5F5F5', // Soft White
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    textAlign: 'justify',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderWidth: 1,
    borderColor: '#64748B', // Slate Gray
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A8A', // Deep Blue
    marginLeft: 8,
  },
  cardText: {
    color: '#424242',
    marginBottom: 12,
    lineHeight: 20,
  },
  motto: {
    backgroundColor: '#E6E6FA', // Light blue for contrast
    borderLeftWidth: 4,
    borderLeftColor: '#84CC16', // Lime Green
    padding: 12,
  },
  mottoTitle: {
    fontWeight: 'bold',
    color: '#424242',
  },
  mottoSubtitle: {
    fontSize: 12,
    color: '#64748B', // Slate Gray
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  serviceItem: {
    backgroundColor: '#F5F5F5', // Soft White
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    width: (width - 48) / 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderWidth: 1,
    borderColor: '#64748B', // Slate Gray
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: '#1E3A8A', // Deep Blue
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    color: '#1E3A8A', // Deep Blue
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'center',
  },
  sosButton: {
    backgroundColor: '#F97316', // Bright Orange
    borderRadius: 30,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosButtonText: {
    color: '#F5F5F5', // Soft White
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
 bulletList: {
  marginLeft: 10,
  marginTop: 10,
},
bulletItemContainer: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginBottom: 8,
},
bulletSymbol: {
  fontSize: 10,
  marginRight: 6,
  lineHeight: 22,
},
bulletText: {
  fontSize: 14,
  flex: 1,
  lineHeight: 21,
  textAlign: 'justify', // Optional
},

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#F5F5F5', // Soft White
    borderRadius: 8,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#64748B', // Slate Gray
  },
  modalHeader: {
    backgroundColor: '#1E3A8A', // Deep Blue
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  modalTitle: {
    color: '#F5F5F5', // Soft White
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBody: {
    padding: 16,
  },
  serviceDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalIconContainer: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#1E3A8A', // Deep Blue
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceDescription: {
    color: '#424242',
    flex: 1,
  },
  serviceDetailsContainer: {
    backgroundColor: '#E6E6FA', // Light blue for contrast
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  serviceDetails: {
    color: '#212121',
    lineHeight: 20,
  },
  howToUseContainer: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#84CC16', // Lime Green
  },
  howToUse: {
    color: '#424242',
    fontSize: 14,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: '#64748B', // Slate Gray
    padding: 16,
    alignItems: 'flex-end',
  },
  closeButton: {
    backgroundColor: '#1E3A8A', // Deep Blue
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  closeButtonText: {
    color: '#F5F5F5', // Soft White
    fontWeight: 'bold',
  },
  sosOverlay: {
    flex: 1,
    backgroundColor: '#1E3A8A', // Deep Blue
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  pulsingContainer: {
    marginBottom: 24,
  },
  sosActivatedTitle: {
    color: '#F5F5F5', // Soft White
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  sosActivatedText: {
    color: '#F5F5F5', // Soft White
    fontSize: 20,
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 28,
  },
  fingerprintContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#F5F5F5', // Soft White
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  deactivateText: {
    color: '#F5F5F5', // Soft White
    textAlign: 'center',
    marginBottom: 32,
  },
  deactivateButton: {
    backgroundColor: '#F5F5F5', // Soft White
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
  },
  deactivateButtonText: {
    color: '#F97316', // Bright Orange
    fontWeight: 'bold',
  },
});

export default DishaHomeScreen;