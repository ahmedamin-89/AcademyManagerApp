import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import LoadingSpinner from "../UI/LoadingSpinner";

const IconButton = ({ text, style, icon, onPress, loading }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: 0.85 },
        style,
      ]}
      onPress={onPress}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {icon}
          <Text style={styles.text}>{text}</Text>
        </>
      )}
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorScheme.green,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
    flexDirection: "row",
    gap: 6,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Condensed-Black",
  },
});
