import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";

const TeamsScreen = () => {
  return <View style={styles.container}></View>;
};

export default TeamsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorScheme.black,
  },
});
