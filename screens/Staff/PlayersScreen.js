import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import colorScheme from "../../constants/colorScheme";
import SearchBar from "../../components/UI/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import data from "../../data/players";
import PlayerSearchCard from "../../components/Club/PlayerSearchCard";

const PlayersScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const playersData = data.players;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={({ pressed }) => [
            pressed && { opacity: 0.6 },
            {
              marginRight: 20,
              marginTop: 3,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Ionicons
            name="add-circle-outline"
            size={28}
            color={colorScheme.green}
          />
        </Pressable>
      ),
    });
  }, [navigation]);
  return (
    <>
      <View style={styles.searchContainer}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </View>
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={styles.flatlist}
          data={playersData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <PlayerSearchCard {...item} />;
          }}
        />
      </View>
    </>
  );
};

export default PlayersScreen;

const styles = StyleSheet.create({
  searchContainer: {
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: colorScheme.black,
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: colorScheme.black,
  },
  flatlist: {
    marginTop: 15,
    gap: 1,
    backgroundColor: colorScheme.white,
  },
});
