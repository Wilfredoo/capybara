import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Header from "./Header";
import Back from "./Back";

export default function SentConfirmation({ navigation }) {
  const { message } = navigation.state.params || {};
  const [sentMessage, setSentMessage] = useState("");

  useEffect(() => {
    setSentMessage(message);
  }, []);

  return (
    <>
      <Back navigation={navigation} where="App" />
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text style={{ marginBottom: 30, textAlign: "center", width: 380 }}>
          Your message has been sent to someone at random:
        </Text>
        <Text
          style={{
            marginBottom: 30,
            fontStyle: "italic",
            fontSize: 24,
            textAlign: "center",
          }}
        >
          {sentMessage && <Text>"{sentMessage}"</Text>}
        </Text>
        <Text style={{ marginBottom: 30, textAlign: "center", width: 380 }}>
          Maybe they will reply.{"\n"}
          {"\n"} Maybe not {"\n"}
          {"\n"}¯\_(ツ)_/¯
        </Text>
      </View>
    </>
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
