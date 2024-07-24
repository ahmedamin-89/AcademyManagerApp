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

const TeamCard = ({ name, _id, team }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("TeamOverview", {
          ...team,
        })
      }
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.8 }]}
    >
      <ImageBackground
        source={{ uri: team.imageUrl }}
        style={styles.imageBackground}
        resizeMode="cover"
        imageStyle={{ alignSelf: "flex-end" }}
      >
        <View style={styles.overlay} />
        <Text style={styles.text}>{name}</Text>
      </ImageBackground>
    </Pressable>
  );
};

export default TeamCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e1e1e",
    height: 160,
    borderRadius: 6,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageBackground: {
    flex: 1,
    borderRadius: 6,
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
    fontSize: 48,
    fontWeight: "bold",
    fontFamily: "Ultra-Condensed-Black",
  },
});
