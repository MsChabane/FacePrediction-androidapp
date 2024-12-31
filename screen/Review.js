import { Text, View, FlatList, ActivityIndicator, Alert } from "react-native";

import React, { useState, useEffect } from "react";
import tw from "twrnc";
import Card from "../Custom/Card";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Review() {
  const [data, setData] = useState([]);
  const [ispending, setispending] = useState(false);
  const getData = async () => {
    try {
      setispending(true);
      const res = await fetch(
        "https://server-tmqx.onrender.com/face_prediction/get_persones"
      );
      const data = await res.json();
      setData(data);
    } catch (err) {
      Alert.alert("Error", "Somthing went wrong try later ...");
    }
    setispending(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={tw` w-full h-full bg-slate-800`}>
      {ispending ? (
        <View style={tw` justify-center items-center flex-col  flex-1`}>
          <ActivityIndicator size="large" color="red" />
          <Text style={tw`text-center font-bold text-red-500 text-lg mt-3`}>
            Loading ...
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => {
            item.id;
          }}
          renderItem={({ item }) => (
            <Card
              name={item.name}
              id={item.id}
              image={item.image}
              gender={item.gender}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
