import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import HomeStats from "../../components/Home/HomeStats";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../../components/Buttons/IconButton";
import PaymentStatusHomeCard from "../../components/Home/PaymentStatusHomeCard";

const StaffDashboard = ({ navigation }) => {
  return (
    <ScrollView style={styles.scrollView} contentStyle={styles.container}>
      <HomeStats />
      <PaymentStatusHomeCard />
      <IconButton
        onPress={() => navigation.navigate("Financials")}
        icon={<Ionicons name="cash" size={26} color="white" />}
        text="Financials"
        style={styles.button}
      />
      <IconButton
        icon={<Ionicons name="checkbox" size={24} color="white" />}
        text="Attendance"
        style={styles.button}
        onPress={() => navigation.navigate("AttendanceDashboard")}
      />
    </ScrollView>
  );
};

export default StaffDashboard;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    // justifyContent: "center",
    // make the image centeredd
    padding: 10,
    paddingTop: 20,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  bgImage: {
    flex: 1,
  },
  button: {
    marginTop: 16,
    width: "98%",
    alignSelf: "center",
  },
});
