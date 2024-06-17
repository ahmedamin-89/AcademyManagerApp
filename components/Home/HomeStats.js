import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NumberStatCard from "./NumberStatCard";
import { Ionicons } from "@expo/vector-icons";

const HomeStats = () => {
  return (
    <View style={styles.container}>
      <NumberStatCard
        title="Players"
        number="25"
        icon={<Ionicons name="people" size={24} color="white" />}
      />
      <NumberStatCard
        title={"Coaches"}
        number={"3"}
        icon={<Ionicons name="people" size={24} color="white" />}
      />
      <NumberStatCard
        title={"Parents"}
        number={"50"}
        icon={<Ionicons name="people" size={24} color="white" />}
      />
      <NumberStatCard
        title={"Teams"}
        number={"3"}
        icon={<Ionicons name="people" size={24} color="white" />}
      />
    </View>
  );
};

export default HomeStats;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
});
