import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import Button from "../Buttons/Button";
import colorScheme from "../../constants/colorScheme";
import LightInputField from "../UI/LightInputField";

const AddPlayerForm = () => {
  const [PlayerDetails, setPlayerDetails] = useState({
    name: "",
    age: "",
    position: "",
    team: "",
  });

  const handleInputChange = (name, text) => {
    setPlayerDetails((prevState) => ({
      ...prevState,
      [name]: text,
    }));
  };

  return (
    <BottomSheetView style={styles.contentContainer}>
      <Text style={styles.text}>Create A Player</Text>
      <LightInputField
        label="Full Name"
        placeholder="Enter the player's name"
        handleInputChange={handleInputChange}
      />
      <Text style={styles.label}>Position</Text>
      <Text style={styles.label}>Date of Birth</Text>
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
  },
  contentContainer: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    gap: 15,
    marginBottom: 60,
  },
  label: {
    color: colorScheme.grey,
    paddingBottom: 4,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Condensed-Light",
    alignSelf: "flex-start",
  },
});
