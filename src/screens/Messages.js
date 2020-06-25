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
import createMessage from "../helpers/createMessage";
import Back from "./Back";

export default function Messages({ navigation }) {
  const store = firebase.firestore();
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [sentMessage, setSentMessage] = useState(null);
  const [sender, setSender] = useState(null);
  const [inReplyTo, setInReplyTo] = useState(null);
  const [placeholder, setPlaceholder] = useState("");
  const [message, setMessage] = useState("");
  const currentUser = firebase.auth().currentUser.uid;
  const messageRef = store.collection("chatRooms");

  useEffect(() => {
    const { id } = navigation.state.params;
    messageRef
      .doc(id)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          if (doc.data().from === currentUser) {
            setSentMessage(doc.data());
          } else {
            setReceivedMessage(doc.data());
          }
          const senderRef = store.doc(`users/${doc.data().from}`);
          senderRef.get().then((doc) => {
            setSender(doc.data());
            setPlaceholder("Say something back to " + doc.data().name);
          });
          const inReplyToRef = store.doc(
            `chatRooCan't perform a React state update on an unmounted component.ms/${
              doc.data().inReplyTo
            }`
          );
          inReplyToRef.get().then((doc) => {
            setInReplyTo(doc.data());
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);

  const reply = (senderId, inReplyTo) => {
    messageRef.doc(receivedMessage.id).update({ hasReply: true });

    createMessage(message, senderId.uuid, currentUser, true, inReplyTo, false);
  };

  return (
    <>
      <Back navigation={navigation} where="History" />
      <Header navigation={navigation} />
      <View style={styles.container}>
        {receivedMessage.isReply && (
          <Text>In reply to {inReplyTo.message}</Text>
        )}
        {/* for any received message */}
        {receivedMessage && (
          <>
            <Text style={{ marginBottom: 20 }}>You found a message...</Text>
            <View style={{ marginBottom: 20, textAlign: "center" }}>
              <Text
                style={{ fontStyle: "italic", fontWeight: "500", fontSize: 24 }}
              >
                {receivedMessage.message}
              </Text>
              {sender && (
                <Text style={{ fontStyle: "italic" }}>
                  - {sender.name}, {moment(receivedMessage.time).fromNow()}
                </Text>
              )}
            </View>

            {/* for received messages I have not yet answered  */}
            {receivedMessage &&
              !receivedMessage.isReply &&
              !receivedMessage.hasReply && (
                <>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => reply(sender, receivedMessage.id)}
                  >
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>
                      Reply
                    </Text>
                  </TouchableOpacity>

                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    placeholder={placeholder}
                    onChangeText={(message) => setMessage(message)}
                    defaultValue={receivedMessage}
                    style={styles.input}
                  />
                </>
              )}
          </>
        )}

        {sentMessage && (
          <>
            <Text style={{ marginBottom: 20 }}>You sent this message...</Text>
            <View style={{ marginBottom: 20, textAlign: "center" }}>
              <Text
                style={{ fontStyle: "italic", fontWeight: "500", fontSize: 24 }}
              >
                {sentMessage.message}
              </Text>
              {sender && (
                <Text style={{ fontStyle: "italic" }}>
                  - {sender.name}, {moment(sentMessage.time).fromNow()}
                </Text>
              )}
            </View>
            {sentMessage.isReply && (
              <Text>In reply to {inReplyTo.message}</Text>
            )}
          </>
        )}
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
