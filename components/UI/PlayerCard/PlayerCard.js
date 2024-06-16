import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import card from "../../../assets/images/goldCard.webp";
import aliImage from "../../../assets/images/ali.png";

const PlayerCard = () => {
  return (
    <View
      style={{
        width: 135 * 2,
        height: 183 * 2,
        overflow: "hidden",
      }}
    >
      <ImageBackground
        source={card}
        style={styles.imageBackground}
        resizeMode="contain"
      >
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.topLeftView}>
              <Text style={styles.overallRating}>91</Text>
              <Text style={styles.position}>ST</Text>
            </View>
            <Image source={aliImage} style={styles.playerImage} />
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.playerName}>Ali Mohamed</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default PlayerCard;

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    marginHorizontal: "9%",
    marginVertical: "7%",
  },
  topContainer: {
    width: "100%",
    height: "65%",
    paddingBottom: "1%",
  },
  bottomContainer: {
    width: "100%",
    height: "35%",
    alignItems: "center",
    flexDirection: "column",
    padding: "3%",
  },
  playerImage: {
    marginLeft: "auto",
    marginTop: "auto",
    width: "100%",
    height: "95%",
    objectFit: "contain",
  },
  playerName: {
    fontSize: "20%",
    fontWeight: "800",
  },
  topLeftView: {
    position: "absolute",
    top: "17%",
    left: "8%",
    alignItems: "center",
  },
  overallRating: {
    fontSize: "30%",
    fontWeight: "800",
    color: "white",
  },
  position: {
    fontSize: "14%",
    fontWeight: "800",
    color: "white",
  },
});
