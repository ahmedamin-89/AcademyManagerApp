import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useLayoutEffect } from "react";
import colorScheme from "../../constants/colorScheme";
import { Ionicons } from "@expo/vector-icons";

const TrainingSessionsScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [
            pressed && { opacity: 0.6 },
            {
              marginRight: 20,
              marginTop: 3,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Ionicons
            name="add-circle-outline"
            size={28}
            color={colorScheme.green}
          />
        </Pressable>
      ),
    });
  }, [navigation]);

  return <View style={styles.container}></View>;
};

export default TrainingSessionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: colorScheme.black,
  },
});
