import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Header({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("App")}>
        <View style={styles.flex}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../assets/splash.png")}
          />
          <Text style={{ margin: 7 }}>Message in a bottle</Text>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../assets/splash.png")}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 60,
    alignItems: "center",
  },
  flex: {
    flexDirection: "row",
    // justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
