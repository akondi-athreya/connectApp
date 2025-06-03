import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  useColorScheme,
  StyleSheet,
} from "react-native";
import { Button, useTheme } from "react-native-paper";

export default function BloodScreen({ navigation }) {
  const goToTab = (tabName) => {
    navigation.navigate("Blood Services", { screen: tabName });
  };

  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const colors = {
    background: isDark ? "#000" : "#fff",
    text: isDark ? "#fff" : "#000",
    card: "#f44336", // Red
    buttonText: "#fff",
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.headerText, { color: colors.text }]}>
          Blood Donation Portal
        </Text>

        <View style={styles.buttonGrid}>
          <View style={[styles.actionCard, { backgroundColor: colors.card }]}>
            <Text style={styles.cardTitle}>Donate Blood</Text>
            <Text style={styles.cardSubtitle}>Help nearby people in need</Text>
            <Button
              mode="contained"
              onPress={() => goToTab("Donate")}
              textColor={colors.buttonText}
              style={styles.button}
            >
              Donate
            </Button>
          </View>

          <View style={[styles.actionCard, { backgroundColor: colors.card }]}>
            <Text style={styles.cardTitle}>Request Blood</Text>
            <Text style={styles.cardSubtitle}>Submit a quick request</Text>
            <Button
              mode="contained"
              onPress={() => goToTab("Request")}
              textColor={colors.buttonText}
              style={styles.button}
            >
              Request
            </Button>
          </View>

          <View style={[styles.actionCard, { backgroundColor: colors.card }]}>
            <Text style={styles.cardTitle}>Find Donors</Text>
            <Text style={styles.cardSubtitle}>View registered donors</Text>
            <Button
              mode="contained"
              onPress={() => goToTab("Donors")}
              textColor={colors.buttonText}
              style={styles.button}
            >
              Donors
            </Button>
          </View>

          <View style={[styles.actionCard, { backgroundColor: colors.card }]}>
            <Text style={styles.cardTitle}>Register Blood Bank</Text>
            <Text style={styles.cardSubtitle}>
              Become an official donor source
            </Text>
            <Button
              mode="contained"
              onPress={() => goToTab("BloodBank")}
              textColor={colors.buttonText}
              style={styles.button}
            >
              Register
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 16,
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionCard: {
    width: "47%",
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  cardSubtitle: {
    fontSize: 13,
    marginVertical: 4,
    color: "#fff",
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
});
