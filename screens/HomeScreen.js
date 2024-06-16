import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PlayerCard from "../components/UI/PlayerCard/PlayerCard";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <PlayerCard />
      <Text
        style={{ fontFamily: "Normal-Black", fontSize: 16, color: "white" }}
      >
        Home Screen
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
