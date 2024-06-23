import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import HorizontalSelector from "../../components/UI/HorizontalSelector";
import Button from "../../components/Buttons/Button";

const FinancialsScreen = () => {
  const TeamsData = [
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
  ];
  const statusData = ["Paid", "Unpaid"];

  const playerObject = {
    name: "John Doe",
    paid: true,
    dueDate: new Date(2024, 5, 1),
    interval: 1,
    amount: 1000,
  };
  return (
    <View style={styles.container}>
      <Button text="June, 2024" />
      <HorizontalSelector data={TeamsData} />
      <HorizontalSelector data={statusData} />
    </View>
  );
};

export default FinancialsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colorScheme.black,
    gap: 10,
  },
});
