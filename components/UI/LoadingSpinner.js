import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const LoadingSpinner = ({ size = "small", color = "white" }) => {
  return <ActivityIndicator size={size} color={color} />;
};

export default LoadingSpinner;

const styles = StyleSheet.create({});
