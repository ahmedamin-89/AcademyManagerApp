import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";

const RatingAdjuster = ({ value, increment, decrement, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={value.toString()}
        placeholder="70"
        onChangeText={onChangeText}
      />
      <Pressable
        style={({ pressed }) => [
          styles.buttonContainer,
          pressed && { opacity: 0.75 },
          { marginLeft: 20 },
        ]}
        onPress={decrement}
      >
        <Text style={styles.text}>-</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.buttonContainer,
          pressed && { opacity: 0.75 },
        ]}
        onPress={increment}
      >
        <Text style={styles.text}>+</Text>
      </Pressable>
    </View>
  );
};

export default RatingAdjuster;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 40,
    backgroundColor: "#e9ecef",
    borderWidth: 0,
    borderRadius: 4,
    fontSize: 17,
    letterSpacing: 1.5,
    fontFamily: "Condensed-Light",
    color: colorScheme.black,
    textAlign: "center",
  },
  text: {
    fontSize: 23,
    color: colorScheme.grey,
    fontFamily: "Normal-Black",
  },
  buttonContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9ecef",
    borderRadius: 4,
    marginLeft: 8,
  },
});
