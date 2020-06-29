import React, { Component } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import Back from "./Back";
import Header from "./Header";
import SentMessage from "./SentMessage";
import * as firebase from "firebase";
import ReceivedMessage from "./ReceivedMessage";
import createMessage from "../helpers/createMessage";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";

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

  showToast = () => {
    ToastAndroid.show(
      "Message reply sent, Hope you will hear back soon...",
      ToastAndroid.SHORT
    );
  };

  reply(senderId, inReplyTo, message) {
    messageRef.doc(inReplyTo).update({ hasReply: true });
    createMessage(message, senderId, currentUser, true, inReplyTo, false);
    this.showToast();
  }

  getSender(personImReplying) {
    const senderRef = store.doc(`users/${personImReplying}`);
    senderRef.get().then((doc) => {
      this.setState({ sender: doc.data() });
    });
  }

  getPreviousMessage(messageImReplying) {
    const senderRef = store.doc(`chatRooms/${messageImReplying}`);
    senderRef.get().then((doc) => {
      this.setState({ previousMessage: doc.data() }, () => {});
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
          this.getSender(doc.data().from, currentUser);
          this.getPreviousMessage(doc.data().inReplyTo);
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
      <KeyboardAvoidingScrollView>
        <Back navigation={this.props.navigation} where="History" />
        <Header navigation={this.props.navigation} />
        <View style={styles.container}>
          {/* sent messages - without reply */}
          <SentMessage data={this.state} />

          {/* received messages with reply*/}
          <ReceivedMessage data={this.state} reply={this.reply} />

          {/* received messages without reply*/}
        </View>
      </KeyboardAvoidingScrollView>
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
