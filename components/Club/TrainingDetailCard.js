import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import colorScheme from "../../constants/colorScheme";

const TrainingDetailCard = ({
  dayNames = ["Sun", "Tue", "Thu"],
  startTime = "6:00 PM",
  endTime = "7:30 PM",
  location = "X Field - New Cairo",
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <Ionicons name="location" size={20} color="black" />
        <Text style={styles.locationText}>{location}</Text>
      </View>
      <View style={styles.dayContainer}>
        {dayNames.map((day) => (
          <Text key={day} style={styles.dayText}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{startTime}</Text>
        <Ionicons name="chevron-forward" size={20} color={colorScheme.black} />
        <Text style={styles.timeText}>{endTime}</Text>
      </View>
    </View>
  );
};

export default TrainingDetailCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ced4da",
    height: 100,
    width: 250,
    borderRadius: 8,
    shadowColor: colorScheme.grey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    padding: 10,
  },
  dayContainer: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "center",
    gap: 10,
  },
  dayText: {
    color: "black",
    fontSize: 17,
    fontFamily: "Ultra-Condensed-Bold",
    textAlign: "center",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    padding: 5,
  },
  timeText: {
    color: "black",
    fontSize: 18,
    fontFamily: "Ultra-Condensed-Medium",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  locationText: {
    color: "black",
    fontSize: 17,
    fontFamily: "Ultra-Condensed-Bold",
    textAlign: "center",
  },

  locationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});
