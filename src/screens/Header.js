import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Header({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("App")}>
        <View>
          <Image
            style={{ width: 140, height: 140, width: 200 }}
            source={require("../../assets/header.png")}
          />
          
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: "center",
  },

});
