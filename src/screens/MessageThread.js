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

const showToast = (type) => {
  let toastMessage = null
  const replyToast = "Message reply sent."
  const forgetToast = "Message has been forgotten. Forever."
  const reportToast = "Message has been reported. Big time."
  if( type === "reply") toastMessage = replyToast
  if( type === "forget") toastMessage = forgetToast
  if( type === "report") toastMessage = reportToast

  ToastAndroid.show(
   toastMessage,
    ToastAndroid.SHORT
  );
};

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
    messageRef.doc(inReplyTo).update({ hasReply: true });
    createMessage(message, senderId, currentUser, true, inReplyTo, false);
    showToast("reply")
  }

  forget = (id) => {
    messageRef.doc(id).update({ forgotten: true });
    this.props.navigation.navigate("History")
    showToast("forget")
  }

  report = (id) => {
    messageRef.doc(id).update({ reported: true });
    this.props.navigation.navigate("History")
    showToast("report")
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
        <View style={styles.container}>
        <Back navigation={this.props.navigation} where="History" />
        <Header navigation={this.props.navigation} />
      <KeyboardAvoidingScrollView contentContainerStyle={styles.contentContainer}>
          <SentMessage data={this.state} />
          <ReceivedMessage
            data={this.state}
            reply={this.reply}
            forget={this.forget}
            report={this.report}
            navigation={this.props.navigation}
          />
      </KeyboardAvoidingScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
