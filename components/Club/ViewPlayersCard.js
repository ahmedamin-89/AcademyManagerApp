import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import kids from "../../assets/images/hussein.jpeg";

const ViewPlayersCard = () => {
  return (
    <Pressable style={styles.container}>
      <ImageBackground
        source={kids}
        style={styles.imageBackground}
        resizeMode="cover"
        imageStyle={{ alignSelf: "flex-end" }}
      >
        <View style={styles.overlay} />
        <Text style={styles.text}>View Players</Text>
      </ImageBackground>
    </Pressable>
  );
};

export default ViewPlayersCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e1e1e",
    height: 220,
    borderRadius: 24,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
  },
  imageBackground: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    opacity: 0.35,
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Ultra-Condensed-Black",
  },
});
