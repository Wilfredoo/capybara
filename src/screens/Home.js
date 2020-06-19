import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import Header from "./Header";
const short = require("short-uuid");
import "firebase/firestore";
import createMessage from "../helpers/createMessage.js";

export default function Home({ navigation }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const currentUser = firebase.auth().currentUser.uid;
  const store = firebase.firestore();
  useEffect(() => console.log(message), [message]);

  const sendMessage = async () => {
    console.log("send message", message);
    let users;
    let randomUser = "no other users";
    let indexe;

    if (message === "") {
      return setError("empty");
    }

    await store
      .collection("users")
      .get()
      .then((querySnapshot) => {
        users = querySnapshot.docs;
        users.map((data, index) => {
          if (data.id === currentUser) {
            indexe = index;
          }
        });
        if (indexe !== -1) users.splice(indexe, 1);
        randomUser = users[Math.floor(Math.random() * users.length)].id;
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    createMessage(message, randomUser, currentUser, false, false);

    navigation.navigate("Sent", {
      message: message,
    });
  };

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>
          Send a message and it will arrive to any other user at random.
        </Text>

        <TextInput
          maxLength={100}
          minLength={2}
          multiline={true}
          numberOfLines={4}
          required={true}
          onChangeText={(message) => setMessage(message)}
          defaultValue={message}
          style={styles.input}
        />
        {error === "empty" && (
          <Text style={{ marginBottom: 18 }}>
            You can't leave this field empty. That's, like, the only rule.
          </Text>
        )}
        <TouchableOpacity style={styles.button} onPress={() => sendMessage()}>
          <Text style={styles.buttonText}> Send </Text>
        </TouchableOpacity>
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
  title: {
    marginBottom: 50,
    width: 300,
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    borderColor: "#8A8F9E",
    borderWidth: StyleSheet.hairlineWidth,
    height: 140,
    minWidth: 300,
    maxWidth: 400,
    fontSize: 15,
    color: "#161F3D",
    borderRadius: 5,
    textAlignVertical: "top",
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 20,
    marginBottom: 30,
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
