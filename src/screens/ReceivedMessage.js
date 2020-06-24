import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import moment from "moment";
import * as firebase from "firebase";

export default function ReceivedMessage({ data, reply }) {
  const [message, setMessage] = useState(null);
  const store = firebase.firestore();

  return (
    <View style={styles.container}>
      {data.data && data.type === "received" && (
        <>
          <Text style={styles.title}>
            You received this message: {data.data.message}
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={"send it"}
            onChangeText={(text) => setMessage(text)}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => reply(data.data.from, data.data.id, message)}
          >
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Reply</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 60,
    alignItems: "center",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  input: {
    borderColor: "#8A8F9E",
    borderWidth: StyleSheet.hairlineWidth,
    height: 140,
    minWidth: 250,
    fontSize: 15,
    color: "#161F3D",
    borderRadius: 5,
    textAlignVertical: "top",
    paddingLeft: 10,
    paddingTop: 10,
  },
  title: {
    marginBottom: 20,
  },
});
