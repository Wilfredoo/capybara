import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";

import { Text, View, StyleSheet } from "react-native";

export default function SentConfirm({ navigation }) {
  const { message } = navigation.state.params;
  useEffect(() => console.log("proposal", message));

  const back = () => {
    navigation.navigate("App");
  };

  return (
    <View style={styles.container}>
      <Feather name="arrow-left" size={30} color="green" onPress={back} />
      <Text style={{ marginBottom: 30, textAlign: "center" }}>
        Your message has been sent to someone at random. Maybe she'll reply.
        Maybe not ¯\_(ツ)_/¯
      </Text>
      <Text style={{ marginBottom: 30, fontStyle: "italic" }}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
