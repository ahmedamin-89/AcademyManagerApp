import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import PlayerCard from "../../components/UI/PlayerCard/PlayerCard";

const StaffSettings = () => {
  return (
    <View style={styles.container}>
      <PlayerCard />
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
  },
  text: {
    color: colorScheme.white,
    fontSize: 24,
    fontFamily: "Condensed-Black",
  },
});
