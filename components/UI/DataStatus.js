import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import colorScheme from "../../constants/colorScheme";

const DataStatus = ({ text, error, loading, fetchData, noData }) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingSpinner size="large" color={colorScheme.green} />
        <Text style={styles.text}>{text || "Loading..."}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, { paddingBottom: 3 }]}>
          {error || "Error Fetching Data"}
        </Text>
        <Pressable
          onPress={() => {
            fetchData();
          }}
        >
          <Text style={[styles.text, { color: colorScheme.green }]}>
            Try Again
          </Text>
        </Pressable>
      </View>
    );
  }

  if (noData) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{text || "No data found"}</Text>
      </View>
    );
  }

  return null;
};

export default DataStatus;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorScheme.black,
    flex: 1,
  },
  text: {
    color: colorScheme.lightGrey,
    fontSize: 17,
    fontFamily: "Condensed-Light",
    marginTop: 6,
    paddingBottom: 70,
  },
});
