import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Back from "./Back";
import Header from "./Header";
import SentMessage from "./SentMessage";

import * as firebase from "firebase";
import moment from "moment";

export default class MessageThread extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      type: null,
    };
  }

  componentDidMount() {
    const { id } = this.props.navigation.state.params;
    const currentUser = firebase.auth().currentUser.uid;
    const store = firebase.firestore();
    const messageRef = store.collection("chatRooms");

    messageRef
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("doc data", doc.data());
          if (doc.data().from === currentUser) {
            this.setState({ data: doc.data(), type: "sent" }, () => {
              console.log("data in state", this.state);
            });
          } else {
            this.setState({ data: doc.data(), type: "received" }, () => {
              console.log("data in state", this.state);
            });
          }
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
          {console.log("this state in render", this.state)}
          {/* sent messages - without reply */}
          <SentMessage data={this.state} />
          {/* {this.state.data && this.state.type === "sent" && (
            <>
              <Text>
                Your message has no replies yet :({"\n"} maybe no one found it
                interesting?{"\n"}
              </Text>
              <Text>{this.state.data.message}</Text>
              <Text style={{ fontStyle: "italic" }}>
                {moment(this.state.data.time).fromNow()}
              </Text>
            </>
          )} */}

          {/* received messages with reply*/}
          {this.state.data && this.state.type === "received" && (
            <Text>You received this message: {this.state.data.message}</Text>
          )}

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
