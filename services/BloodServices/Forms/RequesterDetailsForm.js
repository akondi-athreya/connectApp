import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function RequesterDetailsForm({ form, onChange }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>👤 Requester Details</Text>

      <Text style={styles.label}>Full Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Full Name"
        placeholderTextColor="#999"
        value={form.name}
        onChangeText={(val) => onChange("name", val)}
      />

      <Text style={styles.label}>Relationship to Patient *</Text>
      <TextInput
        style={styles.input}
        placeholder="Relationship (e.g., self, father)"
        placeholderTextColor="#999"
        value={form.relation}
        onChangeText={(val) => onChange("relation", val)}
      />

      <Text style={styles.label}>Contact Number *</Text>
      <TextInput
        style={styles.input}
        placeholder="10-digit Contact Number"
        placeholderTextColor="#999"
        value={form.contact}
        keyboardType="phone-pad"
        onChangeText={(val) => onChange("contact", val)}
      />

      <Text style={styles.label}>Alternate Contact Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Alternate Contact Number"
        placeholderTextColor="#999"
        value={form.altContact}
        keyboardType="phone-pad"
        onChangeText={(val) => onChange("altContact", val)}
      />

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#999"
        value={form.email}
        keyboardType="email-address"
        onChangeText={(val) => onChange("email", val)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#b71c1c",
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#f44336",
    paddingBottom: 6,
  },
  label: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#f44336",
    paddingVertical: 8,
    fontSize: 16,
    color: "#000",
    marginBottom: 15,
  },
});
