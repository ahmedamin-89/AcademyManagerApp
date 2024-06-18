import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";

const IconButton = ({ text, style, icon }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: 0.9 },
        style,
      ]}
    >
      {icon}
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorScheme.green,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
    flexDirection: "row",
    gap: 4,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Condensed-Black",
  },
});
