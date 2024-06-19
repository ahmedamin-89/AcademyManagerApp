import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import { Ionicons } from "@expo/vector-icons";

const PlayerSearchCard = ({
  name,
  DOB = 2002,
  rating = 91,
  position,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.97 }]}
    >
      <View style={{ width: "46%" }}>
        <Text style={[styles.text]}>{name}</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={[styles.text, styles.statText]}>DOB</Text>
          <Text style={[styles.text, styles.statText]}>{DOB}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.text, styles.statText]}>Rating</Text>
          <Text style={[styles.text, styles.statText]}>{rating}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.text, styles.statText]}>Pos.</Text>
          <Text style={[styles.text, styles.statText]}>ST</Text>
        </View>
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
  statsContainer: {
    width: "46%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  stat: {
    justifyContent: "center",
    alignItems: "center",
  },
  statText: {
    fontSize: 16,
    fontFamily: "Condensed-Light",
  },
});
