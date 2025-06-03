import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function HospitalDetailsForm({ form, onChange }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🏥 Hospital Details</Text>

      <Text style={styles.label}>Hospital Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Hospital Name"
        placeholderTextColor="#999"
        value={form.hospitalName}
        onChangeText={(val) => onChange("hospitalName", val)}
      />

      <Text style={styles.label}>Hospital Address *</Text>
      <TextInput
        style={styles.input}
        placeholder="Hospital Address"
        placeholderTextColor="#999"
        value={form.hospitalAddress}
        onChangeText={(val) => onChange("hospitalAddress", val)}
      />

      <Text style={styles.label}>City / District / Pincode *</Text>
      <TextInput
        style={styles.input}
        placeholder="City / District / Pincode"
        placeholderTextColor="#999"
        value={form.city}
        onChangeText={(val) => onChange("city", val)}
      />

      <Text style={styles.label}>Doctor's Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Doctor's Name"
        placeholderTextColor="#999"
        value={form.doctorName}
        onChangeText={(val) => onChange("doctorName", val)}
      />

      <Text style={styles.label}>Ward / Room / Patient ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Ward / Room / Patient ID"
        placeholderTextColor="#999"
        value={form.ward}
        onChangeText={(val) => onChange("ward", val)}
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
