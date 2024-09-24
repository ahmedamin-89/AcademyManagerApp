import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import Button from "../Buttons/Button";
import colorScheme from "../../constants/colorScheme";
import LightInputField from "../UI/LightInputField";
import DateSelector from "../UI/DateSelector";
import HorizontalSelector from "../UI/HorizontalSelector";
import { ScrollView } from "react-native";
import RatingAdjuster from "../UI/RatingAdjuster";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import backendURL from "../../constants/backendURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Picture from "../UI/Picture";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { FileSystemUploadType } from "expo-file-system";

const positions = [
  "ST",
  "LW/LM",
  "RW/RM",
  "CM/CDM",
  "LB",
  "CB",
  "RB",
  "GK",
  "CAM",
];

const AddPlayerForm = ({ closeSheet, selectedTeamId }) => {
  const { academy } = useContext(UserContext);
  const teams = academy.teams;
  const [loading, setLoading] = useState(false);

  // Find the team name corresponding to the selectedTeamId
  const selectedTeam = teams.find((team) => team._id === selectedTeamId);
  const selectedTeamName = selectedTeam ? selectedTeam.name : "";

  const [PlayerDetails, setPlayerDetails] = useState({
    playerName: "",
    parentName: "",
    parentPhone: "",
    playerPhone: "",
    DOB: new Date("2007-01-22T00:00:00.000Z"),
    position: [],
    team: selectedTeamId || "",
    rating: 72,
  });
  const [image, setImage] = useState(null);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [selectedTeamNameState, setSelectedTeamNameState] = useState(
    selectedTeamName ? [selectedTeamName] : []
  );

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
    }
  };

  const handleInputChange = (name, value) => {
    setPlayerDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePositionChange = (selectedPositions) => {
    setSelectedPositions(selectedPositions);
    handleInputChange("position", selectedPositions);
  };

  const handleTeamChange = (selectedTeamNames) => {
    const teamName = selectedTeamNames[0];
    const team = teams.find((team) => team.name === teamName);
    if (team) {
      setSelectedTeamNameState([team.name]);
      handleInputChange("team", team._id);
    }
  };

  const AddPlayer = async () => {
    if (!PlayerDetails.playerName) {
      Alert.alert("Player's name is required");
      return;
    }
    if (!PlayerDetails.parentName) {
      Alert.alert("Parent's name is required");
      return;
    }
    if (!PlayerDetails.parentPhone) {
      Alert.alert("Parent's phone is required");
      return;
    }
    if (!PlayerDetails.playerPhone) {
      Alert.alert("Player's phone is required");
      return;
    }
    if (!PlayerDetails.DOB) {
      Alert.alert("Date of birth is required");
      return;
    }
    if (!PlayerDetails.position || PlayerDetails.position.length === 0) {
      Alert.alert("Position is required");
      return;
    }
    if (!PlayerDetails.team) {
      Alert.alert("Team is required");
      return;
    }
    if (!PlayerDetails.rating) {
      Alert.alert("Rating is required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${backendURL}/players`,
        {
          academy: academy.id,
          ...PlayerDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
          },
        }
      );

      if (image) {
        await FileSystem.uploadAsync(
          `${backendURL}/players/${response.data.playerId}/image`,
          image,
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
      }

      Alert.alert("Player Added", response.data.message);
      closeSheet();
    } catch (error) {
      console.error("Failed to add player:", error);
      Alert.alert(
        "Failed to add player",
        error.response?.data?.error || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <BottomSheetView style={styles.contentContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.text}>Add A Player</Text>
        <Picture uri={image} pickImage={pickImage} scale={0.85} />

        <LightInputField
          label="Player's Name"
          name="playerName"
          placeholder="Enter the player's name"
          handleInputChange={handleInputChange}
          value={PlayerDetails.playerName}
        />
        <LightInputField
          label="Player's Phone"
          placeholder="Enter the player's phone number"
          name="playerPhone"
          handleInputChange={handleInputChange}
          value={PlayerDetails.playerPhone}
        />
        <LightInputField
          label="Parent's Name"
          placeholder="Enter the parent's name"
          name={"parentName"}
          handleInputChange={handleInputChange}
          value={PlayerDetails.parentName}
        />

        <LightInputField
          label="Parent's Phone"
          name="parentPhone"
          placeholder="Enter the parent's phone number"
          handleInputChange={handleInputChange}
          value={PlayerDetails.parentPhone}
        />

        <View style={{ gap: 4, width: "100%" }}>
          <Text style={styles.label}>Position</Text>
          <HorizontalSelector
            showAllOption={false}
            data={positions}
            itemStyle={{ backgroundColor: colorScheme.lightGrey }}
            multipleSelect={true}
            onSelectionChange={handlePositionChange}
          />
        </View>
        <View style={{ gap: 4, width: "100%" }}>
          <Text style={styles.label}>Team</Text>
          <HorizontalSelector
            showAllOption={false}
            data={teams.map((team) => team.name)}
            itemStyle={{ backgroundColor: colorScheme.lightGrey }}
            onSelectionChange={handleTeamChange}
            initialSelection={selectedTeamNameState} // Use initialSelection prop
          />
        </View>
        <View
          style={{
            gap: 15,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={[styles.label, { alignSelf: "center" }]}>Rating:</Text>
          <RatingAdjuster
            value={PlayerDetails.rating}
            onChangeText={(text) =>
              handleInputChange("rating", parseInt(text) || 0)
            }
            increment={() =>
              handleInputChange("rating", PlayerDetails.rating + 1)
            }
            decrement={() =>
              handleInputChange("rating", PlayerDetails.rating - 1)
            }
          />
        </View>
        <View
          style={{
            gap: 15,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={[styles.label, { alignSelf: "center" }]}>
            Date of Birth:
          </Text>
          <DateSelector
            selectedDate={PlayerDetails.DOB}
            setSelectedDate={(date) => handleInputChange("DOB", date)}
          />
        </View>
      </ScrollView>

      <Button
        loading={loading}
        onPress={AddPlayer}
        disabled={
          !PlayerDetails.playerName ||
          !PlayerDetails.parentName ||
          !PlayerDetails.parentPhone ||
          !PlayerDetails.playerPhone ||
          !PlayerDetails.DOB ||
          !PlayerDetails.position ||
          !PlayerDetails.team ||
          !PlayerDetails.rating ||
          loading
        }
        text="Add Player"
        textStyle={{ color: colorScheme.white, fontSize: 22 }}
        containerStyle={{
          width: "70%",
          backgroundColor: colorScheme.green,
          marginTop: "auto",
        }}
      />
    </BottomSheetView>
  );
};

export default AddPlayerForm;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: "Condensed-Black",
    color: colorScheme.grey,
  },
  contentContainer: {
    padding: 15,
    alignItems: "center",
    gap: 18,
    marginBottom: 60,
  },
  label: {
    color: colorScheme.grey,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Condensed-Light",
    alignSelf: "flex-start",
  },
});
