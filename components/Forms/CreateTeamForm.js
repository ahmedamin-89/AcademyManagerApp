import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import Button from "../Buttons/Button";
import colorScheme from "../../constants/colorScheme";
import LightInputField from "../UI/LightInputField";
import DateSelector from "../UI/DateSelector";
import HorizontalSelector from "../UI/HorizontalSelector";
import { ScrollView } from "react-native-gesture-handler";
import RatingAdjuster from "../UI/RatingAdjuster";

const yearsData = [
  2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
];

const CreateTeamForm = () => {
  const [loading, setLoading] = useState(false);

  const [teamDetails, setTeamDetails] = useState({
    teamName: "",
    years: [],
  });

  const handleInputChange = (name, text) => {
    setTeamDetails((prevState) => ({
      ...prevState,
      [name]: text,
    }));
  };

  useEffect(() => {
    console.log(teamDetails);
  }, [teamDetails]);

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
            handleInputChange("years", selectedYears)
          }
        />
      </View>

      <Button
        text="Create Team"
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
