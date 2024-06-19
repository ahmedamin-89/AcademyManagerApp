import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import { Ionicons } from "@expo/vector-icons";

const PlayerSearchCard = ({ name }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.97 }]}
    >
      <View style={{ width: "92%" }}>
        <Text style={[styles.text]}>{name}</Text>
      </View>
      <View
        style={{
          width: "8%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          name={"chevron-forward"}
          size={28}
          color={colorScheme.green}
        />
      </View>
    </Pressable>
  );
};

export default PlayerSearchCard;

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: "100%",
    backgroundColor: colorScheme.black,
    justifyContent: "center",
    padding: 10,
    flexDirection: "row",
  },
  text: {
    color: colorScheme.white,
    fontSize: 20,
    fontFamily: "Condensed-Light",
  },
});
