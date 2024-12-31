import React from "react";
import { View, Text } from "react-native";
import CustomButton from "../Custom/CustomButton";
import tw from "twrnc";
export default function Home({ navigation }) {
  const handel = () => {
    navigation.navigate("Prediction");
  };
  const gotoreview = () => {
    navigation.navigate("Review");
  };
  return (
    <View style={tw`flex-1 justify-center items-center bg-slate-800`}>
      <View style={tw` p-3 mb-3  `}>
        <Text style={tw`text-3xl font-bold text-blue-500 text-center mb-3`}>
          <Text style={tw`text-4xl  `}> Discover </Text>Faces with Ease
        </Text>
        <Text style={tw`text-lg text-gray-500 font-medium text-left pl-3 `}>
          Explore and identify Everyone in Our Dataset
        </Text>
      </View>
      <CustomButton
        title={"Lets make prediction"}
        textstyle={"text-lg font-bold text-blue-500 text-center"}
        containerStyle={
          "px-6 py-3 my-1 bg-blue-100 rounded-2xl justify-center flex-row gap-5"
        }
        handelPress={handel}
        iconName="east"
        iconcolor="text-blue-500"
      />
      <View>
        <CustomButton
          title={"About Members"}
          textstyle={"text-lg font-bold text-blue-500 text-center"}
          containerStyle={
            "px-6 py-3 my-1 bg-blue-100 rounded-2xl justify-center flex-row gap-5"
          }
          handelPress={gotoreview}
          iconName="visibility"
          iconcolor="text-blue-500"
        />
      </View>
    </View>
  );
}
