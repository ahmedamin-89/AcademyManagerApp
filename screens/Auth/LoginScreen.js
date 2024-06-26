import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import bgImage from "../../assets/images/aliRunning.jpeg";
import { ImageBackground } from "expo-image";
import colorScheme from "../../constants/colorScheme";
import InputField from "../../components/UI/InputField";
import IconButton from "../../components/Buttons/IconButton";

const LoginScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState({
    phoneNumber: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [bottomPadding, setBottomPadding] = useState(0);

  const handleInputChange = useCallback((name, value) => {
    setUserDetails((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  // Listen for keyboard events
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setBottomPadding(Platform.OS === "ios" ? 200 : 0); // Adjust this value based on your app's needs
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setBottomPadding(0);
    });

    // Cleanup function
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: colorScheme.black,
        paddingBottom: bottomPadding,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 200 : 0}
    >
      <ImageBackground
        source={bgImage}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Welcome Back</Text>
          <InputField
            name="phoneNumber"
            label="Phone Number"
            value={userDetails.phoneNumber}
            handleInputChange={handleInputChange}
            placeholder="01XX XXX XXXX"
            keyboardType="phone-pad"
          />

          <InputField
            name="password"
            label="Password"
            value={userDetails.password}
            secure={true}
            placeholder="Enter your password"
            handleInputChange={handleInputChange}
            showPassword={showPassword}
            setShowPassword={toggleShowPassword}
            login={true}
          />
          <IconButton
            onPress={() => navigation.replace("Tab")}
            style={{ width: "100%", marginTop: 10 }}
            text="Login"
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default React.memo(LoginScreen);

const styles = StyleSheet.create({
  container: {
    height: "54%",
    width: "100%",
    backgroundColor: colorScheme.black,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 4.84,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    padding: 10,
    gap: 20,
  },
  title: {
    color: "white",
    fontFamily: "Condensed-Black",
    fontSize: 32,
    paddingTop: 20,
    paddingBottom: 10,
  },
});
