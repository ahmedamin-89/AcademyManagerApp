import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const AddPaymentScreen = ({ navigation }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    amount: 0,
  });

  return <View style={styles.container}></View>;
};

export default AddPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: colorScheme.black,
  },
  text: {
    color: colorScheme.white,
    fontSize: 17.5,
    fontFamily: "Condensed-Light",
  },
});
