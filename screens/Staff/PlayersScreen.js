import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import colorScheme from "../../constants/colorScheme";
import SearchBar from "../../components/UI/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import data from "../../data/players";
import PlayerSearchCard from "../../components/Club/PlayerSearchCard";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import PlayerSearchBottomTab from "../../components/Club/PlayerSearchBottomTab";
import HorizontalSelector from "../../components/UI/HorizontalSelector";
import AddPlayerForm from "../../components/Forms/AddPlayerForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import backendURL from "../../constants/backendURL";
import axios from "axios";
import DataStatus from "../../components/UI/DataStatus";
import { RefreshControl } from "react-native-gesture-handler";

const TeamsData = [
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
];
const PlayersScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["79.5%"];
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPlayers();
    setRefreshing(false);
  }, []);

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.present();
    } else {
      console.error("BottomSheetModal ref is not defined");
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(`${backendURL}/players/`, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
        },
      });

      setPlayers(response.data.players);
    } catch (error) {
      setError(error?.response?.data?.error);
      console.error("Failed to fetch players:", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={openBottomSheet}
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

    fetchPlayers();
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: colorScheme.black }}>
      <BottomSheetModalProvider>
        <View style={styles.searchContainer}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </View>
        {/* <View style={[styles.filterContainer, bottomSheetOpen && { zIndex: 0 }]}>
        <SelectItemList placeholder="Team" />
      </View> */}
        <HorizontalSelector data={TeamsData} />
        <View style={styles.container}>
          {players.length === 0 ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <DataStatus
                error={error}
                loading={loading}
                setLoading={setLoading}
                fetchData={fetchPlayers}
              />
            </View>
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[colorScheme.white]}
                  tintColor={colorScheme.white}
                  size={"large"}
                />
              }
              style={{ flex: 1, width: "100%" }}
              contentContainerStyle={styles.flatlist}
              data={players}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <PlayerSearchCard
                  onPress={() =>
                    navigation.navigate("PlayerDetails", { player: item })
                  }
                  {...item}
                />
              )}
            />
          )}
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          enableContentPanningGesture={false}
          backgroundStyle={styles.bottomSheetBackground}
          enablePanDownToClose={true}
          backdropComponent={() => (
            <Pressable
              onPress={() => {
                bottomSheetModalRef.current?.dismiss();
              }}
              style={{
                height: "100%",
                position: "absolute",
                width: "100%",
                zIndex: 0,
                backgroundColor: "rgba(0, 0, 0, 0.65)",
              }}
            ></Pressable>
          )}
        >
          <AddPlayerForm
            closeSheet={() => {
              bottomSheetModalRef.current?.dismiss();
              setPlayers([]);
              fetchPlayers();
            }}
          />
        </BottomSheetModal>
        <PlayerSearchBottomTab />
      </BottomSheetModalProvider>
    </View>
  );
};

export default PlayersScreen;

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: colorScheme.black,
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: colorScheme.black,
    position: "relative",
  },
  flatlist: {
    gap: 1,
    zIndex: 10,
    backgroundColor: colorScheme.white,
  },
  bottomSheetBackground: {
    shadowColor: "white",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
    justifyContent: "center",
  },

  filterContainer: {
    backgroundColor: colorScheme.black,
    padding: 10,
    zIndex: 100, // Ensure this is higher than other components
  },
});
