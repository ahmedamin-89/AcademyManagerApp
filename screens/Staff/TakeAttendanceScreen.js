import { Alert, StyleSheet, Text, View } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import colorScheme from "../../constants/colorScheme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import backendURL from "../../constants/backendURL";
import { FlatList } from "react-native-gesture-handler";
import PlayerAttendanceCard from "../../components/Attendance/PlayerAttendanceCard";
import { Ionicons } from "@expo/vector-icons";

const TakeAttendanceScreen = ({ navigation, route }) => {
  const { eventId, teamId } = route.params;
  const [players, setPlayers] = useState([]);
  const [attendedPlayers, setAttendedPlayers] = useState([]);
  const fetchPlayers = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/trainings/event/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
          },
        }
      );
      setPlayers(response.data.players);
      setAttendedPlayers(response.data.event.attendees);
    } catch (error) {
      console.error("Failed to fetch players:", error.response?.data?.error);
    }
  };

  const addPlayerAttendance = async () => {
    try {
      await axios.post(
        `${backendURL}/trainings/${eventId}/attendance`,
        {
          players: attendedPlayers,
        },
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to add attendance:", error);
      Alert.alert("Error", error.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    addPlayerAttendance();

    return () => {
      addPlayerAttendance();
    };
  }, [attendedPlayers]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.statContainer}>
          <Text
            style={styles.text}
          >{`${attendedPlayers.length}/${players.length}`}</Text>
          <Ionicons name="people" size={24} color={colorScheme.white} />
        </View>
      ),
    });
  }, [navigation, attendedPlayers]);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{
          backgroundColor: colorScheme.grey,
          gap: 1,
          width: "100%",
        }}
        data={players}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PlayerAttendanceCard
            {...item}
            eventId={eventId}
            attended={attendedPlayers.includes(item._id)}
            onValueChange={async (value) => {
              if (value) {
                setAttendedPlayers((prevState) => [...prevState, item._id]);
              } else {
                setAttendedPlayers((prevState) =>
                  prevState.filter((id) => id !== item._id)
                );
              }
            }}
          />
        )}
      />
    </View>
  );
};

export default TakeAttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colorScheme.black,
  },
  text: {
    color: colorScheme.white,
    fontSize: 21,
    fontFamily: "Condensed-Light",
    letterSpacing: 0.5,
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginRight: 10,
  },
});
