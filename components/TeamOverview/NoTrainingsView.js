import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../Buttons/Button";
import { useNavigation } from "@react-navigation/native";
import colorScheme from "../../constants/colorScheme";

const NoTrainingsView = ({ teamId }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>
        You don't have any trainings registered yet
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

export default NoTrainingsView;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  messageText: {
    fontFamily: "Condensed-Light",
    fontSize: 18,
    textAlign: "center",
    color: colorScheme.darkGrey,
  },
  buttonContainer: {
    backgroundColor: colorScheme.green,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: colorScheme.white,
    fontSize: 16,
    fontFamily: "Condensed-Black",
  },
});
