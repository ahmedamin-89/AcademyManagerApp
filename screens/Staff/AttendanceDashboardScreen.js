import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import colorScheme from "../../constants/colorScheme";
import AttendanceDateSelector from "../../components/Attendance/AttendanceDateSelector";
import backendURL from "../../constants/backendURL";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import TrainingEvent from "../../components/Attendance/TrainingEvent";
import DataStatus from "../../components/UI/DataStatus";

const AttendanceDashboardScreen = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().toISOString().slice(0, 10) + "T00:00:00.000+00:00")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
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
      setError(error?.response?.data?.error || error.message);
      Alert.alert("Error", error.response?.data?.error || error.message);
      console.log(error.response?.data?.error || error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 100);
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
        incrementDate={() => {
          setSelectedDate(
            new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)
          );
        }}
        decrementDate={() => {
          setSelectedDate(
            new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000)
          );
        }}
      />
      {(loading || error) && (
        <View style={{ paddingTop: 270 }}>
          <DataStatus
            error={error}
            loading={loading}
            setLoading={setLoading}
            fetchData={fetchEvents}
          />
        </View>
      )}
      {!loading && !error && (
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <TrainingEvent {...item} team={item.teams[0]} />
          )}
          contentContainerStyle={styles.flatlistContentContainer}
          style={{ width: "100%" }}
          ListEmptyComponent={<ListEmptyComponent />}
        />
      )}
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
  flatlistContentContainer: {
    paddingVertical: 12,
    gap: 12,
  },
});

const ListEmptyComponent = () => {
  return (
    <View style={{ alignItems: "center", flex: 1, paddingTop: 260 }}>
      <Text
        style={{
          color: colorScheme.white,
          fontSize: 18,
          fontFamily: "Condensed-Light",
        }}
      >
        No trainings found for this date
      </Text>
    </View>
  );
};
