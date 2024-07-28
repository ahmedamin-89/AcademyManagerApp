import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import { Ionicons } from "@expo/vector-icons";
import Button from "../Buttons/Button";

const TeamPlayersOverviewHeader = ({ players }) => {
  const playerCount = players.length;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Players</Text>
      <View style={styles.sideMenu}>
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.text}>{playerCount}</Text>
          <Ionicons name="people-outline" size={22} color={colorScheme.white} />
        </View>
        <Button
          containerStyle={styles.buttonContainer}
          textStyle={styles.buttonText}
          text="Edit Players"
        />
      </View>
    </View>
  );
};

export default TeamPlayersOverviewHeader;

const styles = StyleSheet.create({
  title: {
    color: colorScheme.white,
    fontSize: 24,
    fontFamily: "Condensed-Black",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  sideMenu: {
    marginLeft: "auto",
    marginRight: 0,
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
  },
  text: {
    color: colorScheme.white,
    fontSize: 20,
    fontFamily: "Condensed-Light",
  },
  buttonContainer: {
    backgroundColor: colorScheme.green,
    padding: 10,
    borderRadius: 8,
    height: 40,
  },
  buttonText: {
    color: colorScheme.white,
    fontSize: 14,
  },
});
