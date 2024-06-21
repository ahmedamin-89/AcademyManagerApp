import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

const SelectItemList = ({ placeholder }) => {
  const [selected, setSelected] = useState("");
  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];

  return (
    <View style={styles.container}>
      <SelectList
        boxStyles={styles.boxStyles}
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        inputStyles={styles.inputStyles}
        placeholder={placeholder}
        search={false}
        fontFamily="Condensed-Light"
        dropdownStyles={styles.dropdownStyles}
      />
    </View>
  );
};

export default SelectItemList;

const styles = StyleSheet.create({
  container: {
    width: 110,
    zIndex: 500, // Ensure this is higher than other components
    height: 40,
  },
  boxStyles: {
    backgroundColor: "white",
    width: "100%",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
    height: "100%",
    minHeight: 40,
    borderRadius: 6,
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  inputStyles: {
    color: "#1d1d1f",
    fontSize: 17,
    position: "relative",
    minHeight: 40,
    bottom: 3,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "auto",
  },
  dropdownStyles: {
    backgroundColor: "white",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
    backgroundColor: "white",
    position: "absolute",
    top: 40,
    width: "100%",
    zIndex: 500, // Ensure this is higher than other components
  },
});
