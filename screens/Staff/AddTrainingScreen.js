import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import colorScheme from "../../constants/colorScheme";
import HorizontalSelector from "../../components/UI/HorizontalSelector";
import StartAndEndDateSelector from "../../components/TeamOverview/StartAndEndDateSelector";
import LightInputField from "../../components/UI/LightInputField";
import InputField from "../../components/UI/InputField";
import Button from "../../components/Buttons/Button";
import axios from "axios";
import backendURL from "../../constants/backendURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const TIME = [
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
];
const AvailableLocations = [
  "New Cairo",
  "Heliopolis",
  "Nasr City",
  "Sheikh Zayed",
  "Al Shorouk",
  "Al Rehab",
  "Maadi",
  "Mokattam",
  "Downtown",
  "6th of October",
];

function getMonthDateRange() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // Note: January is 0, February is 1, and so on.
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0); // Setting day as 0 goes to the last day of the previous month.
  // Convert to ISO String but keep local time
  const toLocalISOString = (date) => {
    const pad = (n) => (n < 10 ? "0" + n : n);
    return new Date(
      date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1) +
        "-" +
        pad(date.getDate()) +
        "T00:00:00Z"
    );
  };

  return {
    startDate: toLocalISOString(firstDayOfMonth),
    endDate: toLocalISOString(lastDayOfMonth),
  };
}

const AddTrainingScreen = ({ navigation, route }) => {
  const [trainingDetails, setTrainingDetails] = useState({
    team: route.params.teamId,
    startTime: "",
    endTime: "",
    location: "",
    dayNames: [],
    area: [],
    location: "",
    startDate: null,
    endDate: null,
  });

  const [availableEndTimes, setAvailableEndTimes] = useState(TIME);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (trainingDetails.startTime) {
      const startTimeIndex = TIME.indexOf(trainingDetails.startTime);
      setAvailableEndTimes(TIME.slice(startTimeIndex + 1));
    }
  }, [trainingDetails.startTime]);

  const [selectedDates, setSelectedDates] = useState(getMonthDateRange());

  const handleInputChange = (name, value) => {
    setTrainingDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const AddTraining = async () => {
    try {
      setLoading(true);
      await axios.post(
        backendURL + "/trainings",
        {
          ...trainingDetails,
          startDate: selectedDates.startDate,
          endDate: selectedDates.endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
          },
        }
      );
      navigation.goBack();
      Alert.alert("Success", "Training added successfully");
    } catch (error) {
      console.log("Error", error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StartAndEndDateSelector
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
      />
      <InputField
        value={trainingDetails.location}
        labelStyle={styles.label}
        label={"Location Name:"}
        placeholder="X FIELD New Cairo"
        name={"location"}
        handleInputChange={(name, text) => handleInputChange(name, text)}
      />
      <View style={{ gap: 4, width: "100%" }}>
        <Text style={styles.label}>Days:</Text>
        <HorizontalSelector
          showAllOption={false}
          data={DAY_NAMES}
          multipleSelect={true}
          itemStyle={{ backgroundColor: colorScheme.lightGrey }}
          onSelectionChange={(days) => handleInputChange("dayNames", days)}
        />
      </View>
      <View style={{ gap: 4, width: "100%" }}>
        <Text style={styles.label}>Area:</Text>
        <HorizontalSelector
          showAllOption={false}
          data={AvailableLocations}
          multipleSelect={false}
          itemStyle={{ backgroundColor: colorScheme.lightGrey }}
          onSelectionChange={(area) => handleInputChange("area", area[0])}
        />
      </View>
      <View style={{ gap: 4, width: "100%" }}>
        <Text style={styles.label}>Starting Time:</Text>
        <HorizontalSelector
          showAllOption={false}
          data={TIME}
          itemStyle={{ backgroundColor: colorScheme.lightGrey }}
          onSelectionChange={(time) => handleInputChange("startTime", time[0])}
        />
      </View>
      <View style={{ gap: 4, width: "100%" }}>
        <Text style={styles.label}>Ending Time:</Text>
        <HorizontalSelector
          showAllOption={false}
          data={availableEndTimes}
          itemStyle={{ backgroundColor: colorScheme.lightGrey }}
          onSelectionChange={(time) => handleInputChange("endTime", time[0])}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          loading={loading}
          onPress={AddTraining}
          text="Add Training"
          textStyle={{ color: colorScheme.white, fontSize: 22 }}
          containerStyle={{
            backgroundColor: colorScheme.green,
            marginTop: "auto",
            marginHorizontal: 5,
          }}
          disabled={
            !(
              trainingDetails.location &&
              trainingDetails.startTime &&
              trainingDetails.endTime &&
              trainingDetails.dayNames.length > 0 &&
              selectedDates.startDate &&
              selectedDates.endDate
            )
          }
        />
      </View>
    </View>
  );
};

export default AddTrainingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorScheme.black,
    flex: 1,
    padding: 10,
    gap: 10,
  },
  label: {
    color: colorScheme.white,
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Condensed-Light",
    alignSelf: "flex-start",
  },
  buttonContainer: {
    paddingTop: 20,
    width: "100%",
  },
});
