import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormFeild from "@/components/FormFeild";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { createAccount, signin } from "./../../lib/appwrite";
import { account } from "./../../lib/appwrite";
import { UseGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const [formdata, setformdata] = useState({ email: "", password: "" });
  const { setUser, setIsLoggedIn } = UseGlobalContext();
  const handleFormChange = (key, value) => {
    setformdata((prop) => ({ ...prop, [key]: value }));
  };

  const handlePress = async () => {
    if (!formdata.email || !formdata.password) {
      Alert.alert("Fill the form properly!");
      return;
    }

    try {
      const result = await signin(formdata.email, formdata.password);
      setUser(result);
      setIsLoggedIn(true);
      if (result) {
        console.log("Sign-in successful:", result);
        router.replace("/home");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      Alert.alert("Sign-In Failed", error.message || "Something went wrong.");
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="h-full justify-start items-start px-5">
          <Image
            source={images.logo}
            className="w-36 mt-10"
            resizeMode="contain"
          />
          <Text className="text-white font-psemibold text-2xl">
            Log In To <Text className="text-secondary-100">Auro</Text>
          </Text>
          <FormFeild
            name="email"
            handlechange={handleFormChange}
            textStyle=""
            inputStyle=""
          />
          <FormFeild
            name="password"
            handlechange={handleFormChange}
            textStyle="mt-6"
            inputStyle=""
          />
          <CustomButton
            name="Sign-In"
            handlepress={handlePress}
            buttonstyle="mt-8"
            textstyle="text-white"
          />

          <View className="w-full mt-5 flex flex-row items-center justify-center">
            <Text className="font-plight text-white">
              Don't have an Account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/(auth)/sign-up");
              }}
            >
              <Text className="font-pbold text-orange-300 underline ml-2">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar className="bg-primary" barStyle="light-content" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
