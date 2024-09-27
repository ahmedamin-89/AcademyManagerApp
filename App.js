import React, { useContext, useEffect, useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import AuthStack from "./navigation/AuthStack";
import AdminStack from "./navigation/AdminStack";
import CoachStack from "./navigation/CoachStack";
import PlayerStack from "./navigation/PlayerStack";
import ParentStack from "./navigation/ParentStack";
import { UserContextProvider, UserContext } from "./context/userContext";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
]);

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    "Condensed-Black": require("./assets/fonts/CondensedBlack.ttf"),
    "Condensed-Light": require("./assets/fonts/CondensedLight.ttf"),
    "Expanded-Black": require("./assets/fonts/ExpandedBlack.ttf"),
    "Normal-Black": require("./assets/fonts/NormalBlack.ttf"),
    "Semi-Expanded-Black": require("./assets/fonts/SemiExpandedBlack.ttf"),
    "Ultra-Condensed-Black": require("./assets/fonts/UltraCondensedBlack.ttf"),
    "Ultra-Condensed-Bold": require("./assets/fonts/UltraCondensedBold.ttf"),
    "Ultra-Condensed-Medium": require("./assets/fonts/UltraCondensedMedium.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        if (fontsLoaded) {
          // Artificially delay for two seconds to simulate a slow loading experience
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

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
        {({ user, loading }) => {
          if (loading || !appIsReady) {
            return null;
          }
          return (
            <NavigationContainer>
              <GestureHandlerRootView
                style={{ flex: 1 }}
                onLayout={onLayoutRootView}
              >
                <StatusBar style="light" />
                {renderStack(user)}
              </GestureHandlerRootView>
            </NavigationContainer>
          );
        }}
      </UserContext.Consumer>
    </UserContextProvider>
  );
};

export default App;
