import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import colorScheme from "../../constants/colorScheme";
import MenuButton from "../../components/Buttons/MenuButton";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { FileSystemUploadType } from "expo-file-system";
import Button from "../../components/Buttons/Button";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Picture from "../../components/UI/Picture";
import backendURL from "../../constants/backendURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImageManipulator from "expo-image-manipulator";
import LightInputField from "../../components/UI/LightInputField";
import axios from "axios";
import HorizontalSelector from "../../components/UI/HorizontalSelector";
import CoachTeamCard from "../../components/Club/CoachTeamCard";

const yearsData = [
  2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
];

const arraysEqual = (a, b) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const coaches = [
  {
    name: "Reda Seeka",
  },
  {
    name: "Mohamed Salah",
  },
  {
    name: "Loay Elsobky",
  },
];

const TeamOverviewScreen = ({ navigation, route }) => {
  const { name, yearsOfBirth, _id, imageUrl } = route.params;

  const [storedTeamDetails, setStoredTeamDetails] = useState({
    name,
    yearsOfBirth,
  });

  const snapPoints = ["78%"];
  const bottomSheetModalRef = useRef(null);
  const [updatingInfo, setUpdatingInfo] = useState(false);
  const [deletingTeam, setDeletingTeam] = useState(false);

  const [teamDetails, setTeamDetails] = useState({
    name,
    yearsOfBirth,
  });

  const handleInputChange = (fieldName, value) => {
    setTeamDetails((prevState) => ({
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
          `${backendURL}/teams/photo`,
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
            parameters: {
              teamId: _id,
            },
          }
        );
      } catch (error) {
        Alert.alert("Error", error.response?.data?.error || error.message);
      }
    }
  };

  const updateTeamName = async () => {
    try {
      setUpdatingInfo(true);
      const response = await axios.patch(
        `${backendURL}/teams/info`,
        {
          name: teamDetails.name,
          yearsOfBirth: teamDetails.yearsOfBirth,
          teamId: _id,
        },
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
          },
        }
      );

      setStoredTeamDetails({
        name: teamDetails.name,
        yearsOfBirth: teamDetails.yearsOfBirth,
      });

      bottomSheetModalRef.current?.dismiss();
      Alert.alert("Success", response.data.message);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.error || error.message);
    } finally {
      setUpdatingInfo(false);
    }
  };

  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <MenuButton onPress={openBottomSheet} />,
    });
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      title: `${storedTeamDetails.name} Team`,
    });
  }, [navigation, storedTeamDetails.name]);

  const deleteTeamHandler = async () => {
    try {
      setDeletingTeam(true);
      const response = await axios.delete(`${backendURL}/teams/${_id}`, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
        },
      });

      navigation.goBack();
      Alert.alert("Success", response.data.message);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.error || error.message);
    } finally {
      setDeletingTeam(false);
    }
  };

  const deleteTeam = () => {
    Alert.alert("Delete Team", "Are you sure you want to delete this team?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: deleteTeamHandler,
      },
    ]);
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>Training Details</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Assigned Coaches</Text>
          <FlatList
            data={coaches}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <CoachTeamCard name={item.name} team={item} />
            )}
            contentContainerStyle={{
              gap: 10,
              paddingVertical: 10,
              overflow: "visible",
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text style={[styles.title, { color: "white", paddingTop: 10 }]}>
          Players
        </Text>
      </View>
      <View style={styles.playersContainer}></View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onDismiss={() => {
          setTeamDetails({
            name: storedTeamDetails.name,
            yearsOfBirth: storedTeamDetails.yearsOfBirth,
          });
        }}
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
          <Picture uri={image || imageUrl} pickImage={pickImage} />
          <LightInputField
            label="Team Name"
            value={teamDetails.name}
            placeholder="Enter the team's name"
            name="name"
            handleInputChange={handleInputChange}
          />
          <View style={{ gap: 4, width: "100%" }}>
            <Text style={styles.label}>Years of Birth</Text>
            <HorizontalSelector
              initialSelection={teamDetails.yearsOfBirth}
              showAllOption={false}
              data={yearsData}
              itemStyle={{ backgroundColor: colorScheme.lightGrey }}
              multipleSelect={true}
              onSelectionChange={(selectedYearsOfBirth) =>
                handleInputChange("yearsOfBirth", selectedYearsOfBirth)
              }
            />
          </View>
          <Button
            text="Update Info"
            loading={updatingInfo}
            disabled={
              (teamDetails.name === storedTeamDetails.name &&
                arraysEqual(
                  teamDetails.yearsOfBirth,
                  storedTeamDetails.yearsOfBirth
                )) ||
              teamDetails.name === "" ||
              teamDetails.yearsOfBirth.length === 0
            }
            textStyle={{ color: colorScheme.white, fontSize: 22 }}
            containerStyle={{
              width: "70%",
              backgroundColor: colorScheme.green,
              marginTop: "auto",
            }}
            onPress={updateTeamName}
          />
          <Button
            text="Delete Team"
            onPress={deleteTeam}
            loading={deletingTeam}
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

export default TeamOverviewScreen;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 20,
    backgroundColor: colorScheme.black,
  },
  headerRight: {
    marginRight: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: 50,
    alignItems: "center",
    gap: 12,
  },
  greenLine: {
    height: 8,
    borderRadius: 4,
  },
  label: {
    color: colorScheme.grey,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Condensed-Light",
    alignSelf: "flex-start",
  },
  bottomSheetBackground: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  section: {
    backgroundColor: colorScheme.lightGrey,
    padding: 10,
    borderRadius: 6,
  },
  text: {
    color: colorScheme.black,
    fontSize: 22,
    fontFamily: "Condensed-Black",
  },
  title: {
    color: colorScheme.black,
    fontSize: 24,
    fontFamily: "Condensed-Black",
  },
  playersContainer: {
    backgroundColor: colorScheme.grey,
    padding: 10,
    flex: 1,
  },
});
