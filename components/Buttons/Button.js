import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import LoadingSpinner from "../UI/LoadingSpinner";

const Button = ({ text, onPress, containerStyle, textStyle, loading }) => {
  return (
    <Pressable
      onPress={
        loading
          ? () => {
              return;
            }
          : onPress
      }
      style={({ pressed }) => [
        styles.container,
        containerStyle,

        !loading && pressed && { opacity: 0.75 },
      ]}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Text style={[styles.text, textStyle]}>{text}</Text>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    height: 48,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colorScheme.grey,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Condensed-Black",
  },
});
