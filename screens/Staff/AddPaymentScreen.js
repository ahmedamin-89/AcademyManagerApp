// AddPaymentScreen.js
import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { ScrollView } from "react-native";
import Button from "../../components/Buttons/Button";
import LightInputField from "../../components/UI/LightInputField";
import DateSelector from "../../components/UI/DateSelector";
import HorizontalSelector from "../../components/UI/HorizontalSelector";
import colorScheme from "../../constants/colorScheme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import backendURL from "../../constants/backendURL";
import { UserContext } from "../../context/userContext";
import InputField from "../../components/UI/InputField";

const paymentTypes = ["monthly", "quarterly", "half-yearly", "yearly"];

const AddPaymentScreen = ({ navigation, route }) => {
  const { playerId } = route.params; // Assuming you're passing the playerId via navigation parameters
  const [paymentDetails, setPaymentDetails] = useState({
    amount: "",
    paymentType: "monthly",
    paymentDate: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const { academy } = useContext(UserContext);

  const handleInputChange = (name, value) => {
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const recordPayment = async () => {
    // Input validation
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

  return (
    <View style={styles.container}>
      <InputField
        label="Amount"
        placeholder="Enter payment amount"
        name="amount"
        keyboardType="numeric"
        value={paymentDetails.amount}
        handleInputChange={(name, value) => handleInputChange(name, value)}
      />
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
      <View style={styles.dateContainer}>
        <Text style={styles.label}>Payment Date</Text>
        <DateSelector
          selectedDate={paymentDetails.paymentDate}
          setSelectedDate={(date) => handleInputChange("paymentDate", date)}
        />
      </View>
      <Button
        text="Record Payment"
        onPress={recordPayment}
        loading={loading}
        containerStyle={styles.button}
        textStyle={styles.buttonText}
      />
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
  headerText: {
    color: colorScheme.white,
    fontSize: 24,
    fontFamily: "Condensed-Bold",
    marginBottom: 20,
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
  dateContainer: {
    width: "100%",
    marginBottom: 15,
  },
  button: {
    backgroundColor: colorScheme.green,
    width: "80%",
    marginTop: 20,
  },
  buttonText: {
    color: colorScheme.white,
    fontSize: 18,
  },
});
