import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";
import React, {
  useContext,
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from "react";
import colorScheme from "../../constants/colorScheme";
import HorizontalSelector from "../../components/UI/HorizontalSelector";
import Button from "../../components/Buttons/Button";
import FiPlayerCard from "../../components/Financials/FiPlayerCard";
import SearchBar from "../../components/UI/SearchBar";
import { UserContext } from "../../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import backendURL from "../../constants/backendURL";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DataStatus from "../../components/UI/DataStatus";

const FinancialsScreen = ({ navigation }) => {
  const { academy } = useContext(UserContext);
  const teams = academy.teams;
  const [loading, setLoading] = useState(false);
  const [financialData, setFinancialData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleTeamChange = (selectedTeamName) => {
    const team = teams.find((team) => team.name === selectedTeamName);
    setSelectedTeam(team ? team._id : null);
  };

  const statusData = ["Paid", "Unpaid"];

  const fetchFinancialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${backendURL}/payments/status/${academy._id}`,
        {
          params: {
            date: selectedDate.toISOString(),
            teamId: selectedTeam,
            search: searchQuery,
            status: selectedStatus,
          },
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
          },
        }
      );

      setFinancialData(response.data.paymentStatusList);
    } catch (error) {
      console.error("Error fetching financial data:", error);
      setError(
        error?.response?.data?.error || "Failed to fetch financial data"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFinancialData();
  }, [selectedDate, selectedTeam, searchQuery, selectedStatus]);

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
  }, [navigation]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFinancialData();
  }, [selectedDate, selectedTeam, searchQuery, selectedStatus]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          style={{ width: "82%" }}
        />

        <Button
          onPress={() => setDatePickerVisibility(true)}
          textStyle={{ fontSize: 16 }}
          containerStyle={{ justifyContent: "center" }}
          text={selectedDate.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        />
      </View>

      <View style={{ flexDirection: "column", gap: 10 }}>
        <HorizontalSelector
          data={teams.map((team) => team.name)}
          itemStyle={{ backgroundColor: colorScheme.lightGrey }}
          onSelectionChange={(selectedTeamName) =>
            handleTeamChange(selectedTeamName[0])
          }
        />
        <HorizontalSelector
          data={statusData}
          itemStyle={{ backgroundColor: colorScheme.lightGrey }}
          onSelectionChange={(selectedStatus) =>
            setSelectedStatus(selectedStatus[0])
          }
        />
      </View>

      <View style={styles.container}>
        {loading || error || financialData.length === 0 ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <DataStatus
              error={error}
              loading={loading}
              fetchData={fetchFinancialData}
              noData={
                !loading &&
                !error &&
                financialData.length === 0 &&
                searchQuery === ""
              }
              text={
                loading
                  ? "Loading financial data..."
                  : searchQuery
                  ? "No players match your search"
                  : "No financial data found"
              }
            />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            data={financialData}
            renderItem={({ item }) => (
              <FiPlayerCard
                name={item.name}
                paid={item.paid}
                dueDate={item.nextDueDate}
                amountPaid={item.amountPaid}
                amountDue={item.amountDue}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[colorScheme.white]}
                tintColor={colorScheme.white}
                size={"large"}
              />
            }
          />
        )}
      </View>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={selectedDate}
        onConfirm={(newDate) => {
          setSelectedDate(newDate);
          setDatePickerVisibility(false);
        }}
        onCancel={() => setDatePickerVisibility(false)}
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
    paddingHorizontal: 20,
  },
  contentContainerStyle: {
    gap: 1.5,
    backgroundColor: "white",
  },
});
