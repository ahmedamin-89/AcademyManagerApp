import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import ColorScheme from "../../constants/colorScheme";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import colorScheme from "../../constants/colorScheme";
const AttendanceDateSelector = ({
  setSelectedDate,
  selectedDate,
  incrementDate,
  decrementDate,
}) => {
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
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        gap: 7,
        justifyContent: "center",
      }}
    >
      <Pressable
        onPress={decrementDate}
        style={({ pressed }) => [
          styles.buttonContainer,
          pressed && { opacity: 0.85 },
        ]}
      >
        <Ionicons name="chevron-back" size={24} color={colorScheme.black} />
      </Pressable>
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
      <Pressable
        style={({ pressed }) => [
          styles.buttonContainer,
          pressed && { opacity: 0.85 },
        ]}
        onPress={incrementDate}
      >
        <Ionicons name="chevron-forward" size={24} color={colorScheme.black} />
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default AttendanceDateSelector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorScheme.white,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    width: "79.5%",
  },
  dateText: {
    color: ColorScheme.grey,
    fontSize: 18,
    letterSpacing: 1,
    fontFamily: "Condensed-Black",
  },
  buttonContainer: {
    backgroundColor: ColorScheme.white,
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
