import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
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
import LightInputField from "../components/UI/LightInputField";
import axios from "axios";

const PlayerDetailsScreen = ({ navigation, route }) => {
  const { name, number, position, _id, imageUrl } = route.params.player;
  const snapPoints = ["18%"];
  const bottomSheetModalRef = useRef(null);
  const [PlayerDetails, setPlayerDetails] = useState({
    name: "",
    parentName: "",
    parentPhoneNumber: "",
    knownAs: "- - -",
    phoneNumber: "",
    DOB: new Date(),
    position: "",
    team: "",
    rating: 0,
    _id: "",
    yearOfBirth: 2002,
  });

  const [deletingPlayer, setDeletingPlayer] = useState(false);

  const handleInputChange = (fieldName, value) => {
    setPlayerDetails((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const [image, setImage] = useState(null);
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
          `${backendURL}/players/${_id}/image`,
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
      await axios.delete(`${backendURL}/players/${_id}`, {
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

  useLayoutEffect(() => {
    setPlayerDetails({
      ...route.params.player,
      knownAs: route.params.player.knownAs || "- - -",
      DOB: new Date(route.params.player.dateOfBirth),
    });

    navigation.setOptions({
      headerRight: () => <MenuButton onPress={openBottomSheet} />,
    });
  }, [navigation]);

  return (
    <BottomSheetModalProvider>
      <ScrollView
        contentContainerStyle={styles.container}
        style={{ backgroundColor: colorScheme.black }}
      >
        <Picture uri={image || imageUrl} pickImage={pickImage} />
        <View style={styles.item1}>
          <Text style={styles.title}>Full Name</Text>
          <Text style={styles.text}>{PlayerDetails.name}</Text>
        </View>
        <View style={styles.item2}>
          <Text style={styles.title}>Known As</Text>
          <Text style={styles.text}>{PlayerDetails.knownAs}</Text>
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
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("AddPayment")}
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
          {/* <LightInputField
            label="Name"
            value={name}
            placeholder="Enter the team's name"
            name="name"
            handleInputChange={handleInputChange}
          />
          <LightInputField
            label="Known As"
            value={PlayerDetails.knownAs}
            placeholder="Enter the team's name"
            name="knownAs"
            handleInputChange={handleInputChange}
          /> */}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
