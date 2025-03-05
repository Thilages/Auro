import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import FormFeild from "@/components/FormFeild";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { createAccount } from "@/lib/appwrite";
import { UseGlobalContext } from "@/context/GlobalProvider";
const SignUp = () => {
  const { setUser, setIsLoggedIn } = UseGlobalContext();
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleFormChange = (key, value) => {
    setformdata((form) => ({
      ...form,
      [key]: value,
    }));
  };

  const handleSumbit = async () => {
    if (!formdata.email || !formdata.password || !formdata.username) {
      Alert.alert("Error, Pleas Fill the Form Properly");
    }
    try {
      const result = await createAccount(
        formdata.email,
        formdata.password,
        formdata.username
      );
      setUser(result)
      setIsLoggedIn(true)
      router.replace("/home");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar className="bg-primary" barStyle="light-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="justify-start items-start px-10">
          <Image
            source={images.logo}
            className="w-32 mt-10"
            resizeMode="contain"
          />
          <Text className="text-white mt-4 font-psemibold text-xl">
            Create Your Account
          </Text>
          <FormFeild name="email" handlechange={handleFormChange} />
          <FormFeild name="username" handlechange={handleFormChange} />
          <FormFeild name="password" handlechange={handleFormChange} />
          {/* <FormFeild name="password" handlechange={handleFormChange} /> */}
          <CustomButton name="Create account" handlepress={handleSumbit} />
          <View className="flex-row w-full justify-center mt-5 items-center">
            <Text className="font-plight text-white">
              Already Have a Account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/(auth)/sign-in");
              }}
            >
              <Text className=" underline ml-2 text-orange-300 font-psemibold">
                SignIn
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
