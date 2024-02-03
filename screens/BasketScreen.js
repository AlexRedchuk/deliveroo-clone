import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/solid";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const total = useSelector(selectBasketTotal).totalPrice;
  const dispatch = useDispatch();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">{restaurant.name}</Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color={"#00CCBB"} size={50} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="devide-y devide-y-gray-200">
          {items.map((item) => {
            return (
              <View
                className="flex-row items-center space-x-3 bg-white py-2 px-5"
                key={item.item.id}
              >
                <Text className="text-[#00CCBB]">{item.quantity} x</Text>
                <Image
                  source={{
                    uri: urlFor(item.item.image).url(),
                  }}
                  className="h-12 w-12 rounded-full"
                />
                <Text className="flex-1">{item.item.name}</Text>
                <Text>
                  <Currency
                    quantity={item.item.price * item.quantity}
                    currency="GBP"
                  />
                </Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeFromBasket(item.item.id))}
                >
                  <Text className="text-[#00CCBB] text-xs">Remove</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={total} currency="GBP" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={5.99} currency="GBP" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              <Currency quantity={total + 5.99} currency="GBP" />
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrder")}
            className="rounded-lg bg-[#00CCBB] p-4"
          >
            <Text className="text-white text-lg font-bold text-center">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
