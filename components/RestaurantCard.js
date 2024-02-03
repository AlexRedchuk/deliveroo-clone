import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({
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
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="mr-4"
      onPress={() =>
        navigation.navigate("Restaurant", {
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
      }
    >
      <Image source={{ uri: urlFor(imgUrl).url() }} className="w-64 h-36" />
      <View className="bg-white px-3 pt-2 pb-4 space-y-2">
        <Text className="font-bold text-lg">{name}</Text>
        <View className="flex-row space-x-1 items-center">
          <StarIcon size={22} color={"green"} opacity={0.5} />
          <Text className="text-green-500">{rating}</Text>
          <Text>·</Text>
          <Text>{genre}</Text>
        </View>
        <View className="flex-row space-x-1 items-center">
          <MapPinIcon size={22} color={"gray"} />
          <Text>Nearby</Text>
          <Text>·</Text>
          <Text>{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
