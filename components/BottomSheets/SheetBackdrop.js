import { Pressable, StyleSheet } from "react-native";
import React from "react";

const SheetBackdrop = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: "100%",
        position: "absolute",
        width: "100%",
        zIndex: 0,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
      }}
    />
  );
};

export default SheetBackdrop;

const styles = StyleSheet.create({});
