import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TimingAvailabilityForm({
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
      <Text style={styles.sectionTitle}>⏰ Timing & Availability</Text>

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
            if (event.type === "dismissed") {
              setShowPreferredTimePicker(false);
              return;
            }
            setShowPreferredTimePicker(false);
            if (selectedDate) onChange("preferredTime", selectedDate);
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
            if (event.type === "dismissed") {
              setShowDeadlinePicker(false);
              return;
            }
            setShowDeadlinePicker(false);
            if (selectedDate) onChange("deadline", selectedDate);
          }}
        />
      )}

      <View style={styles.switchRow}>
        <Text style={styles.label}>Is this an emergency / critical case?</Text>
        <Switch
          trackColor={{ false: "#999", true: "#b71c1c" }}
          thumbColor={form.isCritical ? "#f44336" : "#f4f3f4"}
          onValueChange={(val) => onChange("isCritical", val)}
          value={form.isCritical}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={[styles.label, { flex: 1 }]}>
          I hereby consent to share this information with blood donors and
          hospitals. *
        </Text>
        <Switch
          trackColor={{ false: "#999", true: "#b71c1c" }}
          thumbColor={form.consent ? "#f44336" : "#f4f3f4"}
          onValueChange={(val) => onChange("consent", val)}
          value={form.consent}
        />
      </View>

      <TouchableOpacity
        style={[styles.submitBtn, loading && { opacity: 0.7 }]}
        onPress={onSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitText}>Submit Request</Text>
        )}
      </TouchableOpacity>
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
