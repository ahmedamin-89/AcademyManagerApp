import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import colorScheme from "../../constants/colorScheme";
import PlayerCard from "../../components/UI/PlayerCard/PlayerCard";
import SettingsCard from "../../components/Settings/SettingsCard";
import { UserContext } from "../../context/userContext";

const StaffSettings = ({ navigation }) => {
  const { logout } = useContext(UserContext);

  const logoutHandler = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "No", style: "default" },
      { text: "Yes", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { alignSelf: "flex-start", fontSize: 27 }]}>
        Settings
      </Text>
      <SettingsCard
        title="Training Sessions"
        onPress={() => navigation.navigate("TrainingSessions")}
      />
      <SettingsCard title="Record Attendance" />
      <SettingsCard title="Create an Account" />
      <SettingsCard title="Kits" />
      <SettingsCard title="Logout" onPress={logoutHandler} />
    </View>
  );
};

export default StaffSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: colorScheme.black,
    gap: 20,
  },
  text: {
    color: colorScheme.white,
    fontSize: 24,
    fontFamily: "Condensed-Black",
  },
});
