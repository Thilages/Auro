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

import CustomSearch from "@/components/CustomSearch";

import { searchpost } from "@/lib/appwrite";
import useAppwrite from "./../../lib/useAppwrite";
import Videocard from "@/components/Videocard";

import { useLocalSearchParams } from "expo-router";
import EmptySearchComponent from "@/components/EmptySearchComponent";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data, refetch } = useAppwrite(() => searchpost(query));
  const [refreshing, setrefreshing] = useState(false);

  const onRefresh = async () => {
    setrefreshing(true);
    await refetch();
    setrefreshing(false);
  };

  useEffect(() => {
    refetch();
  }, [query]);
  // console.log(data);

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
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Videocard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6 ">
              <View>
                <Text className="text-white font-pregular ">Searched for</Text>
                <Text className="text-white font-psemibold text-2xl">
                  {query}
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
              {/* <HorizontalView video={lastestVideo} /> */}
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptySearchComponent />}
        onViewableItemsChanged={viewableItemChange}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 80,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Search;
