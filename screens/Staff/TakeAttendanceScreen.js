import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import colorScheme from "../../constants/colorScheme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import backendURL from "../../constants/backendURL";
import { FlatList } from "react-native-gesture-handler";
import PlayerAttendanceCard from "../../components/Attendance/PlayerAttendanceCard";

const TakeAttendanceScreen = ({ navigation, route }) => {
  const { eventId, teamId } = route.params;
  const [players, setPlayers] = useState([]);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(`${backendURL}/players/${teamId}`, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
        },
      });
      setPlayers(response.data.players);
    } catch (error) {
      console.error("Failed to fetch players:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Take attendance for event {eventId}</Text>
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
          <PlayerAttendanceCard {...item} eventId={eventId} />
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
    fontSize: 17.5,
    fontFamily: "Condensed-Light",
  },
});
