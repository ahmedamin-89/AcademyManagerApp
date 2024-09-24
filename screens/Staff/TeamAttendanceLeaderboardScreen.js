import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import { Ionicons } from "@expo/vector-icons";

const TeamAttendanceLeaderboardScreen = ({ route }) => {
  // Ensure playerStats is an array, even if undefined
  const playerStats = route.params.playerStats || [];

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

      {/* Check if there are players */}
      {playerStats.length > 0 ? (
        // Player List
        <FlatList
          style={styles.flatlist}
          data={playerStats}
          keyExtractor={(item) => item.playerId}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 0.75,
                width: "100%",
                backgroundColor: colorScheme.lightGrey,
                opacity: 0.2,
                alignSelf: "center",
              }}
            />
          )}
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
      ) : (
        // Display message when there are no players
        <View style={styles.noPlayersContainer}>
          <Text style={styles.noPlayersText}>There are no players yet.</Text>
        </View>
      )}
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
    borderBottomColor: colorScheme.green,
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
    fontSize: 17,
    textAlign: "center",
    fontFamily: "Condensed-Light",
  },
  flatlist: {
    flexGrow: 1,
  },
  noPlayersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noPlayersText: {
    color: colorScheme.lightGrey,
    fontSize: 18,
    fontFamily: "Condensed-Light",
    paddingBottom: 50,
  },
});
