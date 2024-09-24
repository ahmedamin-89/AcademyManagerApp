import { StyleSheet, View } from "react-native";
import React from "react";
import Button from "../Buttons/Button";
import { useNavigation } from "@react-navigation/native";
import colorScheme from "../../constants/colorScheme";

const AddTrainingButton = ({ teamId }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
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
    alignItems: "center",
    marginLeft: 10,
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
