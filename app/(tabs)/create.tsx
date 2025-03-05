import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { createVideoPost } from "@/lib/appwrite";
import { UseGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";

const Create = () => {
  const { user } = UseGlobalContext();

  const [formField, setformField] = useState({
    title: "",
    video: null,
    thumnail: null,
    prompt: "",
  });

  const handleSumbit = async () => {
    try {
      console.log(formField);
      if (
        formField.title ||
        formField.video ||
        formField.thumnail ||
        formField.prompt
      ) {
        console.log("works");
        const result = await createVideoPost({
          ...formField,
          userId: user.$id,
        });
        router.push("/home");
        if (result) {
          setformField({ title: "", video: null, thumnail: null, prompt: "" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openPicker = async (filetype) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: filetype == "image" ? ["image/png", "image/jpeg"] : ["video/mp4"],
    });
    if (!result.canceled) {
      if (filetype == "image") {
        setformField((prop) => ({ ...prop, thumnail: result.assets[0] }));
      }

      if (filetype == "video") {
        setformField((prop) => ({ ...prop, video: result.assets[0] }));
      }
    } else {
      Alert.alert();
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="px-4 py-8 gap-y-4">
          <Text className="text-white font-pbold text-2xl">Create a Video</Text>
          <TextInput
            className={`w-full font-pregular text-white justify-center items-center relative h-14 rounded-2xl mt-5 bg-gray-600 px-4 `}
            placeholder="Give title for your video"
            placeholderTextColor="white"
            cursorColor="white"
            onChangeText={(e) => {
              setformField((prop) => ({ ...prop, ["title"]: e }));
            }}
          />
          <View className="">
            <Text className="text-white font-pmedium">Upload Video</Text>
            <View className="mt-3">
              {formField.video ? (
                <View className="h-20 flex-row px-4 justify-between items-center border rounded-2xl bg-gray-600">
                  <Text className="text-white font-psemibold ">
                    Video Selected Successfully
                  </Text>
                  <Image source={icons.rightArrow} tintColor="##f59e0b" />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    openPicker("video");
                  }}
                >
                  <View className="border justify-center items-center h-48 w-full bg-gray-600 rounded-2xl">
                    <View className="justify-center items-center rounded-2xl p-5 w-16 h-16 border border-dashed border-amber-500">
                      <Image
                        source={icons.upload}
                        className="w-7"
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View className="">
            <Text className="text-white font-pmedium">Upload Thumbnail</Text>
            <View className="mt-3">
              {formField.thumnail ? (
                <View className="h-20 flex-row px-4 justify-between items-center border rounded-2xl bg-gray-600">
                  <Text className="text-white font-psemibold ">
                    Thumbnail Selected Successfully
                  </Text>
                  <Image source={icons.rightArrow} tintColor="##f59e0b" />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    openPicker("image");
                  }}
                >
                  <View className="border justify-center items-center h-20 w-full bg-gray-600 rounded-2xl">
                    <View className="justify-center flex-row items-center rounded-2xl p-5 ">
                      <Image
                        source={icons.upload}
                        className="w-7"
                        resizeMode="contain"
                      />
                      <Text className="text-white font-pregular ml-3">
                        Select Your Thumbnail
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <TextInput
            className={`w-full font-pregular text-white justify-center items-center relative h-14 rounded-2xl bg-gray-600 px-4 `}
            placeholder="Give Propt of your video"
            placeholderTextColor="white"
            cursorColor="white"
            onChangeText={(e) => {
              setformField((prop) => ({ ...prop, ["prompt"]: e }));
            }}
          />
          <CustomButton
            textstyle="text-white"
            name="Create Video"
            buttonstyle="mt-0"
            handlepress={handleSumbit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
