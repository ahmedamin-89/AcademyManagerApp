import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import Button from "../Buttons/Button";
import colorScheme from "../../constants/colorScheme";
import LightInputField from "../UI/LightInputField";
import DateSelector from "../UI/DateSelector";
import HorizontalSelector from "../UI/HorizontalSelector";
import { ScrollView } from "react-native-gesture-handler";
import RatingAdjuster from "../UI/RatingAdjuster";
import backendURL from "../../constants/backendURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const yearsData = [
  2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
];

const CreateTeamForm = ({ closeBottomSheet }) => {
  const [loading, setLoading] = useState(false);

  const [teamDetails, setTeamDetails] = useState({
    teamName: "",
    yearsOfBirth: [],
  });

  const handleInputChange = (name, text) => {
    setTeamDetails((prevState) => ({
      ...prevState,
      [name]: text,
    }));
  };

  const createTeam = async () => {
    setLoading(true);
    try {
      await axios.post(backendURL + "/teams", teamDetails, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
        },
      });
      closeBottomSheet();
    } catch (error) {
      console.log(error);

      Alert.alert("Error", error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BottomSheetView style={styles.contentContainer}>
      <Text style={styles.text}>Create A Team</Text>
      <LightInputField
        label="Team's Name"
        placeholder="Enter the team's name"
        name="teamName"
        handleInputChange={(name, text) => handleInputChange(name, text)}
      />

      <View style={{ gap: 4, width: "100%" }}>
        <Text style={styles.label}>Years of Birth</Text>
        <HorizontalSelector
          showAllOption={false}
          data={yearsData}
          itemStyle={{ backgroundColor: colorScheme.lightGrey }}
          multipleSelect={true}
          onSelectionChange={(selectedYears) =>
            handleInputChange("yearsOfBirth", selectedYears)
          }
        />
      </View>

      <Button
        text="Create Team"
        onPress={createTeam}
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

export default CreateTeamForm;

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
    marginBottom: 50,
  },
  label: {
    color: colorScheme.grey,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Condensed-Light",
    alignSelf: "flex-start",
  },
});
