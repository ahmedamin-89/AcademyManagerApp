import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import colorScheme from "../../constants/colorScheme";
import { FlatList } from "react-native-gesture-handler";

const HorizontalSelector = ({ data }) => {
  const [selected, setSelected] = useState("All");

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        ListHeaderComponent={
          <Pressable
            style={[
              styles.itemContainer,
              selected === "All" && { backgroundColor: colorScheme.green },
            ]}
            onPress={() => setSelected("All")}
          >
            <Text style={styles.text}>All</Text>
          </Pressable>
        }
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.itemContainer,
              selected === item && { backgroundColor: colorScheme.green },
            ]}
            onPress={() => setSelected(item)}
          >
            <Text style={styles.text}>{item}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default HorizontalSelector;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colorScheme.black,
    overflow: "visible",
  },
  text: {
    color: colorScheme.black,
    fontFamily: "Condensed-Light",
    fontSize: 21,
    marginHorizontal: 10,
  },
  itemContainer: {
    borderRadius: 4,
    backgroundColor: colorScheme.green,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
  },
});
