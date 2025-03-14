import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyComponent = () => {
  return (
    <View className=" items-center px-5">
      <Image source={images.empty} resizeMode="contain" className="w-96 h-64" />
      <Text className="text-white font-pregular">No Videos Found!</Text>
      <Text className="text-white font-psemibold text-lg">
        Be the First One to Create Videos
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

export default EmptyComponent;
