import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";

const Button = ({ text, onPress, containerStyle, textStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        containerStyle,
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
  },
  text: {
    color: colorScheme.grey,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Condensed-Black",
  },
});
