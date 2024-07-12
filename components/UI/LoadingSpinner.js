import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const LoadingSpinner = ({ size = 10, color = "white" }) => {
  return <ActivityIndicator size="small" color={color} />;
};

export default LoadingSpinner;

const styles = StyleSheet.create({});
