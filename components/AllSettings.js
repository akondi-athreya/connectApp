import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button, TextInput } from 'react-native-paper';
import Contacts from 'react-native-contacts';

function UserDetails({ user }) {
    return (
        <View>
            <TextInput label="Name" mode="outlined" style={styles.input} value={user.username} />
            <TouchableOpacity onPress={() => alert('User details updated!')} style={styles.button}>
                <Text style={{ color: '#fff' }}>Update</Text>
            </TouchableOpacity>
        </View>
    )
}

function ChangePassword() {
    return (
        <View>
            <TextInput label="Current Password" mode="outlined" style={styles.input} secureTextEntry />
            <TextInput label="New Password" mode="outlined" style={styles.input} secureTextEntry />
            <TextInput label="Confirm New Password" mode="outlined" style={styles.input} secureTextEntry />
            <TouchableOpacity onPress={() => alert('Password changed!')} style={styles.button}>
                <Text style={{ color: '#fff' }}>Change</Text>
            </TouchableOpacity>
        </View>
    )
}

function Privacy() {
    return (
        <View>
            <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 20 }}>Privacy Settings</Text>
            <Text style={{ fontSize: 16, marginBottom: 20 }}>
                Here you can manage your privacy settings. You can choose who can see your profile, posts, and other information. {"\n"}{"\n"}
                You can also manage your data sharing preferences and control what information is shared with third-party apps. {"\n"}{"\n"}
                Make sure to review these settings regularly to ensure your privacy is protected. {"\n"}{"\n"}
                If you have any questions or concerns about your privacy settings, feel free to reach out to our support team for assistance. {"\n"}{"\n"}
            </Text>
        </View>
    )
}

export { UserDetails, ChangePassword, Privacy }

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#6200EE',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '30%',
        alignSelf: 'flex-end'
    },
})