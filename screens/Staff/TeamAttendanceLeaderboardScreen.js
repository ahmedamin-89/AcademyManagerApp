import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import { Ionicons } from "@expo/vector-icons";

const TeamAttendanceLeaderboardScreen = ({ route }) => {
  const playerStats = route.params.playerStats;

  return (
    <View style={styles.screenContainer}>
      {/* Column Titles */}
      <View style={styles.columnHeaderContainer}>
        <View style={styles.columnNameContainer}>
          <Text style={[styles.text, styles.columnHeaderText]}>Name</Text>
        </View>
        <View style={styles.columnStatsContainer}>
          <Text style={[styles.text, styles.columnHeaderText]}>Attended</Text>
          <Text style={[styles.text, styles.columnHeaderText]}>Possible</Text>
          <Text style={[styles.text, styles.columnHeaderText]}>Rate (%)</Text>
        </View>
      </View>

      {/* Player List */}
      <FlatList
        style={styles.flatlist}
        data={playerStats}
        keyExtractor={(item) => item.playerId}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              styles.itemContainer,
              pressed && { opacity: 0.97 },
            ]}
          >
            <View style={styles.playerNameContainer}>
              <Text style={[styles.text]}>{item.name}</Text>
            </View>
            <View style={styles.playerStatsContainer}>
              <Text style={[styles.text, styles.statText]}>
                {item.attendedSessionsCount}
              </Text>
              <Text style={[styles.text, styles.statText]}>
                {item.possibleSessionsCount}
              </Text>
              <Text style={[styles.text, styles.statText]}>
                {item.attendanceRate}%
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <Ionicons
                name={"chevron-forward"}
                size={28}
                color={colorScheme.green}
              />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default TeamAttendanceLeaderboardScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colorScheme.black,
  },
  headerContainer: {
    paddingVertical: 15,
    backgroundColor: colorScheme.black,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.lightGrey,
    fontFamily: "Condensed-Bold",
  },
  headerTitle: {
    color: colorScheme.white,
    fontSize: 24,
    fontFamily: "Condensed-Black",
  },
  columnHeaderContainer: {
    flexDirection: "row",
    backgroundColor: colorScheme.black,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.lightGrey,
  },
  columnNameContainer: {
    width: "40%",
    justifyContent: "center",
  },
  columnStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingRight: 10,
  },
  columnHeaderText: {
    fontSize: 17,
    fontFamily: "Ultra-Condensed-Black",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: colorScheme.black,
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.lightGrey,
  },
  playerNameContainer: {
    width: "40%",
    justifyContent: "center",
  },
  playerStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingRight: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colorScheme.white,
    fontSize: 18,
    fontFamily: "Condensed-Light",
  },
  statText: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Condensed-Light",
  },
  flatlist: {
    flexGrow: 1,
  },
});
