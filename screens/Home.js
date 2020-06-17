import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import * as firebase from "firebase";
import Header from "./Header";
const short = require("short-uuid");
import "firebase/firestore";

export default function Home({ navigation }) {
  const [message, setMessage] = useState("");
  const currentUser = firebase.auth().currentUser.uid;
  const store = firebase.firestore();

  const sendMessage = async () => {
    let users;
    let randomUser = "no other users";
    let indexe;

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

    const newShortUUID = short.generate();
    store.collection("chatRooms").doc(newShortUUID).set({
      id: newShortUUID,
      message,
      to: randomUser,
      from: currentUser,
      time: Date.now(),
    });

    navigation.navigate("Sent", {
      message: message,
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={{ marginBottom: 30, width: 300, textAlign: "center" }}>
        Send a message and it will arrive to any other user at random.
      </Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        placeholder={
          "Be creative! \nOr just be yourself. \nDo whatever you want."
        }
        onChangeText={(message) => setMessage(message)}
        defaultValue={message}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={() => sendMessage()}>
        <Text style={{ color: "#FFF", fontWeight: "500" }}> Send </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
