// src/navigation/TabNavigator.js
import React, { useState } from "react";
import { Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import colorScheme from "../constants/colorScheme";
import Header from "../components/UI/Header/Header";
import StaffDashboard from "../screens/Staff/StaffDashboard";
import ScheduleScreen from "../screens/Staff/ScheduleScreen";
import ClubScreen from "../screens/Staff/ClubScreen";
import StaffSettings from "../screens/Staff/StaffSettings";

const Tab = createBottomTabNavigator();

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

export default TabNavigator;
