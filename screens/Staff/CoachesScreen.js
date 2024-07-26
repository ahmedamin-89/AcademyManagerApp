import { StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import colorScheme from "../../constants/colorScheme";
import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import { Pressable } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import CreateCoachForm from "../../components/Forms/CreateCoachForm";
const CoachesScreen = ({ navigation }) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["65%"];

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.present();
    } else {
      console.error("BottomSheetModal ref is not defined");
    }
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
        <CreateCoachForm />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme.black,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CoachesScreen;
