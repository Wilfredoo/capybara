import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Back from "./Back";
import Header from "./Header";
import SentMessage from "./SentMessage";
import * as firebase from "firebase";
import ReceivedMessage from "./ReceivedMessage";
import createMessage from "../helpers/createMessage";

const store = firebase.firestore();
const messageRef = store.collection("chatRooms");
let currentUser = null;

export default class MessageThread extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      type: null,
    };
  }

  componentDidMount() {
    currentUser = firebase.auth().currentUser.uid;
    this.getMessage(currentUser);
  }

  reply(senderId, inReplyTo, message) {
    messageRef
      .doc(inReplyTo)
      .update({ hasReply: true })
      .then((res) => {
        console.log(`Document updated at ${res.updateTime}`, res);
      });
    createMessage(message, senderId, currentUser, true, inReplyTo, false);
  }

  getSender(messageImReplying) {
    const senderRef = store.doc(`users/${messageImReplying.from}`);
    senderRef.get().then((doc) => {
      this.setState({ sender: doc.data() });
    });
  }

  getMessage(currentUser) {
    const { id } = this.props.navigation.state.params;
    messageRef
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (doc.data().from === currentUser) {
            this.setState({ data: doc.data(), type: "sent" }, () => {});
          } else {
            this.setState({ data: doc.data(), type: "received" }, () => {});
          }

          this.getSender(doc.data(), currentUser);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  render() {
    return (
      <>
        <Back navigation={this.props.navigation} where="History" />
        <Header navigation={this.props.navigation} />
        <View style={styles.container}>
          {/* sent messages - without reply */}
          <SentMessage data={this.state} />

          {/* received messages with reply*/}
          <ReceivedMessage data={this.state} reply={this.reply} />

          {/* received messages without reply*/}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
