import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../constants/colorScheme";

const PlayerDetailsScreen = () => {
  return <View style={styles.container}></View>;
};

export default PlayerDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: colorScheme.black,
  },
});
