import React, { useState } from "react";
import { View, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const CustomSearch = () => {
  const pathname = usePathname();
  const [query, setquery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) {
      Alert.alert("Invalid Query", "Please enter some text to search.");
      return;
    }
    if (pathname.startsWith("/search")) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View className="relative">
      <TextInput
        className="w-full h-14 rounded-2xl mt-2 bg-gray-700 border border-gray-500 px-4"
        placeholder="Search for Videos"
        placeholderTextColor="#6b7280"
        cursorColor="black"
        onChangeText={(text) => setquery(text)}
      />
      <TouchableOpacity
        className="absolute right-3 bottom-5"
        onPress={handleSearch}
      >
        <Image
          className="w-5 h-5"
          resizeMode="contain"
          source={icons.search}
          tintColor="#6b7280"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomSearch;
