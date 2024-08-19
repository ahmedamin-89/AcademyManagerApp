import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import Picture from "../UI/Picture";
import colorScheme from "../../constants/colorScheme";
import HorizontalSelector from "../UI/HorizontalSelector";
import LightInputField from "../UI/LightInputField";
import Button from "../Buttons/Button";

const TeamEditForm = ({
  image,
  imageUrl,
  pickImage,
  teamDetails,
  handleInputChange,
  updatingInfo,
  storedTeamDetails,
  yearsData,
  updateTeamName,
  deletingTeam,
  deleteTeam,
  arraysEqual,
}) => {
  return (
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
  );
};

export default TeamEditForm;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: 50,
    alignItems: "center",
    gap: 12,
  },
});
