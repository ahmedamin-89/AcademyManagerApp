import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import ColorScheme from "../../constants/colorScheme";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colorScheme from "../../constants/colorScheme";

const StartAndEndDateSelector = ({ setSelectedDates, selectedDates }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartDatePicker, setIsStartDatePicker] = useState(true); // New state to track if we're picking a start date
  const showDatePicker = (isStartDate) => {
    setIsStartDatePicker(isStartDate); // Set whether it's start or end date being picked
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // Update the selectedDates based on whether it's start or end date
    if (isStartDatePicker) {
      setSelectedDates({ ...selectedDates, startDate: toLocalISOString(date) });
    } else {
      setSelectedDates({ ...selectedDates, endDate: toLocalISOString(date) });
    }

    hideDatePicker();
  };

  return (
    <View>
      <View style={styles.container}>
        <Pressable
          style={styles.dateButton}
          onPress={() => showDatePicker(true)}
        >
          <Text style={[styles.label]}>Start Date</Text>
          <Text style={styles.dateText}>
            {new Date(selectedDates.startDate).toLocaleDateString("en-US", {
              weekday: "short",
              day: "2-digit",
              month: "short",
            })}
          </Text>
        </Pressable>
        <Pressable
          style={styles.dateButton}
          onPress={() => showDatePicker(false)}
        >
          <Text style={[styles.label]}>End Date</Text>
          <Text style={styles.dateText}>
            {new Date(selectedDates.endDate).toLocaleDateString("en-US", {
              weekday: "short",
              day: "2-digit",
              month: "short",
            })}
          </Text>
        </Pressable>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
};

export default StartAndEndDateSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    gap: 10,
  },
  dateButton: {
    backgroundColor: "white",
    paddingVertical: 6,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
    gap: 0,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  label: {
    color: colorScheme.black,
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Condensed-Light",
  },

  dateText: {
    color: ColorScheme.grey,
    fontSize: 19,
    fontFamily: "Condensed-Black",
  },
});

const toLocalISOString = (date) => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? "+" : "-";
  const pad = (n) => (n < 10 ? "0" + n : n);
  const offset =
    pad(Math.floor(Math.abs(tzOffset) / 60)) +
    ":" +
    pad(Math.abs(tzOffset) % 60);

  return new Date(
    date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T00:00:00Z"
  );
};
