import { Platform, Pressable, Text } from "react-native";
import * as Linking from "expo-linking";

const PressablePhoneNumber = ({ phoneNumber, style, children }) => {
  const dialCall = (number) => {
    let phoneNumber = "";

    // Check for iOS or Android
    if (Platform.OS === "ios") {
      phoneNumber = `telprompt:${number}`;
    } else {
      phoneNumber = `tel:${number}`;
    }

    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          alert("Phone number is not available");
        } else {
          return Linking.openURL(`tel:+2${number}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Pressable
      onPress={() => {
        dialCall(phoneNumber);
      }}
    >
      <Text style={style}>{phoneNumber || children}</Text>
    </Pressable>
  );
};

export default PressablePhoneNumber;
