import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptySearchComponent = () => {
  return (
    <View className=" items-center px-5">
      <Image source={images.empty} resizeMode="contain" className="w-96 h-64" />
      <Text className="text-white font-pregular">No Videos Found!</Text>
      <Text className="text-white font-psemibold text-lg">
        Try some other titles maybe
      </Text>
      <CustomButton
        handlepress={() => {
          router.push("/create");
        }}
        name="Create Video"
        textstyle="text-white"
      />
    </View>
  );
};

export default EmptySearchComponent;
