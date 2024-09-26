import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import { Ionicons } from "@expo/vector-icons";

const FiPlayerCard = ({ name, paid, amountPaid, amountDue }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.97 }]}
    >
      <Text style={[styles.text, { width: "49%" }]}>{name}</Text>

      <Text style={[styles.text, { width: "10%" }]}>
        {/* {new Date(dueDate).getDate()} */}
      </Text>
      <Text
        style={[
          styles.text,
          { width: "22%", color: paid ? colorScheme.green : colorScheme.red },
        ]}
      >
        £{paid ? amountPaid : amountDue}
      </Text>
      <Text style={[styles.text, { width: "13%" }]}></Text>
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
