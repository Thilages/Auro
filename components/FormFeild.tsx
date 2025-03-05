import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const FormFeild = ({ name, handlechange, textStyle, inputStyle }) => {
  const [showpassword, setshowpassword] = useState(true);
  return (
    <View className="w-full">
      <Text
        className={`text-white mt-3 text-lg font-pregular mr-3 ${textStyle}`}
      >
        {name}
      </Text>
      <TextInput
        className={`w-full relative h-14 rounded-2xl mt-2 bg-gray-300 px-4 ${inputStyle}`}
        placeholder=""
        placeholderTextColor="black"
        cursorColor="black"
        secureTextEntry={name === "password" && showpassword}
        onChangeText={(e) => {
          handlechange(name, e);
        }}
      />
      {name === "password" && (
        <TouchableOpacity
          className="absolute right-2 bottom-1 w-12 h-12 justify-center items-center"
          onPress={() => {
            setshowpassword(!showpassword);
          }}
        >
          <Image
            className="w-6 "
            resizeMode="contain"
            tintColor="white"
            source={icons.eye}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FormFeild;
