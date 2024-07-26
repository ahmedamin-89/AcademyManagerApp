import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import React from "react";
import placeholder from "../../assets/images/hussein.png";
import { Ionicons } from "@expo/vector-icons";
import colorScheme from "../../constants/colorScheme";
const Picture = ({ uri, pickImage }) => {
  return (
    <View style={{ alignSelf: "center" }}>
      {uri && <Image source={{ uri }} style={styles.image} />}
      {!uri && (
        <Pressable style={styles.image} onPress={pickImage}>
          <View style={{ marginBottom: 10 }}>
            <Ionicons
              name="person"
              style={{ alignSelf: "center" }}
              size={130}
              color={colorScheme.grey}
            />
          </View>
        </Pressable>
      )}
      <Pressable
        style={({ pressed }) => [
          styles.cameraIcon,
          pressed && { opacity: 0.9 },
        ]}
        onPress={pickImage}
      >
        <Ionicons
          name="camera"
          style={{}}
          size={38}
          color={colorScheme.black}
        />
      </Pressable>
    </View>
  );
};

export default Picture;

const styles = StyleSheet.create({
  image: {
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: colorScheme.lightGrey,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 10,
    right: 2,
    backgroundColor: colorScheme.lightGrey,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
