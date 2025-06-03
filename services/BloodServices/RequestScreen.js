import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Card } from "react-native-paper";
import RequestDetailsForm from "./Forms/RequestDetailsForm";
import HospitalDetailsForm from "./Forms/HospitalDetailsForm";
import RequesterDetailsForm from "./Forms/RequesterDetailsForm";
import TimingAvailabilityForm from "./Forms/TimingAvailabilityForm";

export default function RequestScreen() {
  const [form, setForm] = useState({
    type: " ",
    bloodGroup: "",
    quantity: "",
    condition: "",
    hospitalName: "",
    hospitalAddress: "",
    city: "",
    doctorName: "",
    ward: "",
    name: "",
    relation: "",
    contact: "",
    altContact: "",
    email: "",
    preferredTime: null,
    deadline: null,
    isCritical: false,
    consent: false,
  });

  const [showHospitalDetails, setShowHospitalDetails] = useState(false);
  const [showRequesterDetails, setShowRequesterDetails] = useState(false);
  // const [showOtherDetails, setShowOtherDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const requiredFields = [
      "type",
      "bloodGroup",
      "quantity",
      "hospitalName",
      "hospitalAddress",
      "city",
      "name",
      "relation",
      "contact",
      "preferredTime",
      "deadline",
      "consent",
    ];

    for (let field of requiredFields) {
      if (!form[field]) return false;
    }

    if (!/^\d{10}$/.test(form.contact)) return false;

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert(
        "Validation Error",
        "Please fill all required fields correctly and provide consent."
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "Your blood request has been submitted.");
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🩸 Blood Request Form</Text>

      <Text style={styles.label}>Select Details to Include:</Text>
      <View style={styles.checkboxRow}>
        <View style={styles.checkboxItem}>
          <Text style={styles.label}>Hospital</Text>
          <Checkbox
            status={showHospitalDetails ? "checked" : "unchecked"}
            onPress={() => setShowHospitalDetails(!showHospitalDetails)}
          />
        </View>

        <View style={styles.checkboxItem}>
          <Text style={styles.label}>Requester</Text>
          <Checkbox
            status={showRequesterDetails ? "checked" : "unchecked"}
            onPress={() => setShowRequesterDetails(!showRequesterDetails)}
          />
        </View>

        {/* <View style={styles.checkboxItem}>
          <Text style={styles.label}>Timing</Text>
          <Checkbox
            status={showOtherDetails ? "checked" : "unchecked"}
            onPress={() => setShowOtherDetails(!showOtherDetails)}
          />
        </View> */}
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <RequestDetailsForm form={form} onChange={handleChange} />
        </Card.Content>
      </Card>
      {showHospitalDetails && (
        <Card style={styles.card}>
          <Card.Content>
            <HospitalDetailsForm form={form} onChange={handleChange} />
          </Card.Content>
        </Card>
      )}

      {showRequesterDetails && (
        <Card style={styles.card}>
          <Card.Content>
            <RequesterDetailsForm form={form} onChange={handleChange} />
          </Card.Content>
        </Card>
      )}

      {/* {showOtherDetails && (
        <Card style={styles.card}>
          <Card.Content>
            <TimingAvailabilityForm
              form={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </Card.Content>
        </Card>
      )} */}

      <View style={styles.switchRow}>
        <Text style={styles.label}>Is this an emergency / critical case?</Text>
        <Switch
          trackColor={{ false: "#999", true: "#b71c1c" }}
          thumbColor={form.isCritical ? "#f44336" : "#f4f3f4"}
          onValueChange={(val) => handleChange("isCritical", val)}
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
          onValueChange={(val) => handleChange("consent", val)}
          value={form.consent}
        />
      </View>

      <TouchableOpacity
        style={[styles.submitBtn, loading && { opacity: 0.7 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitText}>Submit Request</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: 1.2,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 8,
    marginBottom: 8,
    textAlign: "center",
  },
  checkboxRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  card: {
    backgroundColor: "#fafafa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
