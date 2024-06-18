import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import ViewPlayersCard from "../components/Club/ViewPlayersCard";
import SecondaryClubCard from "../components/Club/SecondaryClubCard";
import backgroundImage from "../assets/images/bg.png";
const ClubScreen = () => {
  return (
    <View style={styles.container}>
      <ViewPlayersCard />
      <View style={styles.secondaryCards}>
        <SecondaryClubCard text="Teams" />
        <SecondaryClubCard text="Coaches" />
      </View>
    </View>
  );
};

export default ClubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    gap: 20,
  },
  secondaryCards: {
    flexDirection: "row",
    gap: 20,
  },
});
