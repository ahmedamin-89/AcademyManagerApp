import { FlatList, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import colorScheme from "../../constants/colorScheme";
import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import { Pressable } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import CreateCoachForm from "../../components/Forms/CreateCoachForm";
import CoachCard from "../../components/Club/CoachCard";
import backendURL from "../../constants/backendURL";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DataStatus from "../../components/UI/DataStatus";
import SheetBackdrop from "../../components/BottomSheets/SheetBackdrop";
const CoachesScreen = ({ navigation }) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["65%"];
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creatingCoach, setCreatingCoach] = useState(false);
  const [coachToEdit, setCoachToEdit] = useState(null);

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.present();
    } else {
      console.error("BottomSheetModal ref is not defined");
    }
  };

  const fetchCoaches = async () => {
    try {
      setError(null);

      setLoading(true);
      const response = await axios.get(backendURL + "/coaches", {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
        },
      });
      setCoaches(response.data.coaches);
    } catch (error) {
      setError(error?.response?.data?.error);
      console.log(error);
    } finally {
      setLoading(false);
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
    fetchCoaches();
  }, [navigation]);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        {(loading || error) && (
          <View style={{ paddingTop: 270 }}>
            <DataStatus
              error={error}
              loading={loading}
              setLoading={setLoading}
              fetchData={fetchCoaches}
            />
          </View>
        )}
        {!loading && !error && (
          <FlatList
            style={{ width: "100%" }}
            contentContainerStyle={{ gap: 6 }}
            data={coaches}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <CoachCard {...item} />}
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
        {creatingCoach && (
          <CreateCoachForm
            closeBottomSheet={() => {
              bottomSheetModalRef.current?.dismiss();
              fetchCoaches();
            }}
          />
        )}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme.black,
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 14,
  },
});

export default CoachesScreen;
