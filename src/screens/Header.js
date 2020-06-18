import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Header({ navigation }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => navigation.navigate("App")}>
        <View style={styles.flex}>
          <Image
            style={{ width: 40, height: 40, bottom: 18 }}
            source={require("../../assets/splash.png")}
          />
          <Text style={{ marginBottom: 30 }}>Message in a bottle</Text>
          <Image
            style={{ width: 40, height: 40, bottom: 18 }}
            source={require("../../assets/splash.png")}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    position: "absolute",
    top: 85,
  },
  flex: {
    flexDirection: "row",
  },
});
