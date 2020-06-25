import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
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
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("App");
            }}
          >
            <Text style={styles.buttonText}> Go Back </Text>
          </TouchableOpacity>
        </View>
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
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  buttonText: { color: "#FFF", fontWeight: "500", fontSize: 20 },
});
