import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import colorScheme from "../../constants/colorScheme";
import Button from "../Buttons/Button";
import axios from "axios";
import backendURL from "../../constants/backendURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PieChart from "react-native-pie-chart";

const TeamAttendanceStats = ({ teamId }) => {
  const [stats, setStats] = useState({
    playerStats: {},
    averageAttendanceRate: {},
    bestAttendancePlayers: [],
    worstAttendancePlayers: [],
    teamAttendancePercentage: 0,
  });
  const widthAndHeight = 109;

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
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
          gap: 10,
        }}
      >
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
      {/* <Text style={styles.text}>Best Attendance Players</Text>
      {stats.bestAttendancePlayers?.map((player) => (
        <Text key={player._id} style={styles.text}>
          {player.name} - {player.attendanceRate}%
        </Text>
      ))}
      <Text style={styles.text}>Worst Attendance Players</Text>
      {stats.worstAttendancePlayers?.map((player) => (
        <Text key={player._id} style={styles.text}>
          {player.name} - {player.attendanceRate}%
        </Text>
      ))} */}
    </View>
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
    height: "100%",
    backgroundColor: colorScheme.lightGrey,
    opacity: 0.2,
  },
});
