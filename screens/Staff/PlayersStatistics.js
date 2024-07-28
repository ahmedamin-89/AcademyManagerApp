import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PlayersStatistics = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Players Statistics</Text>
    </View>
  );
};

export default PlayersStatistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme.black,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colorScheme.white,
    fontSize: 24,
    fontFamily: "Condensed-Black",
  },
});
