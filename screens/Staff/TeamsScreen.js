import { StyleSheet, Text, View } from "react-native";
import { useRef, useState, useLayoutEffect, useCallback } from "react";
import colorScheme from "../../constants/colorScheme";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CreateTeamForm from "../../components/Forms/CreateTeamForm";
import backendURL from "../../constants/backendURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DataStatus from "../../components/UI/DataStatus";
import TeamCard from "../../components/Club/TeamCard";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

const TeamsScreen = ({ navigation }) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["50%"];
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.present();
    } else {
      console.error("BottomSheetModal ref is not defined");
    }
  };

  const fetchTeams = async () => {
    try {
      setError(null);

      setLoading(true);
      const response = await axios.get(backendURL + "/teams", {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
        },
      });
      setTeams(response.data.teams);
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
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      fetchTeams();
    }, [])
  );
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        {(loading || error) && (
          <DataStatus
            error={error}
            loading={loading}
            setLoading={setLoading}
            fetchData={fetchTeams}
          />
        )}

        {!loading && !error && (
          <FlatList
            style={{ width: "100%", paddingHorizontal: 20, paddingBottom: 60 }}
            contentContainerStyle={{ gap: 20 }}
            data={teams}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <TeamCard {...item} team={item} />}
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
        <BottomSheetView style={styles.contentContainer}>
          <CreateTeamForm
            closeBottomSheet={() => {
              bottomSheetModalRef.current?.dismiss();
              fetchTeams();
            }}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default TeamsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorScheme.black,
  },
});
