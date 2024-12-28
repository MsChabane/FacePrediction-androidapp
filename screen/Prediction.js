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
import * as FS from "expo-file-system";
import * as Imagepicher from "expo-image-picker";

export default function Prediction({ navigation }) {
  const handel = async () => {
    if (isimported) {
      setIspending(true);

      try {
        const res = await fetch(
          "https://server-tmqx.onrender.com/face_prediction/prediction_source",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: image }),
          }
        );
        console.log(res);
        if (res.ok) {
          const data = await res.json();
          if (data.erreur === undefined) {
            console.log(data);
            const { id, name, gender } = data;

            navigation.navigate("Result", { id, name, gender, image });
          } else {
            Alert.alert("Error", "connection faild ... try again !");
          }
        }
      } catch (err) {
        Alert.alert("Error", err);
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
      const bytes = await FS.readAsStringAsync(result.assets[0].uri, {
        encoding: FS.EncodingType.Base64,
      });

      setImage(`data:image/png;base64,${bytes}`);
      setIsimported(true);
    }
  };
  const reset = () => {
    //setImage('');
    //setIsimported(false);
    const d = { erreur: "yes" };
    console.log(d.erf === undefined);
    console.log(d.erreur);
  };

  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center `}>
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
            handelPress={handel}
            iconName="east"
            iconcolor="text-blue-500"
          />
        </>
      )}
    </SafeAreaView>
  );
}
