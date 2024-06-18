import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NumberStatCard from "./NumberStatCard";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import coachIcon from "../../assets/icons/coach.png";
import groupIcon from "../../assets/icons/group.png";
import parentsIcon from "../../assets/icons/parents.png";
import playersIcon from "../../assets/icons/soccer-player.png";
const HomeStats = () => {
  return (
    <View style={styles.container}>
      <NumberStatCard
        title="Players"
        number="25"
        icon={<Image source={playersIcon} style={{ width: 40, height: 40 }} />}
      />
      <NumberStatCard
        title={"Coaches"}
        number={"3"}
        icon={<Image source={coachIcon} style={{ width: 32, height: 32 }} />}
      />
      <NumberStatCard
        title={"Parents"}
        number={"50"}
        icon={<Image source={parentsIcon} style={{ width: 36, height: 36 }} />}
      />
      <NumberStatCard
        title={"Teams"}
        number={"3"}
        icon={<Image source={groupIcon} style={{ width: 36, height: 36 }} />}
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
