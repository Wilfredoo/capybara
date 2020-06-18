import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Back({ navigation, where }) {
  const back = () => {
    navigation.navigate(where);
  };
  return (
    <View>
      <Feather
        style={{ position: "absolute", top: 65, left: 20 }}
        name="arrow-left"
        size={30}
        color="green"
        onPress={back}
      />
    </View>
  );
}
