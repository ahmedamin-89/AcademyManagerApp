import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colorScheme from "../../constants/colorScheme";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const TeamsScreen = () => {
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

  return <View style={styles.container}></View>;
};

export default TeamsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorScheme.black,
  },
});
