import { Text, TouchableOpacity } from "react-native";

import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";

export default function CustomButton({
  title,
  textstyle,
  containerStyle,
  handelPress,
  iconName,
  iconcolor,
}) {
  return (
    <TouchableOpacity
      onPress={handelPress}
      style={tw`${containerStyle} flex-row gap-1`}
    >
      {iconName && (
        <MaterialIcons name={iconName} size={28} style={tw`${iconcolor}`} />
      )}
      <Text style={tw`${textstyle}`}>{title}</Text>
    </TouchableOpacity>
  );
}
