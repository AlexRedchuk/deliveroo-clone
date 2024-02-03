import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == "featured"] {
          ...,
          restaurants[]-> {
            ...,
            dishes[]->,
            type-> {
              name
            }
          }
        }
    `
      )
      .then((data) => setFeaturedCategories(data));
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-2 align-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver now!</Text>
          <View className="flex-row items-center">
            <Text className="font-bold text-xl pb-1">Current location</Text>
            <ChevronDownIcon size={20} color="#00CCBB" />
          </View>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search */}

      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3 items-center">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      <ScrollView className="bg-gray-100">
        {/* Categories */}
        <Categories />

        {/* Featured Rows */}

        {featuredCategories?.map((category) => {
          return (
            <FeaturedRow
              id={category._id}
              key={category._id}
              title={category.name}
              description={category.short_description}
              restaurants={category.restaurants}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
