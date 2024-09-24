import { FlatList, Pressable, StyleSheet, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import colorScheme from "../../constants/colorScheme";
import SearchBar from "../../components/UI/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import PlayerSearchCard from "../../components/Club/PlayerSearchCard";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import AddPlayerForm from "../../components/Forms/AddPlayerForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import backendURL from "../../constants/backendURL";
import axios from "axios";
import DataStatus from "../../components/UI/DataStatus";
import { RefreshControl } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import SheetBackdrop from "../../components/BottomSheets/SheetBackdrop";

const TeamPlayersScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["79.5%"];
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Extract teamId from route.params
  const { teamId } = route.params;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPlayers();
    setRefreshing(false);
  }, [teamId]);

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    } else {
      console.error("BottomSheetModal ref is not defined");
    }
  };

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${backendURL}/players/team/${teamId}`, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
        },
      });

      setPlayers(response.data.players);
    } catch (error) {
      setError(error?.response?.data?.error || "Failed to fetch players");
      console.error("Failed to fetch players:", error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${players.length} Players`,
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
  }, [navigation, players.length]);

  useEffect(() => {
    fetchPlayers();
  }, [teamId]);

  useFocusEffect(
    useCallback(() => {
      fetchPlayers();
    }, [teamId])
  );

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: colorScheme.black }}>
      <BottomSheetModalProvider>
        <View style={styles.searchContainer}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </View>

        <View style={styles.container}>
          {loading || error || filteredPlayers.length === 0 ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <DataStatus
                error={error}
                loading={loading}
                fetchData={fetchPlayers}
                noData={
                  !loading &&
                  !error &&
                  filteredPlayers.length === 0 &&
                  searchQuery === ""
                }
                text={
                  loading
                    ? "Loading players..."
                    : searchQuery
                    ? "No players match your search"
                    : "No players found"
                }
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
              data={filteredPlayers}
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
            <SheetBackdrop
              onPress={() => {
                bottomSheetModalRef.current?.dismiss();
              }}
            />
          )}
        >
          <AddPlayerForm
            selectedTeamId={teamId}
            closeSheet={() => {
              bottomSheetModalRef.current?.dismiss();
              setPlayers([]);
              fetchPlayers();
            }}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

export default TeamPlayersScreen;

const styles = StyleSheet.create({
  searchContainer: {
    paddingTop: 10,
    paddingBottom: 14,
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
});
