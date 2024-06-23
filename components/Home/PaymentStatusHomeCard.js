import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../Buttons/Button";
import colorScheme from "../../constants/colorScheme";
import PieChart from "react-native-pie-chart";

const PaymentStatusHomeCard = () => {
  const widthAndHeight = 120;
  const series = [321, 123];
  const sliceColor = ["#6fedb7", "#2dd881"];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Aquired Payments</Text>
        <Button
          containerStyle={styles.button}
          textStyle={styles.buttonText}
          text="June, 24"
        />
      </View>
      <View style={styles.body}>
        <View style={styles.bodyText}>
          <Text style={[styles.bodyText]}>Paid: 321</Text>
          <Text style={[styles.bodyText]}>Unpaid: 123</Text>
        </View>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
        />
      </View>
    </View>
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
});
