import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import colorScheme from "../../../constants/colorScheme";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/starsAcademyLogo.png")}
          style={styles.logo}
          contentFit="contain"
        />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.academyName}>Stars F.C.</Text>
        <Text style={styles.estDate}>Est. 2010</Text>
      </View>
      <View style={styles.notificationContainer}>
        <Ionicons name="notifications" size={30} color="white" />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 130,
    paddingHorizontal: 10,
    paddingTop: 54,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    paddingBottom: 5,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  logoContainer: {
    width: "17%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  academyName: {
    fontFamily: "Ultra-Condensed-Bold",
    fontSize: 27,
    color: "white",
    marginLeft: 10,
    textTransform: "uppercase",
  },
  estDate: {
    fontFamily: "Condensed-Light",
    color: "white",
    marginLeft: 10,
  },
  notificationContainer: {
    justifyContent: "center",
    marginLeft: "auto",
    paddingRight: 30,
  },
});
