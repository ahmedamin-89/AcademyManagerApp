import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ViewPlayersCard from "../components/Club/ViewPlayersCard";
import SecondaryClubCard from "../components/Club/SecondaryClubCard";

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
    padding: 20,
    gap: 20,
  },
  secondaryCards: {
    flexDirection: "row",
    gap: 20,
  },
});
