import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import colorScheme from "../../constants/colorScheme";
import { FlatList } from "react-native-gesture-handler";

const HorizontalSelector = () => {
  const [selected, setSelected] = useState("2009");
  const data = [
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
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
    padding: 10,
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
