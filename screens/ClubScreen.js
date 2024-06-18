import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import ViewPlayersCard from "../components/Club/ViewPlayersCard";
import SecondaryClubCard from "../components/Club/SecondaryClubCard";
import backgroundImage from "../assets/images/bg.png";
const ClubScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={{ flex: 1, padding: 20, gap: 20 }}
        imageStyle={{ alignSelf: "center" }}
      >
        <ViewPlayersCard />
        <View style={styles.secondaryCards}>
          <SecondaryClubCard text="Teams" />
          <SecondaryClubCard text="Coaches" />
        </View>
      </ImageBackground>
    </View>
  );
};

export default ClubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondaryCards: {
    flexDirection: "row",
    gap: 20,
  },
});
