import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import colorScheme from "../../constants/colorScheme";

const PlayerSearchBottomTab = () => {
  return (
    <View style={styles.bar}>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          pressed && { opacity: 0.5 },
          { opacity: 0 },
        ]}
      >
        <Ionicons name="chevron-back" size={25} color={colorScheme.white} />
        <Text style={styles.text}>Previous</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [styles.container, pressed && { opacity: 0.5 }]}
      >
        <Text style={styles.text}>Next</Text>
        <Ionicons name="chevron-forward" size={25} color={colorScheme.white} />
      </Pressable>
    </View>
  );
};

export default PlayerSearchBottomTab;

const styles = StyleSheet.create({
  bar: {
    padding: 10,
    paddingTop: 0,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e1e1e",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colorScheme.white,
    fontSize: 20,
    fontFamily: "Condensed-Black",
  },
});
