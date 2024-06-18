import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import HomeStats from "../../components/Home/HomeStats";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../../components/Buttons/IconButton";

const StaffDashboard = () => {
  return (
    <ScrollView style={styles.scrollView} contentStyle={styles.container}>
      <HomeStats />
      <IconButton
        icon={<Ionicons name="notifications" size={28} color="white" />}
        text="Send a Notification"
        style={styles.button}
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
    marginVertical: 20,
    width: "98%",
    alignSelf: "center",
  },
});
