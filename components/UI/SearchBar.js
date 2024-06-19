import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import colorScheme from "../../constants/colorScheme";

const SearchBar = ({ style, searchQuery, setSearchQuery }) => {
  const [typingState, setTypingState] = useState(false);
  const searchTextHandler = (enteredSearchText) => {
    setSearchQuery(enteredSearchText);
    if (enteredSearchText === "") {
      setTypingState(false);
    } else {
      setTypingState(true);
    }
  };

  const iconPressHandler = () => {
    if (typingState) {
      setSearchQuery("");
      setTypingState(false);
    }
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        style={styles.input}
        placeholder={"Enter player name..."}
        value={searchQuery}
        onChangeText={searchTextHandler}
        placeholderTextColor={"#5d5e63"}
      />
      <View style={styles.iconContainer}>
        <Pressable style={styles.iconInnerContainer} onPress={iconPressHandler}>
          <Ionicons
            name={typingState ? "close-outline" : "search-outline"}
            size={24}
            color={"#5d5e63"}
          />
        </Pressable>
      </View>
    </View>
  );
};
export default SearchBar;
const styles = StyleSheet.create({
  input: {
    backgroundColor: colorScheme.grey,
    width: "78%",
    height: 55,
    alignSelf: "center",
    paddingStart: 24,
    textAlign: "left",
    color: colorScheme.white,
    fontFamily: "Condensed-Light",
    fontSize: 17,
  },
  inputContainer: {
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 3,
    overflow: "hidden",
  },
  iconContainer: {
    backgroundColor: colorScheme.grey,
    paddingEnd: 15,
  },
  iconInnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
