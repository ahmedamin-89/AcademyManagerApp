import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CoachesScreen = () => {
  return <View style={styles.container}></View>;
};

export default CoachesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorScheme.black,
  },
});
