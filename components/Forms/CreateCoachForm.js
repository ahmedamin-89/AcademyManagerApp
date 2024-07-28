import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import LightInputField from "../UI/LightInputField";
import Button from "../Buttons/Button";
import colorScheme from "../../constants/colorScheme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HorizontalSelector from "../UI/HorizontalSelector";
import { UserContext } from "../../context/userContext";
import backendURL from "../../constants/backendURL";

const CreateCoachForm = ({ closeBottomSheet }) => {
  const [coachDetails, setCoachDetails] = useState({
    name: "",
    phoneNumber: "",
    teams: [],
  });

  const { academy } = useContext(UserContext);
  const teams = academy.teams;
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setCoachDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createCoach = async () => {
    setLoading(true);
    try {
      const teamsIds = coachDetails.teams
        .map((team) => teams.find((t) => t.name === team))
        .map((team) => team._id);
      await axios.post(
        backendURL + "/coaches",
        {
          name: coachDetails.name,
          phoneNumber: coachDetails.phoneNumber,
          teams: teamsIds,
        },
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
          },
        }
      );
      Alert.alert("Success", "Coach has been added successfully");
      closeBottomSheet();
    } catch (error) {
      console.log(error);

      Alert.alert("Error", error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BottomSheetView style={styles.container}>
      <Text style={styles.text}>Add a Coach</Text>
      <LightInputField
        label={"Name"}
        placeholder="Name"
        name={"name"}
        handleInputChange={(name, text) => handleInputChange(name, text)}
      />
      <LightInputField
        label={"Phone Number"}
        placeholder="Phone"
        name={"phoneNumber"}
        handleInputChange={(name, text) => handleInputChange(name, text)}
      />
      <View style={{ gap: 4, width: "100%" }}>
        <Text style={styles.label}>Team</Text>
        <HorizontalSelector
          showAllOption={false}
          data={teams.map((team) => team.name)}
          multipleSelect={true}
          itemStyle={{ backgroundColor: colorScheme.lightGrey }}
          onSelectionChange={(teams) => handleInputChange("teams", teams)}
        />
      </View>

      <Button
        loading={loading}
        onPress={createCoach}
        disabled={
          coachDetails.name === "" ||
          coachDetails.phone === "" ||
          coachDetails.email === ""
        }
        text="Add Coach"
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

export default CreateCoachForm;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: "Condensed-Black",
    color: colorScheme.grey,
  },
  container: {
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
