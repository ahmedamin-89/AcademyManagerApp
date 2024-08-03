import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import { Ionicons } from "@expo/vector-icons";
import Picture from "../UI/Picture";

const PlayerSearchCard = ({
  name,
  yearOfBirth = 2002,
  rating = 91,
  position,
  onPress,
  imageUrl,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.97 }]}
    >
      <View
        style={{
          width: "57%",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 0,
          gap: 6,
        }}
      >
        <Picture uri={imageUrl} scale={0.3} allowEditing={false} />
        <Text style={[styles.text]}>{name}</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={[styles.stat, { width: 35 }]}>
          <Text style={[styles.text, styles.statText]}>DOB</Text>
          <Text style={[styles.text, styles.statText]}>{yearOfBirth}</Text>
        </View>
        <View style={[styles.stat, { width: 30 }]}>
          <Text style={[styles.text, styles.statText]}>Rate</Text>
          <Text style={[styles.text, styles.statText]}>{rating}</Text>
        </View>
        <View style={[styles.stat, { width: 40 }]}>
          <Text style={[styles.text, styles.statText]}>Pos.</Text>
          <Text style={[styles.text, styles.statText]}>{position}</Text>
        </View>
      </View>
      <View
        style={{
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
    height: 100,
    width: "100%",
    backgroundColor: colorScheme.black,
    justifyContent: "center",
    padding: 10,
    flexDirection: "row",
  },
  text: {
    color: colorScheme.white,
    fontSize: 18,
    fontFamily: "Condensed-Light",
  },
  statsContainer: {
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
