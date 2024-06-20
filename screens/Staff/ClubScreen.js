import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import SecondaryClubCard from "../../components/Club/SecondaryClubCard";
import coachBackgroundImage from "../../assets/images/coaches.png";
import teamBackgroundImage from "../../assets/images/teamPic.png";
import ViewPlayersCard from "../../components/Club/ViewPlayersCard";

const ClubScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ViewPlayersCard />
      <View style={styles.secondaryCards}>
        <SecondaryClubCard
          onPress={() => navigation.navigate("Teams")}
          backgroundImage={teamBackgroundImage}
          text="Teams"
        />
        <SecondaryClubCard
          onPress={() => navigation.navigate("Coaches")}
          backgroundImage={coachBackgroundImage}
          text="Coaches"
        />
      </View>
    </View>
  );
};

export default ClubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    gap: 20,
  },
  secondaryCards: {
    flexDirection: "row",
    gap: 20,
  },
});
