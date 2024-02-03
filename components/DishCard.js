import { View, Text, TouchableOpacity, Image } from "react-native";
import Currency from "react-currency-formatter";
import React, { useEffect, useState } from "react";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemWithId,
} from "../features/basketSlice";

const DishCard = ({ id, name, image, short_description, price }) => {
  const [isPressed, setIsPressed] = useState(false);
  // const items = useSelector(selectBasketItems);
  const item = useSelector((state) => selectBasketItemWithId(state, id));
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, image, short_description, price }));
  };

  const removeItemFromBasket = () => {
    if (!item) return;
    dispatch(removeFromBasket(id));
  };

  useEffect;

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed((value) => !value)}
        className={`bg-white border p-4 border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{short_description}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="GBP" />
            </Text>
          </View>
          <Image
            style={{
              borderWidth: 1,
              borderColor: "#F3F3F4",
            }}
            source={{
              uri: urlFor(image).url(),
            }}
            className="h-20 w-20 bg-gray-300 p-4"
          />
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row space-x-2 items-center pb-3">
            <TouchableOpacity onPress={removeItemFromBasket}>
              <MinusCircleIcon
                size={40}
                color={item && item.quantity ? "#00BBCC" : "gray"}
              />
            </TouchableOpacity>
            <Text className="text-xl">{item ? item.quantity : 0}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon size={40} color={"#00BBCC"} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishCard;
