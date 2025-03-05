import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  name,
  buttonstyle,
  textstyle,
  handlepress,
  
}) => {
  return (
    <TouchableOpacity
      // style={{ backgroundColor: background }}
      onPress={handlepress}
      className={`rounded-xl bg-secondary w-full py-3 mt-5 ${buttonstyle} `}
    >
      <Text className={`text-xl text-center text-primary font-psemibold  ${textstyle}`}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
