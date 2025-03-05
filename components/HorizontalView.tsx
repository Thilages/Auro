import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { VideoView, useVideoPlayer } from "expo-video";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const HorizontalView = ({ video }) => {
  const TrendingItem = ({ activeVideo, video }) => {
    const videoSource =
      "https://cloud.appwrite.io/v1/storage/buckets/67c5156c0008d7789b97/files/67c6cfe800205567f35a/view?project=67c510d2002ae5f50e73&mode=admin";

    const player = useVideoPlayer(videoSource, (player) => {
      player.play();
    });
    const [play, setplay] = useState(false);

    // useEffect(() => {
    //   if (activeVideo == video.$id) {
    //     setplay(true);
    //   }
    // }, [activeVideo]);

    return (
      <Animatable.View
        className="mr-5"
        animation={activeVideo === video.$id ? zoomIn : zoomOut}
        duration={300}
      >
        {play ? (
          <VideoView
            player={player}
            className="w-52 h-80 rounded-3xl mt-3 bg-white/10"
            style={{
              height: 300,
              width: 200,
              borderRadius: 20,
              marginTop: 10,
              backgroundColor: "#212121",
              alignItems: "center",
              justifyContent: "center",
            }}
            contentFit="cover"
          />
        ) : (
          <TouchableOpacity
            className={`relative justify-center items-center `}
            activeOpacity={0.7}
            onPress={() => {
              setplay(true);
              player.play();
            }}
          >
            <ImageBackground
              source={{ uri: video.thumnail }}
              resizeMode="cover"
              className="w-52 h-80 rounded-3xl overflow-hidden my-5"
            />
            <Image
              source={icons.play}
              className="w-10 absolute "
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </Animatable.View>
    );
  };

  const [activeVideo, setactiveVideo] = useState();

  const viewableItemChange = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setactiveVideo(viewableItems[0].item.$id);
    }
  };

  return (
    <FlatList
      data={video}
      extraData={(item) => {
        item.$id;
      }}
      renderItem={({ item }) => (
        <TrendingItem activeVideo={activeVideo} video={item} />
      )}
      onViewableItemsChanged={viewableItemChange}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 80,
      }}
      // contentOffset={{ x: 170 }}
      horizontal
    />
  );
};

export default HorizontalView;
