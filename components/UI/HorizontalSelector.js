import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import colorScheme from "../../constants/colorScheme";
import { FlatList } from "react-native-gesture-handler";

const HorizontalSelector = ({
  data,
  itemStyle,
  showAllOption = true,
  multipleSelect = false,
  onSelectionChange,
}) => {
  const [selected, setSelected] = useState(showAllOption ? ["All"] : []);

  const handleSelect = (item) => {
    if (multipleSelect) {
      if (selected.includes(item)) {
        setSelected(selected.filter((i) => i !== item));
      } else {
        setSelected([...selected, item]);
      }
    } else {
      setSelected([item]);
    }
  };

  useEffect(() => {
    // Notify the parent component whenever the selection changes
    if (onSelectionChange) {
      onSelectionChange(selected);
    }
  }, [selected]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        ListHeaderComponent={
          showAllOption && (
            <Pressable
              style={[
                styles.itemContainer,
                itemStyle,
                selected.includes("All") && {
                  backgroundColor: colorScheme.green,
                },
              ]}
              onPress={() => handleSelect("All")}
            >
              <Text style={styles.text}>All</Text>
            </Pressable>
          )
        }
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.itemContainer,
              itemStyle,
              selected.includes(item) && { backgroundColor: colorScheme.green },
            ]}
            onPress={() => handleSelect(item)}
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
