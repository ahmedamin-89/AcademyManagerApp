import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import LightInputField from "../UI/LightInputField";
import Button from "../Buttons/Button";
import colorScheme from "../../constants/colorScheme";

const CreateCoachForm = () => {
  const [coachDetails, setCoachDetails] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setCoachDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <BottomSheetView style={styles.container}>
      <Text style={styles.text}>Add a Coach</Text>
      <LightInputField
        label={"Name"}
        placeholder="Name"
        value={coachDetails.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      <LightInputField
        label={"Phone Number"}
        placeholder="Phone"
        value={coachDetails.phone}
        onChangeText={(text) => handleInputChange("phone", text)}
      />
      <LightInputField
        placeholder="Email"
        label={"Email"}
        value={coachDetails.email}
        onChangeText={(text) => handleInputChange("email", text)}
      />
      <Button
        loading={loading}
        onPress={() => {}}
        disabled={
          coachDetails.name === "" ||
          coachDetails.phone === "" ||
          coachDetails.email === ""
        }
        text="Add Coach"
        textStyle={{ color: colorScheme.white, fontSize: 22 }}
        containerStyle={{
          width: "70%",
          backgroundColor: colorScheme.green,
          marginTop: "auto",
        }}
      />
    </BottomSheetView>
  );
};

export default CreateCoachForm;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: "Condensed-Black",
    color: colorScheme.grey,
  },
  container: {
    padding: 15,
    alignItems: "center",
    gap: 18,
    marginBottom: 60,
  },
});
