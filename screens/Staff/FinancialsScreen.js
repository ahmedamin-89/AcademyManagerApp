import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";

const FinancialsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Financials Screen</Text>
    </View>
  );
};

export default FinancialsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorScheme.black,
  },
});
