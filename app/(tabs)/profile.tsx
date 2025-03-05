import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";

import useAppwrite from "./../../lib/useAppwrite";
import Videocard from "@/components/Videocard";
import { signOut } from "@/lib/appwrite";

import { videoByProfile } from "@/lib/appwrite";
import { UseGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = UseGlobalContext();
  console.log(user);
  const { data } = useAppwrite(() => videoByProfile(user.$id));
  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar className="bg-primary" barStyle="light-content" />

      <FlatList
        // data={[]}
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Videocard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-2 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6 "></View>
            <TouchableOpacity className=" items-end" onPress={logout}>
              <Image source={icons.logout} className="w-8 h-8" />
            </TouchableOpacity>
            <View className="justify-center items-center">
              <Image
                source={{ uri: user.avatar }}
                className="w-16 h-16 rounded-lg border-2 border-amber-500"
                resizeMode="contain"
              />
              <Text className="text-white text-2xl font-psemibold my-4">{user.name}</Text>
              <View className="w-full flex-row gap-10  justify-center ">
                <View className="justify-center items-center">
                  <Text className="text-white font-psemibold text-2xl">
                    {data.length}
                  </Text>
                  <Text className="text-white font-pextralight text-sm">
                    Videos
                  </Text>
                </View>
                <View className="justify-center items-center">
                  <Text className="text-white font-psemibold text-2xl">
                    1.2K
                  </Text>
                  <Text className="text-white font-pextralight text-sm">
                    Followers
                  </Text>
                </View>
              </View>
              <Text className="text-left pl-3 w-full font-pregular text-lg text-white mt-3 mt-5">
                {" "}
                Videos{" "}
              </Text>
              <View className="w-full border-b-[0.2px] border-gray-400"></View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
