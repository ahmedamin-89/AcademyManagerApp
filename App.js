import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import AuthStack from "./navigation/AuthStack";
import AdminStack from "./navigation/AdminStack";
import CoachStack from "./navigation/CoachStack";
import PlayerStack from "./navigation/PlayerStack";
import ParentStack from "./navigation/ParentStack";
import { UserContextProvider, UserContext } from "./context/userContext";

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Condensed-Black": require("./assets/fonts/CondensedBlack.ttf"),
    "Condensed-Light": require("./assets/fonts/CondensedLight.ttf"),
    "Expanded-Black": require("./assets/fonts/ExpandedBlack.ttf"),
    "Normal-Black": require("./assets/fonts/NormalBlack.ttf"),
    "Semi-Expanded-Black": require("./assets/fonts/SemiExpandedBlack.ttf"),
    "Ultra-Condensed-Black": require("./assets/fonts/UltraCondensedBlack.ttf"),
    "Ultra-Condensed-Bold": require("./assets/fonts/UltraCondensedBold.ttf"),
    "Ultra-Condensed-Medium": require("./assets/fonts/UltraCondensedMedium.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const renderStack = (user) => {
    if (!user.role) {
      return <AuthStack />;
    }

    switch (user.role) {
      case "admin":
        return <AdminStack />;
      case "coach":
        return <CoachStack />;
      case "player":
        return <PlayerStack />;
      case "parent":
        return <ParentStack />;
      default:
        return <AuthStack />;
    }
  };

  return (
    <UserContextProvider>
      <UserContext.Consumer>
        {({ user }) => (
          <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StatusBar style="light" />
              {renderStack(user)}
            </GestureHandlerRootView>
          </NavigationContainer>
        )}
      </UserContext.Consumer>
    </UserContextProvider>
  );
};

export default App;
