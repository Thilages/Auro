import { View, Image, Text, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import { icons } from "@/constants";
import { VideoView, useVideoPlayer } from "expo-video";

const Videocard = ({
  video: {
    title,
    thumnail,
    video,
    creator: { avatar, name },
  },
}) => {
  const [play, setplay] = useState(false);

  const videoSource =
    "https://cloud.appwrite.io/v1/storage/buckets/67c5156c0008d7789b97/files/67c6cfe800205567f35a/view?project=67c510d2002ae5f50e73&mode=admin";
  const first = useRef(null);
  const player = useVideoPlayer(videoSource, (player) => {});

  return (
    <View className="space-y-4 mb-10 px-5">
      {play ? (
        <VideoView
          player={player}
          // className="w-52 h-80 rounded-3xl mt-3 bg-white/10"
          style={{
            height: "224",
            width: "auto",
            borderRadius: 20,
            marginTop: 10,
            backgroundColor: "#212121",
            alignItems: "center",
            justifyContent: "center",
          }}
          ref={first}
          contentFit="cover"
          nativeControls="false"
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setplay(true);
            player.play();
          }}
        >
          <View>
            <Image
              className="w-full h-56"
              source={{ uri: thumnail }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      )}
      <View className="mt-2 flex-row justify-between items-center">
        <View className="w-16 h-16 justify-center items-center rounded-xl">
          <Image
            className="w-14 h-14 border border-amber-500 rounded-xl"
            source={{ uri: avatar }}
            resizeMode="contain"
          />
        </View>
        <View className="flex-1 ml-2">
          <Text className="text-white font-psemibold">{title}</Text>
          <Text className="text-white font-pextralight text-sm">{name}</Text>
        </View>
        <View className="items-center justify-center">
          <Image source={icons.menu} resizeMode="contain" className="w-4 h-4" />
        </View>
      </View>
    </View>
  );
};

export default Videocard;
