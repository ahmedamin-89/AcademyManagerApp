import { Pressable, StyleSheet, Text, View, Button, Image } from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import colorScheme from "../../constants/colorScheme";
import { Ionicons } from "@expo/vector-icons";
import MenuButton from "../../components/Buttons/MenuButton";
import * as ImagePicker from "expo-image-picker";

import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Picture from "../../components/UI/Picture";

const TeamOverviewScreen = ({ navigation, route }) => {
  const { name, yearsOfBirth } = route.params;
  const snapPoints = ["78%"];
  const bottomSheetModalRef = useRef(null);

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.present();
    } else {
      console.error("BottomSheetModal ref is not defined");
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerRight: () => <MenuButton onPress={openBottomSheet} />,
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
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          <Picture uri={image} />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default TeamOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    gap: 20,
    backgroundColor: colorScheme.black,
  },
  headerRight: {
    marginRight: 20,
  },
});
