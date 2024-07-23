import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import LoadingSpinner from "../UI/LoadingSpinner";

const Button = ({
  text,
  onPress,
  containerStyle,
  textStyle,
  loading,
  disabled,
}) => {
  return (
    <Pressable
      onPress={
        loading || disabled
          ? () => {
              return;
            }
          : onPress
      }
      style={({ pressed }) => [
        styles.container,
        containerStyle,
        disabled && styles.disabledContainer,
        !loading && !disabled && pressed && { opacity: 0.75 },
      ]}
      disabled={loading || disabled}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Text style={[styles.text, textStyle, disabled && styles.disabledText]}>
          {text}
        </Text>
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
  disabledContainer: {
    backgroundColor: "#d3d3d3",
    shadowColor: "#d3d3d3",
  },
  disabledText: {
    color: "#a9a9a9",
  },
});
