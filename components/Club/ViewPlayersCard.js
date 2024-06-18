import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import kids from "../../assets/images/hussein.png";
import { useNavigation } from "@react-navigation/native";

const ViewPlayersCard = ({}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("Players")}
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
    height: 210,
    borderRadius: 13,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageBackground: {
    flex: 1,
    borderRadius: 13,
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
