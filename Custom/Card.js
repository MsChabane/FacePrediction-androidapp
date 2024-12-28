import React from "react";
import { View, Text, Image } from "react-native";
import tw from "twrnc";

const Card = ({ id, name, gender, image }) => {
  return (
    <View style={tw`mx-auto border py-3 bg-blue-100 rounded-lg my-1 `}>
      <View style={tw`w-64 h-64 rounded-lg  `}>
        <Image
          source={{ uri: `data:image/png;base64,${image}` }}
          resizeMode="contain"
          style={tw`w-full h-full  `}
        />
      </View>
      <View style={tw`w-64   py-3 rounded-lg `}>
        <Text style={tw`font-bold text-center`}>Face id : {id}</Text>
        <Text style={tw`font-bold text-center`}>Name: {name}</Text>
        <Text style={tw`font-bold text-center`}>Gender: {gender}</Text>
      </View>
    </View>
  );
};

export default Card;
