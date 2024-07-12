import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import colorScheme from "../../constants/colorScheme";

const ForgotPasswordButton = () => {
  const [pressed, setPressed] = useState(false);

  const navigation = useNavigation();
  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => navigation.navigate("ForgotPassword")}
    >
      <Text style={[styles.forgot, pressed && styles.pressed]}>
        Forgot Password?
      </Text>
    </Pressable>
  );
};

const InputField = ({
  name,
  label,
  value,
  secure,
  placeholder,
  keyboardType,
  handleInputChange,
  showPassword,
  setShowPassword,
  textInputStyle,
  login,
  editable,
}) => {
  if (name === "phoneNumber") {
    return (
      <View style={{ alignSelf: "stretch" }}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.phoneContainer}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/images/egypt-flag.png")}
            />
            <Text style={[styles.label, { paddingBottom: 0 }]}>+2</Text>
          </View>
          <TextInput
            style={[styles.input, textInputStyle, styles.phoneInput]}
            onChangeText={(text) => handleInputChange(name, text)}
            value={value}
            keyboardType="phone-pad"
            placeholder={placeholder}
            placeholderTextColor={"#6c757d"}
            placeholderFontFamily={"Outfit"}
            editable={editable !== false} // Add this line
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ alignSelf: "stretch" }}>
      {(login && name) === "password" ? (
        <View style={styles.passwordLabelContainer}>
          <Text style={[styles.label, { paddingBottom: 0 }]}>Password</Text>
          <ForgotPasswordButton />
        </View>
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
      <TextInput
        style={[styles.input, textInputStyle]}
        onChangeText={(text) => handleInputChange(name, text)}
        value={value}
        secureTextEntry={secure && !showPassword}
        placeholder={placeholder}
        placeholderTextColor={"#6c757d"}
        placeholderFontFamily={"Outfit"}
        keyboardType={keyboardType || "default"}
        editable={editable !== false} // Add this line
      />
      {secure && (
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={styles.icon}
        >
          <Ionicons
            name={!showPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="white"
          />
        </Pressable>
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: "#e9ecef",
    borderWidth: 0,
    paddingLeft: 12.5,
    borderRadius: 4,
    fontSize: 15.5,
    fontFamily: "Condensed-Light",
    color: colorScheme.white,
  },

  label: {
    color: colorScheme.grey,
    paddingBottom: 4,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Condensed-Light",
  },
  passwordContainer: {
    marginBottom: 8.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  passwordCheck: {
    paddingBottom: 8,
    fontSize: 12.5,
    fontWeight: "200",
    color: "#343a40",
  },
  icon: {
    position: "absolute",
    right: 18.5,
    top: 40.5,
  },
  image: {
    width: 37,
    height: 37,
    marginRight: 10,
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 6,
  },
  phoneContainer: {
    flexDirection: "row",
    height: 50,
    backgroundColor: colorScheme.grey,
    borderWidth: 0,
    paddingLeft: 8,
    borderRadius: 4,
    fontSize: 15.5,
    fontWeight: "500",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneInput: {
    flex: 1,
    fontSize: 15.5,
    fontWeight: "500",
    alignSelf: "flex-start",
    borderColor: "transparent",
  },
  passwordLabelContainer: {
    marginBottom: 8.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgot: {
    fontSize: 14.5,
    fontWeight: "600",
    color: "#67b99a",
    fontStyle: "italic",
    textDecorationLine: "underline",
    fontFamily: "Condensed-Light",
  },
  pressed: {
    opacity: 0.75,
    color: "#67b99a",
  },
});
