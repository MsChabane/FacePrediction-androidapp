import {
  SafeAreaView,
  View,
  ActivityIndicator,
  Image,
  Alert,
  Text,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../Custom/CustomButton";
import tw from "twrnc";

import defaultimage from "../assets/defaultimg.jpg";

import * as Imagepicher from "expo-image-picker";

export default function Prediction({ navigation }) {
  const predict = async () => {
    if (isimported) {
      try {
        setIspending(true);
        const response = await fetch(
          "https://server-tmqx.onrender.com/face_prediction/prediction_source",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: image }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.erreur === undefined) {
            const { id, name, gender } = data;
            setIspending(false);
            navigation.navigate("Result", { id, name, gender, image });
          } else {
            Alert.alert("Error", "connection faild ... try again !");
          }
        }
      } catch (err) {
        Alert.alert("Error", "Something went wrongs");
      }
      setIspending(false);
    } else {
      Alert.alert("Oops", "Choose an image before");
    }
  };

  const [isPending, setIspending] = useState(false);
  const [image, setImage] = useState("");
  const [isimported, setIsimported] = useState(false);

  const handelOpenImage = async () => {
    let result = await Imagepicher.launchImageLibraryAsync({
      mediaType: "photos",
      allowsEditing: true,
      quality: 0.5,
      base64: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(`data:image/png;base64,${result.assets[0].base64}`);
      setIsimported(true);
    }
  };
  const reset = () => {
    setImage("");
    setIsimported(false);
  };

  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center bg-slate-800`}>
      {isPending ? (
        <View>
          <ActivityIndicator size="large" color="red" />
          <Text style={tw`text-center font-bold text-red-500 text-lg mt-3`}>
            Loading ...
          </Text>
        </View>
      ) : (
        <>
          <View style={tw`w-64 h-64 border mx-auto my-6 rounded-lg`}>
            <Image
              source={isimported ? { uri: image } : defaultimage}
              resizeMode="contain"
              style={tw`w-full h-full rounded-lg`}
            />
          </View>
          <View style={tw`mx-auto my-6`}>
            <View style={tw`flex-row gap-4 px-auto`}>
              <CustomButton
                title={"get Image "}
                containerStyle={
                  "flex justify-center items-center bg-green-100 border-green-600 border px-5 py-2 rounded-lg "
                }
                textstyle={
                  "text-lg font-bold text-green-600 font-mono capitalize"
                }
                handelPress={handelOpenImage}
                iconName="backup"
                iconcolor="text-green-600"
              />
              <CustomButton
                title={"reset "}
                containerStyle={
                  "flex justify-center items-center  px-5 py-2 rounded-lg border border-red-600 bg-red-100"
                }
                textstyle={
                  "text-lg font-bold text-red-600 font-mono capitalize "
                }
                handelPress={reset}
                iconName="history"
                iconcolor="text-red-500"
              />
            </View>
          </View>
          <CustomButton
            title={" predict "}
            containerStyle={
              "w-64  justify-center items-center bg-white  px-5 py-2 mx-auto rounded-lg border-blue-500 border"
            }
            textstyle={
              "text-lg font-bold font-mono tracking-widest text-blue-500  uppercase  "
            }
            handelPress={predict}
            iconName="east"
            iconcolor="text-blue-500"
          />
        </>
      )}
    </SafeAreaView>
  );
}
