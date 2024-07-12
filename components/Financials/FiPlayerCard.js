import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import { Ionicons } from "@expo/vector-icons";

const FiPlayerCard = ({ name, paid, dueDate, interval, amount }) => {
  let intervalString = "";
  switch (interval) {
    case 1:
      intervalString = "Monthly";
      break;
    case 2:
      intervalString = "Quarterly";
      break;
    case 3:
      intervalString = "Half-Yearly";
      break;
    case 4:
      intervalString = "Yearly";
      break;
    default:
      intervalString = "Unknown";
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.97 }]}
    >
      <Text style={[styles.text, { width: "29%" }]}>{name}</Text>
      <Text style={[styles.text, { width: "20%" }]}>
        {paid ? "Paid" : "Not Paid"}
      </Text>
      <Text style={[styles.text, { width: "10%" }]}>
        {new Date(dueDate).getDate()}
      </Text>
      <Text style={[styles.text, { width: "22%" }]}>{intervalString}</Text>
      <Text style={[styles.text, { width: "13%" }]}>{amount}</Text>
      <Ionicons name={"chevron-forward"} size={20} color={colorScheme.green} />
    </Pressable>
  );
};

export default FiPlayerCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colorScheme.black,
    height: 58,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    color: "#fff",
    fontFamily: "Condensed-Light",
    fontSize: 16.5,
  },
});
