import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import PlayerCard from "../components/UI/PlayerCard/PlayerCard";
import HomeStats from "../components/Home/HomeStats";
import backgroundImage from "../assets/images/bg.jpg";

const HomeScreen = () => {
  return (
    <ScrollView contentStyle={styles.container}>
      <HomeStats />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // make the image centered
    padding: 10,
    paddingTop: 20,
  },
  bgImage: {
    flex: 1,
  },
});
