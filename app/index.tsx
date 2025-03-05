import { Link, Redirect, router } from "expo-router";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomButton from "../components/CustomButton";
import { useEffect } from "react";
import { UseGlobalContext } from "@/context/GlobalProvider";

export default function Index() {
  const { IsLoggedIn } = UseGlobalContext();
  if (IsLoggedIn) return <Redirect href="/home"></Redirect>;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-center h-full items-center px-5">
          <Image
            source={images.logo}
            className="w-40 h-10"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="w-96 h-96"
            resizeMode="contain"
          />
          <View className="relative">
            <Text className="text-3xl text-white font-psemibold text-center">
              Discover Endless possiblities with{" "}
              <Text className="text-3xl z-10 text-secondary-200 font-psemibold">
                Auro
              </Text>
            </Text>
            <Image
              source={images.path}
              className="w-20 -bottom-3 right-0 absolute -z-10"
              resizeMode="contain"
            />
          </View>
          <Text className="text-white text-center mt-5 font-plight">
            Where creativity meets innovation, we craft experiences that leave a
            lasting impact
          </Text>
          <CustomButton
            name="Continue with email"
            buttonstyle=" "
            textstyle=""
            handlepress={() => router.push("/(auth)/sign-in")}
          />
        </View>
        <StatusBar className="bg-primary" />
      </ScrollView>
    </SafeAreaView>
  );
}
