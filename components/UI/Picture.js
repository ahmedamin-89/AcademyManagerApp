import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import React from "react";
import placeholder from "../../assets/images/hussein.png";
import { Ionicons } from "@expo/vector-icons";
import colorScheme from "../../constants/colorScheme";
const Picture = ({
  uri,
  pickImage = () => {},
  scale = 1,
  allowEditing = true,
}) => {
  return (
    <View style={{ alignSelf: "center" }}>
      {uri && (
        <Image
          source={{ uri }}
          style={[
            styles.image,
            scale && {
              width: 210 * scale,
              height: 210 * scale,
              borderRadius: 105 * scale,
            },
          ]}
        />
      )}
      {!uri && (
        <Pressable
          style={[
            styles.image,
            scale && {
              width: 210 * scale,
              height: 210 * scale,
              borderRadius: 105 * scale,
            },
          ]}
          onPress={() => {
            if (allowEditing) {
              pickImage();
            }
          }}
        >
          <View style={allowEditing && { marginBottom: 10 }}>
            <Ionicons
              name="person"
              style={{ alignSelf: "center" }}
              size={scale ? 130 * scale : 130}
              color={colorScheme.grey}
            />
          </View>
        </Pressable>
      )}
      {allowEditing && (
        <Pressable
          style={({ pressed }) => [
            styles.cameraIcon,
            scale && {
              width: 55 * scale,
              height: 55 * scale,
              borderRadius: 27.5 * scale,
            },
            pressed && { opacity: 0.9 },
          ]}
          onPress={pickImage}
        >
          <Ionicons
            name="camera"
            style={{}}
            size={scale * 38}
            color={colorScheme.black}
          />
        </Pressable>
      )}
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
