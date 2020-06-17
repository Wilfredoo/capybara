import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as firebase from "firebase";
import Header from "./Header";
const short = require("short-uuid");

import moment from "moment";

export default function Reply({ navigation }) {
  const store = firebase.firestore();
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [sender, setSender] = useState(null);
  const [placeholder, setPlaceholder] = useState("");
  const [message, setMessage] = useState("");

  const currentUser = firebase.auth().currentUser.uid;

  useEffect(() => {
    const { id } = navigation.state.params;
    const messageRef = store.collection("chatRooms").doc(id);

    messageRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setReceivedMessage(doc.data());
          console.log("message from", doc.data().from);
          const senderRef = store.doc(`users/${doc.data().from}`);
          senderRef.get().then((doc) => {
            setSender(doc.data());
            setPlaceholder("Say something back to " + doc.data().name);
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);

  const reply = (senderId) => {
    const newShortUUID = short.generate();
    console.log("reply to this sender", senderId);
    store.collection("chatRooms").doc(newShortUUID).set({
      id: newShortUUID,
      message: message,
      to: senderId.uuid,
      from: currentUser,
      time: Date.now(),
      reply: true,
    });
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      {receivedMessage && (
        <>
          <Text style={{ marginBottom: 20 }}>You found a message...</Text>
          <View style={{ marginBottom: 20, textAlign: "center" }}>
            <Text style={{ fontStyle: "italic", fontWeight: "500" }}>
              {receivedMessage.message}
            </Text>
            {sender && (
              <Text style={{ fontStyle: "italic" }}>
                - {sender.name}, {moment(receivedMessage.time).fromNow()}
              </Text>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={() => reply(sender)}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Reply</Text>
          </TouchableOpacity>
        </>
      )}
      <TextInput
        multiline={true}
        numberOfLines={4}
        placeholder={placeholder}
        onChangeText={(receivedMessage) => setReceivedMessage(receivedMessage)}
        defaultValue={receivedMessage}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
});
