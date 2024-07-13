import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
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
  const playersData = data.players;
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["79.5%"];
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      setBottomSheetOpen(true);
      bottomSheetModalRef.current?.present();
    } else {
      console.error("BottomSheetModal ref is not defined");
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
          <FlatList
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={styles.flatlist}
            data={playersData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PlayerSearchCard
                onPress={() =>
                  navigation.navigate("PlayerDetails", { player: item })
                }
                {...item}
              />
            )}
          />
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          enableContentPanningGesture={false}
          backgroundStyle={styles.bottomSheetBackground}
          enablePanDownToClose={true}
          onDismiss={() => setBottomSheetOpen(false)}
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
          <AddPlayerForm />
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
