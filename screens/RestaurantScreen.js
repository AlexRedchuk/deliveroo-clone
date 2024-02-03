import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  MapPinIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import {
  ChevronRightIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import DishCard from "../components/DishCard";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
      id,
      imgUrl,
      name,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        name,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon size={20} color={"#00CCBB"} />
          </TouchableOpacity>
          <View className="bg-white">
            <View className="p-4 pb-0">
              <Text className="text-black text-3xl font-bold pb-2">{name}</Text>
              <View className="flex-row space-x-1 items-center pb-4">
                <StarIcon size={22} color={"green"} opacity={0.5} />
                <Text>·</Text>
                <Text className="text-green-500">{rating}</Text>
                <Text>·</Text>
                <MapPinIcon size={20} color={"gray"} opacity={0.4} />
                <Text className="text-gray-500 text-xs">Nearby</Text>
                <Text>·</Text>
                <Text className="text-gray-500 text-xs">{address}</Text>
              </View>
              <Text className="text-gray-500 pb-4">{short_description}</Text>
              <TouchableOpacity className="flex-row items-center space-x-4 border-t py-4 border-gray-300">
                <QuestionMarkCircleIcon color={"gray"} />
                <Text className="flex-1 font-bold text-md">
                  Have a food alergy
                </Text>
                <ChevronRightIcon size={20} color={"#00BBCC"} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="pb-36">
            <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

            {/* DishCard */}
            {dishes.map((dish) => {
              return <DishCard key={dish._id} {...dish} id={dish._id} />;
            })}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
