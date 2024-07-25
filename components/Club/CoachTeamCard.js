import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";

const CoachTeamCard = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default CoachTeamCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ced4da",
    height: 118,
    width: 118,
    borderRadius: 8,
    shadowColor: colorScheme.grey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    color: colorScheme.grey,
    fontSize: 18,
    fontFamily: "Ultra-Condensed-Bold",
    marginTop: "auto",
    paddingBottom: 12,
  },
});
