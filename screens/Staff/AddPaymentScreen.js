// AddPaymentScreen.js
import { StyleSheet, Text, View, Alert, FlatList } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Button from "../../components/Buttons/Button";
import HorizontalSelector from "../../components/UI/HorizontalSelector";
import colorScheme from "../../constants/colorScheme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import backendURL from "../../constants/backendURL";
import { UserContext } from "../../context/userContext";
import InputField from "../../components/UI/InputField";
import DateSelector from "../../components/UI/DateSelector";
import PaymentReceipt from "../../components/Financials/PaymentReceipt";

const paymentTypes = ["monthly", "quarterly", "half-yearly", "yearly"];

const AddPaymentScreen = ({ navigation, route }) => {
  const { playerId, playerDiscount } = route.params;
  const { academy } = useContext(UserContext);

  // Correct the initial amount calculation
  const initialAmount = academy.fees * (1 - (playerDiscount || 0) / 100);

  const [paymentDetails, setPaymentDetails] = useState({
    amount: initialAmount.toString(), // Convert to string for TextInput
    paymentType: "monthly",
    paymentDate: new Date(),
  });

  const [loading, setLoading] = useState(false);
  const [prevPayments, setPrevPayments] = useState([]);

  const handleInputChange = (name, value) => {
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchPlayerPayments = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.get(
        `${backendURL}/payments/player/${playerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPrevPayments(response.data.payments);
    } catch (error) {
      console.error(
        "Error fetching player payments:",
        error.response?.data || error.message
      );
      Alert.alert(
        "Error",
        "Failed to fetch player payments. Please try again."
      );
    }
  };

  const recordPayment = async () => {
    if (!paymentDetails.amount) {
      Alert.alert("Validation Error", "Please enter the payment amount.");
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      await axios.post(
        `${backendURL}/payments/${playerId}`,
        {
          ...paymentDetails,
          amount: parseFloat(paymentDetails.amount), // Ensure amount is a number
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Success", "Payment recorded successfully.");
      navigation.goBack();
    } catch (error) {
      console.error(
        "Error recording payment:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to record payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayerPayments();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <View style={{ width: "65%" }}>
          <InputField
            label="Amount"
            placeholder="Enter payment amount"
            name="amount"
            keyboardType="numeric"
            value={paymentDetails.amount}
            handleInputChange={handleInputChange}
          />
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.label}>Payment Date</Text>
          <DateSelector
            selectedDate={paymentDetails.paymentDate}
            setSelectedDate={(date) => handleInputChange("paymentDate", date)}
          />
        </View>
      </View>
      {!!playerDiscount && (
        <Text style={styles.note}>
          Note: This player has a {playerDiscount}% discount.
        </Text>
      )}
      <View style={styles.selectorContainer}>
        <Text style={styles.label}>Payment Type</Text>
        <HorizontalSelector
          data={paymentTypes}
          showAllOption={false}
          onSelectionChange={(selected) =>
            handleInputChange("paymentType", selected[0])
          }
          initialSelection={[paymentDetails.paymentType]}
          itemStyle={{ backgroundColor: colorScheme.lightGrey }}
        />
      </View>

      <Button
        text="Record Payment"
        onPress={recordPayment}
        loading={loading}
        containerStyle={styles.button}
        textStyle={styles.buttonText}
      />

      <View style={styles.separator} />
      <View style={styles.prevPaymentsContainer}>
        <Text style={styles.title}>Previous Payments</Text>
        <FlatList
          style={{ width: "100%" }}
          data={prevPayments}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <PaymentReceipt {...item} />}
        />
      </View>
    </View>
  );
};

export default AddPaymentScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: colorScheme.black,
    flexGrow: 1,
    alignItems: "center",
  },
  inputRow: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
  },
  label: {
    color: colorScheme.white,
    paddingBottom: 8,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Condensed-Light",
  },
  selectorContainer: {
    width: "100%",
    marginVertical: 15,
  },
  dateContainer: {},
  button: {
    backgroundColor: colorScheme.green,
    width: "80%",
    marginTop: 10,
  },
  buttonText: {
    color: colorScheme.white,
    fontSize: 18,
  },
  note: {
    color: colorScheme.white,
    fontSize: 16,
    fontFamily: "Condensed-Light",
    marginTop: 10,
    opacity: 0.75,
    alignSelf: "flex-start",
  },
  separator: {
    height: 0.75,
    width: "100%",
    backgroundColor: colorScheme.lightGrey,
    opacity: 0.2,
    alignSelf: "center",
    marginVertical: 20,
  },
  prevPaymentsContainer: {},
  title: {
    color: colorScheme.white,
    fontSize: 20,
    fontFamily: "Condensed-Black",
    marginBottom: 10,
  },
  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  paymentText: {
    color: colorScheme.white,
    fontSize: 16,
  },
});
