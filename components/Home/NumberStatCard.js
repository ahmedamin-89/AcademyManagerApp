import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const NumberStatCard = ({ icon, number, title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles.shadow]}>
      <View style={styles.titleContainer}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.number}>{number}</Text>
    </Pressable>
  );
};

export default NumberStatCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "46.5%",
    padding: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    color: "white",
    fontSize: 26,
    marginLeft: 10,
    fontFamily: "Ultra-Condensed-Medium",
  },
  number: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Condensed-Light",
  },
  shadow: {
    shadowColor: "white",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
  },
});
