import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import Button from "../Buttons/Button";
import colorScheme from "../../constants/colorScheme";
import LightInputField from "../UI/LightInputField";
import DateSelector from "../UI/DateSelector";
import HorizontalSelector from "../UI/HorizontalSelector";
import { ScrollView } from "react-native-gesture-handler";
import RatingAdjuster from "../UI/RatingAdjuster";
import { UserContext } from "../../context/userContext";

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

const AddPlayerForm = () => {
  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  });
  const { academy } = useContext(UserContext);
  const teams = academy.teams;

  const [PlayerDetails, setPlayerDetails] = useState({
    playerName: "",
    parentName: "",
    parentPhone: "",
    playerPhone: "",
    DOB: "",
    position: "",
    team: "",
    rating: 70,
  });

  const handleInputChange = (name, value) => {
    setPlayerDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePositionChange = (selectedPositions) => {
    handleInputChange("position", selectedPositions);
  };

  const handleTeamChange = (selectedTeam) => {
    const teamId = teams.find((team) => team.name === selectedTeam)._id;
    handleInputChange("team", teamId);
  };

  return (
    <BottomSheetView style={styles.contentContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.text}>Create A Player</Text>
        <LightInputField
          label="Player's Name"
          placeholder="Enter the player's name"
          handleInputChange={(name, text) => handleInputChange(name, text)}
        />
        <LightInputField
          label="Parent's Name"
          placeholder="Enter the parent's name"
          handleInputChange={(name, text) => handleInputChange(name, text)}
        />
        <LightInputField
          label="Parent's Phone"
          placeholder="Enter the parent's phone number"
          handleInputChange={(name, text) => handleInputChange(name, text)}
        />
        <LightInputField
          label="Player's Phone"
          placeholder="Enter the player's phone number"
          handleInputChange={(name, text) => handleInputChange(name, text)}
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
            onSelectionChange={(selectedTeam) =>
              handleTeamChange(selectedTeam[0])
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
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />
        </View>
      </ScrollView>

      <Button
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
