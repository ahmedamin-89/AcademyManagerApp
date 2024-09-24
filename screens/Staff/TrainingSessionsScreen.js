import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import colorScheme from "../../constants/colorScheme";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import LightInputField from "../../components/UI/LightInputField";
import Button from "../../components/Buttons/Button";

const TIME = [
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
];

const TrainingSessionsScreen = ({ navigation }) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["89.5%"];
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      setBottomSheetOpen(true);
      bottomSheetModalRef.current?.present();
    } else {
      console.error("BottomSheetModal ref is not defined");
    }
  };
  const [trainingDetails, setTrainingDetails] = useState({
    location: "",
    startDate: "",
    endDate: "",
    timeslots: [],
    days: [],
  });

  const handleInputChange = (name, text) => {
    setTrainingDetails((prevState) => ({
      ...prevState,
      [name]: text,
    }));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={openBottomSheet}
          style={({ pressed }) => [
            pressed && { opacity: 0.6 },
            {
              marginRight: 20,
              marginTop: 3,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Ionicons
            name="add-circle-outline"
            size={28}
            color={colorScheme.green}
          />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}></View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enableContentPanningGesture={false}
        backgroundStyle={styles.bottomSheetBackground}
        enablePanDownToClose={true}
        onDismiss={() => setBottomSheetOpen(false)}
        backdropComponent={() => (
          <Pressable
            onPress={() => {
              bottomSheetModalRef.current?.dismiss();
            }}
            style={{
              height: "100%",
              position: "absolute",
              width: "100%",
              zIndex: 0,
              backgroundColor: "rgba(0, 0, 0, 0.65)",
            }}
          ></Pressable>
        )}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.text}>Add A Training</Text>
          <LightInputField
            label="Location"
            placeholder="Enter location name"
            handleInputChange={handleInputChange}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 20 }}
          >
            <Button
              text="Start Date"
              textStyle={{ color: colorScheme.white }}
              containerStyle={{
                width: "40%%",
                backgroundColor: colorScheme.green,
              }}
            />
            <Button
              text="End Date"
              textStyle={{ color: colorScheme.white }}
              containerStyle={{
                width: "40%%",
                backgroundColor: colorScheme.green,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              width: "100%",
              justifyContent: "center",
            }}
          >
            {TIME.slice(0, -1).map((time) => (
              <Button
                key={time}
                text={`${time} -> ${TIME[TIME.indexOf(time) + 1]}`}
                textStyle={{
                  color: colorScheme.white,
                  fontSize: 16,
                  fontFamily: "Condensed-Light",
                }}
                containerStyle={{
                  backgroundColor: colorScheme.grey,
                  width: "40%",
                }}
              />
            ))}
          </View>
          <Button
            text="Create Training"
            textStyle={{ color: colorScheme.white, fontSize: 22 }}
            containerStyle={{
              width: "70%",
              backgroundColor: colorScheme.green,
              marginTop: 10,
            }}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default TrainingSessionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: colorScheme.black,
  },
  bottomSheetBackground: {
    shadowColor: "white",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: "Condensed-Black",
  },
  contentContainer: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    gap: 15,
  },
});
