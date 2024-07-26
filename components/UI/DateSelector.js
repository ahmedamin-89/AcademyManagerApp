import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import ColorScheme from "../../constants/colorScheme";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateSelector = ({ setSelectedDate, selectedDate }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(
      new Date(
        new Date(date).toISOString().slice(0, 10) + "T00:00:00.000+00:00"
      )
    );
    hideDatePicker();
  };

  return (
    <>
      <Pressable style={styles.container} onPress={showDatePicker}>
        <Text style={styles.dateText}>
          {selectedDate
            ? new Date(selectedDate).toLocaleDateString()
            : "Select Date"}
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

const toLocalISOString = (date) => {
  const tzOffset = -date.getTimezoneOffset();
  const pad = (n) => (n < 10 ? "0" + n : n);
  const offset =
    pad(Math.floor(Math.abs(tzOffset) / 60)) +
    ":" +
    pad(Math.abs(tzOffset) % 60);

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T00:00:00" +
    offset
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
