import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormFeild from "@/components/FormFeild";
import CustomSearch from "@/components/CustomSearch";
import EmptyComponent from "@/components/EmptyComponent";
import HorizontalView from "@/components/HorizontalView";
import { getAllPost,searchpost } from "@/lib/appwrite";
import useAppwrite from "./../../lib/useAppwrite";
import Videocard from "@/components/Videocard";
import { getLastestPost } from "@/lib/appwrite";

const Home = () => {
  // searchpost("ai")
  const { data: posts, isLoading, refetch } = useAppwrite(getAllPost);
  const { data: lastestVideo } = useAppwrite(getLastestPost);

  const [refreshing, setrefreshing] = useState(false);

  const onRefresh = async () => {
    setrefreshing(true);
    await refetch();
    setrefreshing(false);
  };

  const viewableItemChange = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      viewableItems.map((item) => {
        console.log(item.item.title);
      });
      console.log("first item", viewableItems[0].item.title);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar className="bg-primary" barStyle="light-content" />
      <FlatList
        // data={[]}
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Videocard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6 ">
              <View>
                <Text className="text-white font-pregular ">
                  Welcome Back!!
                </Text>
                <Text className="text-white font-psemibold text-2xl">
                  Explore Auro
                </Text>
              </View>
              <View>
                <Image
                  className="w-10 h-10"
                  resizeMode="contain"
                  source={images.logoSmall}
                />
              </View>
            </View>
            <CustomSearch />
            <View className="w-full pt-5 pb-8">
              <Text className="mt-4 text-white font-pmedium">
                Latest Videos
              </Text>
              <HorizontalView video={lastestVideo} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyComponent />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onViewableItemsChanged={viewableItemChange}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 80,
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
