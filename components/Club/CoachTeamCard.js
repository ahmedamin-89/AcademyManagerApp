import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const CoachTeamCard = ({ name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.picContainer}>
        <Ionicons name="person" size={60} color={colorScheme.grey} />
      </View>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default CoachTeamCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ced4da",
    height: 100,
    width: 110,
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
    fontSize: 17,
    fontFamily: "Ultra-Condensed-Bold",
    paddingBottom: 18,
    textAlign: "center",
  },
  picContainer: {
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
});
