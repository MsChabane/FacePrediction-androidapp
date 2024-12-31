import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import Result from "./screen/Result";
import Home from "./screen/Home";
import Prediction from "./screen/Prediction";
import Review from "./screen/Review";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LottieView from "lottie-react-native";
import splash from "./assets/welocme.json";

export default function App() {
  const [isPending, setIspending] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setIspending(false);
    }, 5000);
  }, []);

  const Stack = createNativeStackNavigator();
  return (
    <>
      {isPending ? (
        <SafeAreaView
          style={tw`flex-1  justify-center items-center bg-slate-800`}
        >
          <LottieView source={splash} style={tw`w-full h-full`} autoPlay />
        </SafeAreaView>
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Prediction" component={Prediction} />
            <Stack.Screen name="Result" component={Result} />
            <Stack.Screen name="Review" component={Review} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
