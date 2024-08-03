import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import colorScheme from "../../constants/colorScheme";
import AttendanceDateSelector from "../../components/Attendance/AttendanceDateSelector";
import backendURL from "../../constants/backendURL";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import TrainingEvent from "../../components/Attendance/TrainingEvent";

const AttendanceDashboardScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/events/trainings/${selectedDate.toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
          },
        }
      );
      setEvents(response.data.events);
    } catch (error) {
      console.log(error.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [selectedDate]);
  return (
    <View style={styles.container}>
      <AttendanceDateSelector
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <TrainingEvent {...item} team={item.teams[0]} />
        )}
        contentContainerStyle={{
          paddingVertical: 12,
        }}
        style={{ width: "100%" }}
      />
    </View>
  );
};

export default AttendanceDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: colorScheme.black,
  },
});
