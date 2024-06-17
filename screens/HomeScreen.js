import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import PlayerCard from "../components/UI/PlayerCard/PlayerCard";
import HomeStats from "../components/Home/HomeStats";
import backgroundImage from "../assets/images/bg.jpg";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.bgImage}
        imageStyle={{ alignSelf: "center" }}
      > */}
      <HomeStats />
      {/* </ImageBackground> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // make the image centered
  },
  bgImage: {
    flex: 1,
  },
});
