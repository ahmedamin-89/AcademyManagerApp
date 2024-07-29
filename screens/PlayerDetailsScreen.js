import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import colorScheme from "../constants/colorScheme";
import Picture from "../components/UI/Picture";
import { ImagePicker } from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import backendURL from "../constants/backendURL";
import PressablePhoneNumber from "../components/UI/PressablePhoneNumber";
import Button from "../components/Buttons/Button";

const PlayerDetailsScreen = ({ navigation, route }) => {
  const { name, number, position, _id } = route.params.player;

  const [PlayerDetails, setPlayerDetails] = useState({
    name: "Hussein Mohamed",
    parentName: "Sara Khaled",
    parentPhoneNumber: "01117775978",
    knownAs: "- - -",
    phoneNumber: "01117775978",
    DOB: new Date("2007-01-22T00:00:00.000Z"),
    position: "",
    team: "",
    rating: 72,
    _id: "",
    yearOfBirth: 2007,
  });

  const imageUrl = null;
  const image = null;
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      base64: false,
    });

    // if (!result.canceled) {
    //   const manipulatedImage = await ImageManipulator.manipulateAsync(
    //     result.assets[0].uri,
    //     [],
    //     { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
    //   );

    //   setImage(manipulatedImage.uri);
    //   try {
    //     await FileSystem.uploadAsync(
    //       `${backendURL}/teams/photo`,
    //       manipulatedImage.uri,
    //       {
    //         httpMethod: "POST",
    //         uploadType: FileSystemUploadType.MULTIPART,
    //         fieldName: "image",
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //           Authorization: `Bearer ${await AsyncStorage.getItem(
    //             "authToken"
    //           )}`,
    //         },
    //         parameters: {
    //           teamId: _id,
    //         },
    //       }
    //     );
    //   } catch (error) {
    //     Alert.alert("Error", error.response?.data?.error || error.message);
    //   }
    // }
  };

  useLayoutEffect(() => {
    // navigation.setOptions({
    //   title: name,
    // });
    setPlayerDetails({
      ...route.params.player,
      knownAs: route.params.player.knownAs || "- - -",
      DOB: new Date(route.params.player.dateOfBirth),
    });
  }, [navigation]);
  return (
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
});
