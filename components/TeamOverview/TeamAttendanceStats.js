import { StyleSheet, Text, View, FlatList } from "react-native"; // Corrected import
import React, { useEffect, useState } from "react";
import colorScheme from "../../constants/colorScheme";
import axios from "axios";
import backendURL from "../../constants/backendURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PieChart from "react-native-pie-chart";
import IconButton from "../Buttons/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TeamAttendanceStats = ({ teamId }) => {
  const [stats, setStats] = useState({
    playerStats: [],
    averageAttendanceRate: 0,
    bestAttendancePlayers: [],
    worstAttendancePlayers: [],
    teamAttendancePercentage: 0,
  });
  const widthAndHeight = 95;

  const navigation = useNavigation();

  const requestStats = async () => {
    try {
      const req = await axios.get(
        backendURL + `/teams/${teamId}/attendance/stats`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
          },
        }
      );

      setStats(req.data);
    } catch (error) {
      console.error("Failed to fetch team attendance stats:", error);
    }
  };

  useEffect(() => {
    requestStats();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.pieChartContainer}>
            <Text style={styles.text}>Team Attendance %</Text>

            <PieChart
              widthAndHeight={widthAndHeight}
              series={[
                stats.teamAttendancePercentage,
                100 - stats.teamAttendancePercentage,
              ]}
              sliceColor={[colorScheme.green, colorScheme.red]}
              coverRadius={0.55}
            />
            <Text style={styles.text}>{stats.teamAttendancePercentage}%</Text>
          </View>
          <View style={styles.greyLine} />
          <View style={styles.pieChartContainer}>
            <Text style={styles.text}>Avg. Attendance Rate</Text>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={[
                stats.averageAttendanceRate,
                100 - stats.averageAttendanceRate,
              ]}
              sliceColor={[colorScheme.green, colorScheme.red]}
              coverRadius={0.55}
            />
            <Text style={styles.text}>{stats.averageAttendanceRate}%</Text>
          </View>
        </View>
      </View>
      <IconButton
        icon={<Ionicons name="podium" size={28} color="white" />}
        text="Attendace Leaderboard"
        style={styles.button}
        onPress={() =>
          navigation.navigate("TeamAttendanceLeaderboard", {
            teamId,
            playerStats: stats.playerStats,
          })
        }
      />
    </>
  );
};

export default TeamAttendanceStats;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colorScheme.grey,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
    borderRadius: 10,
    padding: 10,
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    gap: 10,
  },
  text: {
    color: colorScheme.white,
    fontFamily: "Condensed-Light",
    fontSize: 18,
  },
  pieChartContainer: {
    alignItems: "center",
    gap: 10,
  },
  greyLine: {
    width: 0.75,
    height: "88%",
    backgroundColor: colorScheme.lightGrey,
    opacity: 0.2,
    alignSelf: "center",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 5,
  },
  button: {
    width: "98%",
    alignSelf: "center",
  },
});
