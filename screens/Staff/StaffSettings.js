import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";

const StaffSettings = () => {
  return (
    <View style={styles.container}>
      <Text>StaffSettings</Text>
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
});
