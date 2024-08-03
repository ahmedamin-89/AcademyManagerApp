import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import { Ionicons } from "@expo/vector-icons";
import Button from "../Buttons/Button";
import { useNavigation } from "@react-navigation/native";

const TrainingEvent = ({ title, location, _id, startTime, endTime, team }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.withIcon}>
          <Ionicons name="time-sharp" size={20} color={colorScheme.grey} />
          <Text style={styles.text}>
            {startTime} - {endTime}
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.withIcon}>
          <Ionicons name="location" size={20} color={colorScheme.grey} />
          <Text style={styles.text}>{location}</Text>
        </View>
      </View>
      <Button
        text="Take Attendance"
        textStyle={{ color: colorScheme.white, fontSize: 18 }}
        containerStyle={{
          backgroundColor: colorScheme.green,
          width: "100%",
          height: 40,
        }}
        onPress={() =>
          navigation.navigate("TakeAttendance", { eventId: _id, teamId: team })
        }
      />
    </View>
  );
};

export default TrainingEvent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    backgroundColor: colorScheme.lightGrey,
    borderRadius: 8,
    gap: 8,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontFamily: "Condensed-Light",
  },
  title: {
    fontSize: 18,
    fontFamily: "Condensed-Black",
  },
  withIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
