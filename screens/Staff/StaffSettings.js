import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import PlayerCard from "../../components/UI/PlayerCard/PlayerCard";
import SettingsCard from "../../components/Settings/SettingsCard";

const StaffSettings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { alignSelf: "flex-start", fontSize: 27 }]}>
        Settings
      </Text>
      <SettingsCard
        title="Training Sessions"
        onPress={() => navigation.navigate("TrainingSessions")}
      />
      <SettingsCard title="Logout" />
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
