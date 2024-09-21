import { Modal, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import Button from "../Buttons/Button";
import colorScheme from "../../constants/colorScheme";
import PieChart from "react-native-pie-chart";
import MonthPicker from "react-native-month-year-picker";
import { format } from "date-fns"; // Import date-fns

const PaymentStatusHomeCard = () => {
  const widthAndHeight = 120;
  const series = [321, 123];
  const sliceColor = ["#6fedb7", "#2dd881"];
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const showPicker = useCallback((value) => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
      console.log("Selected Date:", selectedDate);
    },
    [date, showPicker]
  );

  // Format the date for display
  const formattedDate = format(date, "MMMM, yy");

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Acquired Payments</Text>
          <Button
            containerStyle={styles.button}
            textStyle={styles.buttonText}
            text={formattedDate} // Use the formatted date here
            onPress={() => showPicker(true)}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.bodyText}>
            <Text style={[styles.bodyText]}>Paid: 321</Text>
            <Text style={[styles.bodyText]}>Unpaid: 123</Text>
            <Text style={[styles.bodyText]}>Total: 444</Text>
          </View>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
          />
        </View>
      </View>
      {show && (
        <View style={styles.pickerContainer}>
          <MonthPicker onChange={onValueChange} value={date} locale="en" />
        </View>
      )}
    </>
  );
};

export default PaymentStatusHomeCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Condensed-Black",
  },
  button: {
    backgroundColor: "#dee2e6",
    padding: 10,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: "Condensed-Black",
    color: "#495057",
    fontSize: 16,
  },
  body: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 30,
  },
  bodyText: {
    fontFamily: "Condensed-Black",
    fontSize: 18,
    color: "#495057",
    gap: 2,
  },
  pickerContainer: {
    position: "absolute",
    zIndex: 10000,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
