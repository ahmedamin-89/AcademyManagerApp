import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import colorScheme from "../constants/colorScheme";

const PlayerDetailsScreen = ({ navigation, route }) => {
  const { name, number, position, height, weight } = route.params.player;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [navigation]);
  return <View style={styles.container}></View>;
};

export default PlayerDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: colorScheme.black,
  },
});
