import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const contactCard = () => {
    return (
        <View style={styles.container}>
            {/* avatar */}
            <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>👤</Text>
            </View>
            {/* contact details */}
            <View style={styles.contactDetailsContainer}>
                <Text style={styles.contactName}>John Doe</Text>
                <Text style={styles.contactNumber}>+1 234 567 890</Text>
            </View>
        </View>
    )
}

export default contactCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDF6D2',
        alignItems: 'center',
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        paddingVertical: 10,
    },
    avatarContainer: {
        backgroundColor: '#fff',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            android: {
                width: 50,
                height: 50,
            }
        })
    },
    avatarText: {
        fontSize: 24,
        ...Platform.select({
            android: {
                fontSize: 22,
            }
        }),
    },
    contactDetailsContainer: {
        flex: 1,
        marginLeft: 20,
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactNumber: {
        fontSize: 16,
        color: '#555',
    },
})