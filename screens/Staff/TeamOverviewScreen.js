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
import TrainingDetailCard from "../../components/Club/TrainingDetailCard";
import PlayerSearchCard from "../../components/Club/PlayerSearchCard";
import TeamPlayersOverviewHeader from "../../components/TeamOverview/TeamPlayersOverviewHeader";
import NoTrainingsView from "../../components/TeamOverview/NoTrainingsView";
import AddTrainingButton from "../../components/TeamOverview/AddTrainingButton";
import TeamEditForm from "../../components/Forms/TeamEditForm";
import SheetBackdrop from "../../components/BottomSheets/SheetBackdrop";
import TeamTrainingsList from "../../components/TeamOverview/TeamTrainingsList";
import { ScrollView } from "react-native";
import IconButton from "../../components/Buttons/IconButton";
import { Ionicons } from "@expo/vector-icons";
import TeamAttendanceStats from "../../components/TeamOverview/TeamAttendanceStats";

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

  const [trainingDetails, setTrainingDetails] = useState([]);

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

  const fetchTrainingDetails = async () => {
    try {
      const response = await axios.get(`${backendURL}/trainings/${_id}`, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
        },
      });
      setTrainingDetails(response.data.trainings);
    } catch (error) {
      console.error("Failed to fetch training:", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <MenuButton onPress={openBottomSheet} />,
    });
    fetchTrainingDetails();
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
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ gap: 14, paddingBottom: 60 }}
        horizontal={false}
      >
        <View style={styles.section}>
          <Text style={styles.title}>Training Details</Text>
          <TeamTrainingsList trainingDetails={trainingDetails} teamId={_id} />
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Assigned Coaches</Text>
          <FlatList
            data={coaches}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <CoachTeamCard name={item.name} team={item} />
            )}
            contentContainerStyle={styles.coachesListContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <TeamAttendanceStats teamId={_id} />

        <IconButton
          icon={<Ionicons name="people" size={28} color="white" />}
          text="Players Overview"
          style={styles.button}
          onPress={() => navigation.navigate("TeamPlayers", { teamId: _id })}
        />
        <IconButton
          icon={<Ionicons name="contract-outline" size={28} color="white" />}
          text="Client Leads"
          style={styles.button}
          onPress={() => navigation.navigate("TeamPlayers", { teamId: _id })}
        />
      </ScrollView>
      {/* Edit Form */}
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
          <SheetBackdrop
            onPress={() => {
              bottomSheetModalRef.current?.dismiss();
            }}
          />
        )}
      >
        <TeamEditForm
          image={image}
          imageUrl={imageUrl}
          pickImage={pickImage}
          teamDetails={teamDetails}
          handleInputChange={handleInputChange}
          updatingInfo={updatingInfo}
          storedTeamDetails={storedTeamDetails}
          yearsData={yearsData}
          updateTeamName={updateTeamName}
          deletingTeam={deletingTeam}
          deleteTeam={deleteTeam}
          arraysEqual={arraysEqual}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default TeamOverviewScreen;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colorScheme.black,
  },
  headerRight: {
    marginRight: 20,
  },
  ScreenContainer: {
    backgroundColor: colorScheme.black,
  },

  greenLine: {
    height: 1,
    backgroundColor: colorScheme.green,
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
    width: "100%",
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
    flex: 1,
    backgroundColor: colorScheme.black,
  },
  coachesListContainer: {
    gap: 10,
    paddingVertical: 10,
    overflow: "visible",
    width: "100%",
  },
  button: {
    width: "98%",
    alignSelf: "center",
  },
});
