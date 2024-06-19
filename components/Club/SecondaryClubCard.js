import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImageBackground } from "expo-image";

const SecondaryClubCard = ({ text, backgroundImage }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.8 }]}
    >
      <ImageBackground
        source={backgroundImage}
        style={styles.imageBackground}
        contentFit="cover"
      >
        <View style={styles.overlay} />

        <Text style={styles.text}>{text}</Text>
      </ImageBackground>
    </Pressable>
  );
};

export default SecondaryClubCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    flex: 1,
    height: 100,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Condensed-Black",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    opacity: 0.35,
  },
});
