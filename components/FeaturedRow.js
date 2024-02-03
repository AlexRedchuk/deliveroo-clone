import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";

const FeaturedRow = ({ id, title, description, restaurants }) => {
  return (
    <View>
      <View className="flex-row m-4 items-start">
        <View className="flex-1">
          <Text className="font-bold text-lg pb-1">{title}</Text>
          <Text className="font-bold text-gray-400 text-xs">{description}</Text>
        </View>
        <ArrowRightIcon size={25} color={"#00CCBB"} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="pt-"
      >
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            id={restaurant._id}
            key={restaurant._id}
            {...{
              ...restaurant,
              imgUrl: restaurant.image,
              genre: restaurant.type?.name,
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
