import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants";

// import { icons } from 'a';

const Icon = ({ color, icon }) => {
  return (
    <Image
      source={icon}
      tintColor={color}
      resizeMode="contain"
      style={{ height: 25, width: 25 }}
    />
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#161622",
          borderColor: "#161622",
        },

        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: "orange",

        tabBarIconStyle: {
          flex: 1,
          justifyContent: "center",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          // headerShown:false,
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              color={color}
              icon={icons.home}
              focused={focused}
              name="Home"
            />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              color={color}
              icon={icons.bookmark}
              focused={focused}
              name=""
            />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="create"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              color={color}
              icon={icons.plus}
              focused={focused}
              name="Home"
            />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="profile"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              color={color}
              icon={icons.profile}
              focused={focused}
              name="Home"
            />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};

export default TabsLayout;
