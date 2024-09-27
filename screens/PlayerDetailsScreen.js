// PlayerDetailsScreen.js

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colorScheme from "../constants/colorScheme";
import Picture from "../components/UI/Picture";
import AsyncStorage from "@react-native-async-storage/async-storage";
import backendURL from "../constants/backendURL";
import PressablePhoneNumber from "../components/UI/PressablePhoneNumber";
import Button from "../components/Buttons/Button";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { FileSystemUploadType } from "expo-file-system";
import MenuButton from "../components/Buttons/MenuButton";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import axios from "axios";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />;

const PlayerDetailsScreen = ({ navigation, route }) => {
  const { _id } = route.params.player; // Extract playerId from route params
  const snapPoints = ["18%"];
  const bottomSheetModalRef = useRef(null);
  const playerId = _id;

  // State variables
  const [PlayerDetails, setPlayerDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [deletingPlayer, setDeletingPlayer] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleInputChange = (fieldName, value) => {
    setPlayerDetails((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      base64: false,
    });

    if (!result.canceled) {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );

      setImage(manipulatedImage.uri);
      try {
        await FileSystem.uploadAsync(
          `${backendURL}/players/player/${_id}/image`,
          manipulatedImage.uri,
          {
            httpMethod: "POST",
            uploadType: FileSystemUploadType.MULTIPART,
            fieldName: "image",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${await AsyncStorage.getItem(
                "authToken"
              )}`,
            },
          }
        );
        Alert.alert("Success", "Player photo updated successfully");
      } catch (error) {
        Alert.alert("Error", error.response?.data?.error || error.message);
      }
    }
  };

  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  const deletePlayer = async () => {
    try {
      setDeletingPlayer(true);
      await axios.delete(`${backendURL}/players/player/${playerId}`, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
        },
      });
      Alert.alert("Success", "Player deleted successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.response?.data?.error || error.message);
    } finally {
      setDeletingPlayer(false);
    }
  };

  const fetchAttendanceRate = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/players/player/${playerId}/attendanceRate`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
          },
        }
      );
      setPlayerDetails((prevState) => ({
        ...prevState,
        attendanceRate: response.data.attendanceRate,
        attendedSessionsCount: response.data.attendedSessionsCount,
        unAttendedSessionsCount: response.data.unAttendedSessionsCount,
      }));
    } catch (error) {
      console.log("", error.response?.data?.error || error.message);
    }
  };

  const fetchPlayerDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendURL}/players/player/${playerId}`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
          },
        }
      );
      const playerData = response.data.player;

      setPlayerDetails({
        ...playerData,
        knownAs: playerData.knownAs || "- - -",
        DOB: new Date(playerData.dateOfBirth),
      });
      setImage(playerData.imageUrl || null);
      fetchAttendanceRate();
    } catch (error) {
      console.error(
        "Failed to fetch player details:",
        error.response?.data?.error || error.message
      );
      Alert.alert("Error", error.response?.data?.error || error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    fetchPlayerDetails();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <MenuButton onPress={openBottomSheet} />,
    });
  }, [navigation]);

  if (loading || !PlayerDetails) {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        style={{ backgroundColor: colorScheme.black }}
        showsVerticalScrollIndicator={false}
      >
        {/* Skeleton Loader */}
        <SkeletonPlaceholder />
      </ScrollView>
    );
  }

  return (
    <BottomSheetModalProvider>
      <ScrollView
        contentContainerStyle={styles.container}
        style={{ backgroundColor: colorScheme.black }}
        showsVerticalScrollIndicator={false}
      >
        <Picture uri={image} pickImage={pickImage} />
        <View style={styles.item1}>
          <Text style={styles.title}>Full Name</Text>
          <Text style={styles.text}>{PlayerDetails.name}</Text>
        </View>
        <View style={styles.item2}>
          <Text style={styles.title}>Total Attended Sessions</Text>
          <Text style={styles.text}>{PlayerDetails.attendanceCount}</Text>
        </View>
        <View style={styles.item1}>
          <Text style={styles.title}>Date of Birth</Text>
          <Text style={styles.text}>
            {PlayerDetails.DOB.toISOString().substring(0, 10)}
          </Text>
        </View>
        <View style={styles.item2}>
          <Text style={styles.title}>Position</Text>
          <Text style={styles.text}>{PlayerDetails.position}</Text>
        </View>
        <View style={styles.item1}>
          <Text style={styles.title}>Player's Phone</Text>
          <PressablePhoneNumber
            style={styles.text}
            phoneNumber={PlayerDetails.phoneNumber}
          />
        </View>
        <View style={styles.item2}>
          <Text style={styles.title}>Parent's Phone</Text>
          <PressablePhoneNumber
            style={styles.text}
            phoneNumber={PlayerDetails.parentPhoneNumber}
          />
        </View>
        <View style={styles.item1}>
          <Text style={styles.title}>Attendance Rate</Text>
          <Text style={styles.text}>
            {(PlayerDetails.attendanceRate * 100).toFixed(2) || 0}%
          </Text>
        </View>
        <View style={styles.item2}>
          <Text style={styles.title}>Unattended Sessions</Text>
          <Text style={styles.text}>
            {PlayerDetails.unAttendedSessionsCount}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("AddPayment", { playerId })}
            text="Add Payment"
            textStyle={{ color: colorScheme.white, fontSize: 22 }}
            containerStyle={{
              backgroundColor: colorScheme.green,
              marginTop: "auto",
              marginHorizontal: 5,
            }}
          />
        </View>
      </ScrollView>
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
          <Button
            text="Delete Player"
            onPress={deletePlayer}
            loading={deletingPlayer}
            textStyle={{ color: colorScheme.white, fontSize: 22 }}
            containerStyle={{
              width: "70%",
              backgroundColor: colorScheme.red,
            }}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default PlayerDetailsScreen;

const SkeletonPlaceholder = () => {
  return (
    <MotiView
      style={styles.skeletonContainer}
      transition={{
        type: "timing",
      }}
    >
      {/* Skeleton for Image */}
      <Skeleton colorMode="dark" width={210} height={210} radius="round" />

      {/* Skeleton for other fields */}
      {[...Array(8)].map((_, index) => (
        <MotiView
          key={index}
          style={[
            styles.skeletonItem,
            index % 2 === 0 ? styles.item1 : styles.item2,
          ]}
        >
          <Skeleton colorMode="dark" width="80%" height={19} />
          <Spacer height={8} />

          <Skeleton colorMode="dark" width="50%" height={17.5} />
        </MotiView>
      ))}
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    backgroundColor: colorScheme.black,
  },
  item1: {
    width: "100%",
    padding: 10,
    backgroundColor: colorScheme.black,
  },
  item2: {
    width: "100%",
    padding: 10,
    backgroundColor: colorScheme.grey,
  },
  title: {
    color: colorScheme.white,
    fontSize: 19,
    fontFamily: "Condensed-Black",
  },
  text: {
    color: colorScheme.white,
    fontSize: 17.5,
    fontFamily: "Condensed-Light",
  },
  buttonContainer: {
    paddingTop: 10,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: 50,
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    color: colorScheme.white,
    fontSize: 20,
  },
  skeletonContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
  },
  skeletonItem: {
    width: "100%",
    padding: 10,
  },
  bottomSheetBackground: {
    backgroundColor: colorScheme.black,
  },
});
