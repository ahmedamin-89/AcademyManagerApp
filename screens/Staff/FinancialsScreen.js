import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import colorScheme from "../../constants/colorScheme";
import HorizontalSelector from "../../components/UI/HorizontalSelector";
import Button from "../../components/Buttons/Button";
import { FlatList } from "react-native-gesture-handler";
import FiPlayerCard from "../../components/Financials/FiPlayerCard";
import SearchBar from "../../components/UI/SearchBar";
import { UserContext } from "../../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import backendURL from "../../constants/backendURL";

const FinancialsScreen = ({ navigation }) => {
  const { academy } = useContext(UserContext);
  const teams = academy.teams;
  const [loading, setLoading] = useState(false);
  const [financialData, setFinancialData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamChange = (selectedTeam) => {
    const teamId = teams.find((team) => team.name === selectedTeam)?._id;

    setSelectedTeam(teamId);
  };

  const statusData = ["Paid", "Unpaid"];

  const fetchFinancialData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendURL}/payments/status/${academy._id}`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
          },
        }
      );
      setFinancialData(response.data.paymentStatusList);
    } catch (error) {
      console.error("Error fetching financial data:", error.response.data);
    } finally {
      setLoading(false);
    }
  };

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
    fetchFinancialData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar style={{ width: "82%" }} />

        <Button
          textStyle={{ fontSize: 16 }}
          containerStyle={{ height: "100%", justifyContent: "center" }}
          text={date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        />
      </View>
      <View style={{ flexDirection: "column", gap: 10 }}>
        <HorizontalSelector
          data={teams.map((team) => team.name)}
          itemStyle={{ backgroundColor: colorScheme.lightGrey }}
          onSelectionChange={(selectedTeam) =>
            handleTeamChange(selectedTeam[0])
          }
        />
        <HorizontalSelector data={statusData} />
      </View>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={financialData}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <FiPlayerCard
              name={item.name}
              paid={item.paid}
              dueDate={item.dueDate}
              amountPaid={item.amountPaid}
              amountDue={item.amountDue}
            />
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default FinancialsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colorScheme.black,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 55,
  },
  contentContainerStyle: {
    gap: 1.5,
    backgroundColor: "white",
  },
});
