import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import colorScheme from "./constants/colorScheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  const [selectedTab, setSelectedTab] = useState("Home");

  const renderIcon = (route, color, size, focused) => {
    let iconName;
    switch (route.name) {
      case "Home":
        iconName = focused ? "home" : "home-outline";
        break;
      case "Home2":
        iconName = focused ? "calendar" : "calendar-outline";
        break;
      case "Home3":
        iconName = focused ? "people" : "people-outline";
        break;
      case "Home4":
        iconName = focused
          ? "ellipsis-horizontal"
          : "ellipsis-horizontal-outline";
        break;
      default:
        iconName = "home";
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: colorScheme.black,
          padding: 0,
          margin: 0,
          borderTopWidth: 0,
          border: "none",
        },
        tabBarActiveTintColor: colorScheme.black,
        tabBarInactiveTintColor: "#fff",
        tabBarLabelStyle: {
          fontWeight: "500",
          paddingTop: 1,
          fontSize: 15,
          fontFamily: "Condensed-Light",
        },
        tabBarItemStyle: {
          height: "100%",
          flex: 1,
          backgroundColor:
            selectedTab === route.name ? "#fff" : colorScheme.black,
        },
        tabBarIcon: ({ color, size, focused }) =>
          renderIcon(route, color, size, focused),
        tabBarButton: (props) => (
          <Pressable
            {...props}
            onPress={() => {
              setSelectedTab(route.name);
              props.onPress();
            }}
          />
        ),
      })}
      sceneContainerStyle={{
        backgroundColor: colorScheme.black,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={{ tabBarLabel: "Schedule" }}
      />
      <Tab.Screen
        name="Home3"
        component={HomeScreen}
        options={{ tabBarLabel: "Club" }}
      />
      <Tab.Screen
        name="Home4"
        component={HomeScreen}
        options={{ tabBarLabel: "More" }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      sceneContainerStyle={{
        backgroundColor: colorScheme.black,
      }}
    >
      <Stack.Screen name="Tab" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default function App() {
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

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
