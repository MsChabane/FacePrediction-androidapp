import { Text, View, SafeAreaView, Image } from "react-native";

import React from "react";
import tw from "twrnc";

export default function Result({ route }) {
  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center w-full `}>
      <View
        style={tw`w-64 h-64 rounded-lg border my-3 justify-center items-center `}
      >
        <Image
          source={{ uri: route.params.image }}
          resizeMode="contain"
          style={tw`w-full h-full`}
        />
      </View>
      <Text style={tw`text-2xl font-bold font-mono text-black`}>
        Face id : {route.params.id}
      </Text>
      <Text style={tw`text-2xl font-bold font-mono text-black`}>
        Name : {route.params.name}
      </Text>
      <Text style={tw`text-2xl font-bold font-mono text-black`}>
        Gender : {route.params.gender}
      </Text>
    </SafeAreaView>
  );
}
