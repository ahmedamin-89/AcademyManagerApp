import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import StaffDashboard from "./screens/Staff/StaffDashboard";
import colorScheme from "./constants/colorScheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Header from "./components/UI/Header/Header";
import ClubScreen from "./screens/Staff/ClubScreen";
import backgroundImage from "./assets/images/bg.jpg";
import { StatusBar } from "expo-status-bar";
import PlayersScreen from "./screens/Staff/PlayersScreen";
import BackButton from "./components/Buttons/BackButton";
import ScheduleScreen from "./screens/Staff/ScheduleScreen";
import PlayerDetailsScreen from "./screens/PlayerDetailsScreen";
import StaffSettings from "./screens/Staff/StaffSettings";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import CoachesScreen from "./screens/Staff/CoachesScreen";
import TeamsScreen from "./screens/Staff/TeamsScreen";
import FinancialsScreen from "./screens/Staff/FinancialsScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import AttendanceDashboardScreen from "./screens/Staff/AttendanceDashboardScreen";

// SplashScreen.preventAutoHideAsync();

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
      case "Schedule":
        iconName = focused ? "calendar" : "calendar-outline";
        break;
      case "Club":
        iconName = focused ? "people" : "people-outline";
        break;
      case "More":
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

        header: () => <Header />,
      })}
      sceneContainerStyle={{
        backgroundColor: colorScheme.black,
      }}
    >
      <Tab.Screen
        name="Home"
        component={StaffDashboard}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{ tabBarLabel: "Schedule" }}
      />
      <Tab.Screen
        name="Club"
        component={ClubScreen}
        options={{ tabBarLabel: "Club" }}
      />
      <Tab.Screen
        name="More"
        component={StaffSettings}
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
        contentStyle: {
          backgroundColor: colorScheme.black,
        },
        headerLeft: () => <BackButton />,
        headerStyle: {
          backgroundColor: colorScheme.black,
          borderBottomColor: "transparent",
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colorScheme.white,
        headerTitleStyle: {
          fontFamily: "Condensed-Black",
        },
      }}
      sceneContainerStyle={{
        backgroundColor: colorScheme.black,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen
        name="Players"
        options={{
          headerShown: true,
        }}
        component={PlayersScreen}
      />
      <Stack.Screen
        name="PlayerDetails"
        options={{
          headerShown: true,
          title: "Player Details",
        }}
        component={PlayerDetailsScreen}
      />
      <Stack.Screen
        name="Coaches"
        options={{
          headerShown: true,
          title: "Coaches",
        }}
        component={CoachesScreen}
      />
      <Stack.Screen
        name="Teams"
        options={{
          headerShown: true,
          title: "Teams",
        }}
        component={TeamsScreen}
      />
      <Stack.Screen
        name="Financials"
        options={{
          headerShown: true,
          title: "Financials",
        }}
        component={FinancialsScreen}
      />
      <Stack.Screen
        name="AttendanceDashboard"
        options={{
          headerShown: true,
          title: "Attendance",
        }}
        component={AttendanceDashboardScreen}
      />
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

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <StackNavigator />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
