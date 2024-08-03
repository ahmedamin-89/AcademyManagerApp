import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import Checkbox from "expo-checkbox";
import Picture from "../UI/Picture";

const PlayerAttendanceCard = ({
  name,
  phoneNumber,
  eventId,
  attended = false,
  imageUrl,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Picture scale={0.28} uri={imageUrl} allowEditing={false} />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.text}>{phoneNumber}</Text>
      </View>
      <Checkbox
        value={attended}
        onValueChange={() => {}}
        color={colorScheme.green}
        style={styles.checkbox}
      />
    </View>
  );
};

export default PlayerAttendanceCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 12,
    backgroundColor: colorScheme.black,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: colorScheme.white,
    fontSize: 18,
    fontFamily: "Condensed-Light",
  },
  nameContainer: {
    width: "30.5%",
  },
  checkbox: {
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
});
