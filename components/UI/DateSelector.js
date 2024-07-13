import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import ColorScheme from "../../constants/colorScheme";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateSelector = ({ setSelectedDates, selectedDates }) => {
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
    <>
      <Pressable style={styles.container} onPress={() => showDatePicker(false)}>
        <Text style={styles.dateText}>
          {new Date(selectedDates.endDate).toLocaleDateString()}
        </Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorScheme.lightGrey,
    alignSelf: "flex-start",
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  dateText: {
    color: ColorScheme.black,
    fontSize: 18,
    letterSpacing: 1,
    fontFamily: "Condensed-Light",
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
