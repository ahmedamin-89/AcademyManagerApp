import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";

const AttendanceDashboardScreen = () => {
  return <View style={styles.container}></View>;
};

export default AttendanceDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: colorScheme.black,
  },
});
