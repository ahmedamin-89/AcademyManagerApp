import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import kids from "../../assets/images/hussein.png";

const ViewPlayersCard = ({}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.8 }]}
    >
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,
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
    fontSize: 44,
    fontWeight: "bold",
    fontFamily: "Ultra-Condensed-Black",
  },
});
