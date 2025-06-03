import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function BloodRequestForm({
  form,
  onChange,
  loading,
  onSubmit,
}) {
  const [showPreferredTimePicker, setShowPreferredTimePicker] = useState(false);
  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);

  const displayDate = (date) => {
    if (!date) return "Select date & time";
    return new Date(date).toLocaleString();
  };

  const displayOnlyDate = (date) => {
    if (!date) return "Select date";
    return new Date(date).toLocaleDateString();
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🩸 Request Details</Text>

      <Text style={styles.label}>Type of Request *</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={form.type}
          onValueChange={(val) => onChange("type", val)}
          style={styles.picker}
          dropdownIconColor="#b71c1c"
        >
          <Picker.Item label="Select Type" value="" />
          <Picker.Item label="Blood" value="Blood" />
          <Picker.Item label="Platelets" value="Platelets" />
          <Picker.Item label="Plasma" value="Plasma" />
        </Picker>
      </View>

      <Text style={styles.label}>Blood Group Needed *</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={form.bloodGroup}
          onValueChange={(val) => onChange("bloodGroup", val)}
          style={styles.picker}
          dropdownIconColor="#b71c1c"
        >
          <Picker.Item label="Select Blood Group" value="" />
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <Picker.Item key={bg} label={bg} value={bg} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Quantity Needed *</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g., 2 units or 500 ml"
        placeholderTextColor="#999"
        value={form.quantity}
        onChangeText={(val) => onChange("quantity", val)}
      />

      <Text style={styles.label}>Reason / Medical Condition (Optional)</Text>
      <TextInput
        style={[styles.input, { textAlignVertical: "top" }]}
        placeholder="E.g., surgery, trauma, anemia"
        placeholderTextColor="#999"
        value={form.condition}
        onChangeText={(val) => onChange("condition", val)}
        multiline
        numberOfLines={4}
      />
      <Text style={styles.label}>
        Preferred Date & Time for Blood Receipt *
      </Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowPreferredTimePicker(true)}
      >
        <Text
          style={[styles.dateText, !form.preferredTime && { color: "#999" }]}
        >
          {displayDate(form.preferredTime)}
        </Text>
        <MaterialCommunityIcons name="calendar" size={24} color="#b71c1c" />
      </TouchableOpacity>
      {showPreferredTimePicker && (
        <DateTimePicker
          value={form.preferredTime ? new Date(form.preferredTime) : new Date()}
          mode="datetime"
          minimumDate={new Date()}
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(event, selectedDate) => {
            setShowPreferredTimePicker(false);
            if (event.type !== "dismissed" && selectedDate) {
              onChange("preferredTime", selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.label}>
        Request Deadline (Last date to fulfill) *
      </Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowDeadlinePicker(true)}
      >
        <Text style={[styles.dateText, !form.deadline && { color: "#999" }]}>
          {displayOnlyDate(form.deadline)}
        </Text>
        <MaterialCommunityIcons name="calendar" size={24} color="#b71c1c" />
      </TouchableOpacity>
      {showDeadlinePicker && (
        <DateTimePicker
          value={form.deadline ? new Date(form.deadline) : new Date()}
          mode="date"
          minimumDate={new Date()}
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(event, selectedDate) => {
            setShowDeadlinePicker(false);
            if (event.type !== "dismissed" && selectedDate) {
              onChange("deadline", selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
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
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#f44336",
    paddingVertical: 8,
    fontSize: 16,
    color: "#000",
    marginBottom: 15,
  },
  pickerWrapper: {
    borderBottomWidth: 1,
    borderColor: "#f44336",
    marginBottom: 10,
    paddingHorizontal: 4,
    height: 45,
    justifyContent: "center",
  },
  picker: {
    height: 55,
    color: "#000",
    marginTop: -6,
  },
  dateInput: {
    borderBottomWidth: 1,
    borderColor: "#f44336",
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  submitBtn: {
    backgroundColor: "#b71c1c",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
