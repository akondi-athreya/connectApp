import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import * as Contacts from 'expo-contacts';

const UpdateContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);

    const loadContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
            });

            if (data.length > 0) {
                console.log(data[0].phoneNumbers[0].number)
                setContacts(data);
            }
        } else {
            alert('Permission to access contacts was denied');
        }
    };

    const toggleContactSelection = (contact) => {
        const isSelected = selectedContacts.some(c => c.id === contact.id);

        if (isSelected) {
            setSelectedContacts(prev => prev.filter(c => c.id !== contact.id));
        } else {
            if (selectedContacts.length >= 8) {
                alert('You can select up to 8 contacts only.');
                return;
            }
            setSelectedContacts(prev => [...prev, contact]);
        }
    };

    const handleSave = () => {
        console.log('Selected Contacts:', selectedContacts);
        alert(`${selectedContacts.length} contacts saved. Check console.`);
    };

    return (
        <View style={styles.container}>
            {contacts.length === 0 && <TouchableOpacity onPress={loadContacts} style={styles.loadContacts}>
                <Text style={styles.buttonText}>Load Contacts</Text>
            </TouchableOpacity>}

            <ScrollView style={styles.scrollContainer}>
                {contacts.map((contact) => {
                    const isSelected = selectedContacts.some(c => c.id === contact.id);
                    return (
                        <TouchableOpacity
                            key={contact.id}
                            style={[
                                styles.contactContainer,
                                isSelected && styles.selectedContact
                            ]}
                            onPress={() => toggleContactSelection(contact)}
                        >
                            <Text style={styles.contactName}>{contact.name}</Text>
                            {contact.phoneNumbers && contact.phoneNumbers.map((phone, idx) => (
                                <Text key={idx} style={styles.emailText}>{phone.number}</Text>
                            ))}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Selected Contacts:</Text>
            <ScrollView style={styles.scrollContainer2}>
                {selectedContacts.length === 0 ? (
                    <Text style={{ color: '#888' }}>No contacts selected.</Text>
                ) : (
                    selectedContacts.map((contact, index) => (
                        <View key={contact.id} style={{ marginBottom: 5, borderBottomWidth: 1, borderBottomColor: '#ddd', paddingLeft: 10, paddingBottom: 5, paddingTop: 5 }}>
                            <Text style={{ fontSize: 12 }}>{index + 1}. {contact.name}</Text>
                            {contact.phoneNumbers && contact.phoneNumbers.map((phone, idx) => (
                                <Text key={idx} style={{ fontSize: 10, color: '#666' }}>{phone.number}</Text>
                            ))}
                        </View>
                    ))
                )}
            </ScrollView>

            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Selected Contacts</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UpdateContacts;

const styles = StyleSheet.create({
    container: {

    },
    loadContacts: {
        backgroundColor: '#f0f0f0',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    buttonText: {
        color: '#333',
        fontSize: 14,
    },
    scrollContainer: {
        marginBottom: 20,
        maxHeight: 300,
        borderWidth: 0.5,
        borderColor: '#ddd',
        borderRadius: 10,
    },
    scrollContainer2: {
        marginBottom: 20,
        maxHeight: 200,
        borderWidth: 0.5,
        borderColor: '#ddd',
        borderRadius: 10,
    },
    contactContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    selectedContact: {
        backgroundColor: '#d0f0ff',
    },
    contactName: {
        fontSize: 12,
        color: '#333',
    },
    emailText: {
        fontSize: 10,
        color: '#666',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});