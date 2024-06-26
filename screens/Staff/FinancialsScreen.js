import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import colorScheme from "../../constants/colorScheme";
import HorizontalSelector from "../../components/UI/HorizontalSelector";
import Button from "../../components/Buttons/Button";
import { FlatList } from "react-native-gesture-handler";
import FiPlayerCard from "../../components/Financials/FiPlayerCard";
import SearchBar from "../../components/UI/SearchBar";

const players = [
  {
    name: "John Doe",
    paid: true,
    dueDate: "2024-06-01T00:00:00.000Z",
    interval: 1,
    amount: 1000,
  },
  {
    name: "Jane Smith",
    paid: false,
    dueDate: "2024-06-05T00:00:00.000Z",
    interval: 2,
    amount: 1500,
  },
  {
    name: "Alice Johnson",
    paid: true,
    dueDate: "2024-06-10T00:00:00.000Z",
    interval: 1,
    amount: 2000,
  },
  {
    name: "Bob Brown",
    paid: false,
    dueDate: "2024-06-15T00:00:00.000Z",
    interval: 3,
    amount: 2500,
  },
  {
    name: "Charlie Davis",
    paid: true,
    dueDate: "2024-06-20T00:00:00.000Z",
    interval: 1,
    amount: 1200,
  },
  {
    name: "Diana Evans",
    paid: false,
    dueDate: "2024-06-25T00:00:00.000Z",
    interval: 2,
    amount: 1300,
  },
  {
    name: "Frank Garcia",
    paid: true,
    dueDate: "2024-06-30T00:00:00.000Z",
    interval: 1,
    amount: 1700,
  },
  {
    name: "Gina Harris",
    paid: false,
    dueDate: "2024-06-01T00:00:00.000Z",
    interval: 3,
    amount: 1800,
  },
  {
    name: "Henry Jackson",
    paid: true,
    dueDate: "2024-06-05T00:00:00.000Z",
    interval: 1,
    amount: 1900,
  },
  {
    name: "Charlie Davis",
    paid: true,
    dueDate: "2024-06-20T00:00:00.000Z",
    interval: 1,
    amount: 1200,
  },
  {
    name: "Diana Evans",
    paid: false,
    dueDate: "2024-06-25T00:00:00.000Z",
    interval: 2,
    amount: 1300,
  },
  {
    name: "Frank Garcia",
    paid: true,
    dueDate: "2024-06-30T00:00:00.000Z",
    interval: 1,
    amount: 1700,
  },
  {
    name: "Gina Harris",
    paid: false,
    dueDate: "2024-06-01T00:00:00.000Z",
    interval: 3,
    amount: 1800,
  },
  {
    name: "Henry Jackson",
    paid: true,
    dueDate: "2024-06-05T00:00:00.000Z",
    interval: 1,
    amount: 1900,
  },
];

const FinancialsScreen = ({ navigation }) => {
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={{ marginRight: 12 }}>
          <Text style={{ color: "#Fff", fontFamily: "Condensed-Light" }}>
            Send Reminder
          </Text>
        </Pressable>
      ),
    });
  }, []);

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
      <SearchBar />
      <HorizontalSelector data={TeamsData} />
      <HorizontalSelector data={statusData} />
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={players}
        renderItem={({ item }) => (
          <FiPlayerCard
            name={item.name}
            paid={item.paid}
            dueDate={item.dueDate}
            interval={item.interval}
            amount={item.amount}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default FinancialsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colorScheme.black,
    gap: 12,
  },
  contentContainerStyle: {
    gap: 1.5,
    backgroundColor: "white",
  },
});
