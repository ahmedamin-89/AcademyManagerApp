import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../Buttons/Button";
import { useNavigation } from "@react-navigation/native";

const AddTrainingButton = ({ teamId }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text
        style={[
          { fontFamily: "Condensed-Light", fontSize: 18, textAlign: "center" },
        ]}
      >
        You don't have any trainings registerd yet
      </Text>
      <Button
        containerStyle={styles.buttonContainer}
        textStyle={styles.buttonText}
        text="Add Training"
        onPress={() =>
          navigation.navigate("AddTraining", {
            teamId,
          })
        }
      />
    </View>
  );
};

export default AddTrainingButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    gap: 6,
  },
  buttonContainer: {
    backgroundColor: colorScheme.green,
    padding: 10,
    borderRadius: 8,
    height: 40,
  },
  buttonText: {
    color: colorScheme.white,
    fontSize: 14,
  },
});
