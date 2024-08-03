import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import ColorScheme from "../../constants/colorScheme";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AttendanceDateSelector = ({ setSelectedDate, selectedDate }) => {
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
            ? new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
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

export default AttendanceDateSelector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorScheme.white,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    color: ColorScheme.grey,
    fontSize: 20,
    letterSpacing: 1,
    fontFamily: "Condensed-Black",
  },
});
