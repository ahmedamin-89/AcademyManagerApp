import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import colorScheme from "../../constants/colorScheme";

const DataStatus = ({ text, error = true, fetchData, loading, setLoading }) => {
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, { paddingBottom: 3 }]}>
          Error Fetching Data
        </Text>

        <Pressable
          onPress={() => {
            fetchData();
            setLoading(true);
          }}
        >
          <Text style={[styles.text, { color: colorScheme.green }]}>
            Try Again
          </Text>
        </Pressable>
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
