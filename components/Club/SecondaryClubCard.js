import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SecondaryClubCard = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default SecondaryClubCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 5,
    height: 100,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Condensed-Black",
  },
});
