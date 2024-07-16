import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import colorScheme from "../../constants/colorScheme";

const DataStatus = ({ text, error = true, fetchData, loading, setLoading }) => {
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LoadingSpinner size="large" color={colorScheme.green} />
      <Text style={styles.text}>{text || "Loading..."}</Text>
    </View>
  );
};

export default DataStatus;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colorScheme.lightGrey,
    fontSize: 17,
    fontFamily: "Condensed-Light",
    marginTop: 6,
    paddingBottom: 70,
  },
});
